import type { CreateRecipeDto, Toggle, Recipe, UpdateRecipeDto } from "~/types/recipe";

const API_BASE_URL =
  process.env.NUXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Add a function to get auth headers
function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new ApiError(response.status, error.message);
  }
  return response.json();
}

// Public request functions (no auth required)
async function publicGet<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  return handleResponse<T>(response);
}

// Private request functions (auth required)
async function privateGet<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
    ...options.headers,
  };
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  return handleResponse<T>(response);
}

async function privatePost<T>(
  endpoint: string,
  data: unknown,
  options: RequestInit = {}
): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
    ...options.headers,
  };
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    ...options,
    headers,
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
}

async function privatePut<T>(
  endpoint: string,
  data: unknown,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
}

async function privateDelete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options.headers,
    },
  });
  return handleResponse<T>(response);
}

export const api = {
  // Recipe-specific API methods
  recipes: {
    async create(data: CreateRecipeDto): Promise<Recipe> {
      return privatePost<Recipe>("/recipes", data);
    },

    async update(slug: string, data: UpdateRecipeDto): Promise<Recipe> {
      return privatePut<Recipe>(`/recipes/${slug}`, data);
    },

    async getById(id: number): Promise<Recipe> {
      return publicGet<Recipe>(`/recipes/${id}`);
    },

    async getBySlug(slug: string): Promise<Recipe> {
      return publicGet<Recipe>(`/recipes/${slug}`);
    },

    async getAll(): Promise<Recipe[]> {
      return publicGet<Recipe[]>("/recipes/all");
    },

    async likeRecipe(slug:string): Promise<Toggle> {
      return privatePost<Toggle>(`/recipes/${slug}/like`, {});
    },

    async unlikeRecipe(slug:string): Promise<Toggle> {
      return privateDelete<Toggle>(`/recipes/${slug}/like`, {});
    },

    async bookmarkRecipe(slug:string): Promise<Toggle> {
      return privatePost<Toggle>(`/recipes/${slug}/bookmark`, {});
    },

    async unbookmarkRecipe(slug:string): Promise<Toggle> {
      return privateDelete<Toggle>(`/recipes/${slug}/bookmark`, {});
    },

    async rateRecipe(slug:string, rating:number): Promise<Toggle> {
      return privatePost<Toggle>(`/recipes/${slug}/rate`, { rating });
    },

    async postComment(slug:string, comment:string): Promise<Toggle> {
      return privatePost<Toggle>(`/recipes/${slug}/comment`, { comment });
    },

    async getComments(slug:string): Promise<Toggle> {
      return publicGet<Toggle>(`/recipes/${slug}/comments`);
    },

    async delete(id: string): Promise<void> {
      return privateDelete(`/recipes/${id}`);
    },

    async uploadImage(file: File | string): Promise<{ url: string }> {
      if (typeof file === "string") {
        // If file is a base64 string, send it directly
        return privatePost<{ url: string }>("/recipes/upload", { image: file });
      } else {
        // If file is a File object, convert to base64 first
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async () => {
            try {
              const base64String = reader.result as string;
              const response = await privatePost<{ url: string }>(
                "/recipes/upload",
                {
                  image: base64String,
                },
              );
              resolve(response);
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
    },
  },
  chapa:{
     checkPayment(recipeId:string | null) {
      if (!recipeId) return false;
      
      try {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (!currentUser?.id) return false;

        // Check purchased recipes for current user
        const purchasedRecipes = JSON.parse(localStorage.getItem(`purchasedRecipes_${currentUser.id}`) || '[]');
        if (purchasedRecipes.includes(recipeId)) {
          return true;
        }

        // Check transaction history for current user
        const transactions = JSON.parse(localStorage.getItem(`transactions_${currentUser.id}`) || '{}');
        if (transactions[recipeId]) {
          // If we find a transaction for this recipe, add it to purchased recipes
          this.savePurchase(recipeId);
          return true;
        }

        return false;
      } catch (error) {
        console.error('Payment check error:', error);
        return false;
      }
    },

    savePurchase(recipeId: string): void {
      try {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (!currentUser?.id) return;

        // Get current purchased recipes for this user
        const purchasedRecipes = JSON.parse(localStorage.getItem(`purchasedRecipes_${currentUser.id}`) || '[]');
        
        // Add new recipe if not already purchased
        if (!purchasedRecipes.includes(recipeId)) {
          purchasedRecipes.push(recipeId);
          localStorage.setItem(`purchasedRecipes_${currentUser.id}`, JSON.stringify(purchasedRecipes));
          
          // Also store the purchase timestamp
          const purchases = JSON.parse(localStorage.getItem(`purchases_${currentUser.id}`) || '{}');
          purchases[recipeId] = {
            timestamp: new Date().toISOString(),
            status: 'completed'
          };
          localStorage.setItem(`purchases_${currentUser.id}`, JSON.stringify(purchases));
        }
      } catch (error) {
        console.error('Error saving purchase:', error);
      }
    },

    getPurchaseDetails(recipeId: string): any {
      try {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (!currentUser?.id) return null;

        const transactions = JSON.parse(localStorage.getItem(`transactions_${currentUser.id}`) || '{}');
        const purchases = JSON.parse(localStorage.getItem(`purchases_${currentUser.id}`) || '{}');
        
        return {
          transaction: transactions[recipeId] || null,
          purchase: purchases[recipeId] || null
        };
      } catch (error) {
        console.error('Error getting purchase details:', error);
        return null;
      }
    }
  }
};

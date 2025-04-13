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

    async update(id: number, data: UpdateRecipeDto): Promise<Recipe> {
      return privatePut<Recipe>(`/recipes/${id}`, data);
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

    async delete(id: number): Promise<void> {
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
    async checkPayment(tx_ref:string | null){
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer CHAPUBK_TEST-muTH7hFJtECAeDvLZww1qEpMZkrD6hMh`);
      const paymentResponse = await fetch(
        `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
        {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        }
      );
      const chapaRespose = await paymentResponse.json();
      console.log(paymentResponse)
      return chapaRespose?.data?.status
    }
  }
};

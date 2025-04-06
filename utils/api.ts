import type { CreateRecipeDto, Recipe, UpdateRecipeDto } from "~/types/recipe";

const API_BASE_URL =
  process.env.NUXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Add a function to get auth headers
function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  console.log("Generated headers:", headers);
  return headers;
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

export const api = {
  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options.headers,
    };
    console.log(`GET ${endpoint} headers:`, headers);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    return handleResponse<T>(response);
  },

  async post<T>(
    endpoint: string,
    data: unknown,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options.headers,
    };
    console.log(`POST ${endpoint} headers:`, headers);
    console.log(`POST ${endpoint} data:`, data);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      ...options,
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },

  async put<T>(
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
  },

  async delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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
  },

  // Recipe-specific API methods
  recipes: {
    async create(data: CreateRecipeDto): Promise<Recipe> {
      return api.post<Recipe>("/recipes", data);
    },

    async update(id: number, data: UpdateRecipeDto): Promise<Recipe> {
      return api.put<Recipe>(`/recipes/${id}`, data);
    },

    async getById(id: number): Promise<Recipe> {
      return api.get<Recipe>(`/recipes/${id}`);
    },

    async getBySlug(slug: string): Promise<Recipe> {
      return api.get<Recipe>(`/recipes/slug/${slug}`);
    },

    async delete(id: number): Promise<void> {
      return api.delete(`/recipes/${id}`);
    },

    async uploadImage(file: File | string): Promise<{ url: string }> {
      if (typeof file === "string") {
        // If file is a base64 string, send it directly
        return api.post<{ url: string }>("/recipes/upload", { image: file });
      } else {
        // If file is a File object, convert to base64 first
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async () => {
            try {
              const base64String = reader.result as string;
              const response = await api.post<{ url: string }>(
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
};

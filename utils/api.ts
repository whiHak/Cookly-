import type { CreateRecipeDto, Recipe, UpdateRecipeDto } from '~/types/recipe'

const API_BASE_URL = process.env.NUXT_PUBLIC_API_URL || 'http://localhost:8080/api'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }))
    throw new ApiError(response.status, error.message)
  }
  return response.json()
}

export const api = {
  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    return handleResponse<T>(response)
  },

  async post<T>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
    })
    return handleResponse<T>(response)
  },

  async put<T>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
    })
    return handleResponse<T>(response)
  },

  async delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    return handleResponse<T>(response)
  },

  // Recipe-specific API methods
  recipes: {
    async create(data: CreateRecipeDto): Promise<Recipe> {
      return api.post<Recipe>('/recipes', data)
    },

    async update(id: number, data: UpdateRecipeDto): Promise<Recipe> {
      return api.put<Recipe>(`/recipes/${id}`, data)
    },

    async getById(id: number): Promise<Recipe> {
      return api.get<Recipe>(`/recipes/${id}`)
    },

    async getBySlug(slug: string): Promise<Recipe> {
      return api.get<Recipe>(`/recipes/slug/${slug}`)
    },

    async delete(id: number): Promise<void> {
      return api.delete(`/recipes/${id}`)
    },

    async uploadImage(file: File): Promise<{ url: string }> {
      const formData = new FormData()
      formData.append('image', file)
      return api.post<{ url: string }>('/recipes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  },
} 
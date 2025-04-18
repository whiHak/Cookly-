export interface Ingredient {
  amount: string
  unit: string
  name: string
}

export interface Instruction {
  description: string
  image?: string
}

export interface Recipe {
  id: string
  title: string
  description: string
  difficulty: string
  servings: number
  preparation_time: number
  categories: {
    category_id: string
    name: string
  }[]
  user_id: string
  user:{
    full_name: string
    username: string
  }[]
  featured_image: string
  price?: number | null
  created_at: string
  updated_at: string
  steps?: {
    step_number: number
    description: string
    image_url: string | null
  }[]
  ingredients?: {
    ingredient_id: string
    quantity: string
    unit: string | null
  }[]
  images?: {
    image_url: string
    is_featured: boolean
  }[]
  rating: number
}

export interface CreateRecipeDto {
  title: string
  description: string
  difficulty: string
  servings: number
  preparation_time: number
  categories: {
    category_id: string
    name: string
  }[]
  featured_image: string // base64 image data
  price: number
  steps: {
    step_number: number
    description: string
    image_base64: string | null
  }[]
  ingredients: {
    ingredient_id: string
    quantity: string
    unit: string | null
  }[]
  images: {
    image_base64: string
    is_featured: boolean
  }[]
}

export interface Toggle{
  message: string
  status: string
}

export interface UpdateRecipeDto extends Partial<CreateRecipeDto> {} 
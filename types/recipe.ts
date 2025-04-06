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
  preparation_time: number
  category_id: string
  user_id: string
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
}

export interface CreateRecipeDto {
  title: string
  description: string
  preparation_time: number
  category_id: string
  featured_image: string
  price?: number | null
  steps: {
    step_number: number
    description: string
    image_url: string | null
  }[]
  ingredients: {
    ingredient_id: string
    quantity: string
    unit: string | null
  }[]
  images: {
    image_url: string
    is_featured: boolean
  }[]
}

export interface UpdateRecipeDto extends Partial<CreateRecipeDto> {} 
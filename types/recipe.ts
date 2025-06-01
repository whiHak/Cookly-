export interface Ingredient {
  id?: string
  ingredient_id?: string
  quantity: string
  unit: string | null
  name: string
}

export interface Instruction {
  description: string
  image?: string
}

export interface Step {
  id?: string
  step_number?: number
  description: string
  image_url?: string
}

export interface Recipe {
  id: string
  title: string
  description: string
  difficulty: string
  servings: number
  preparation_time: number
  categories: Array<{
    id?: string
    category_id: string
    name: string
  }>
  user?: {
    id: string
    full_name: string
    username: string
  }
  featured_image: string
  price: number
  created_at?: string
  updated_at?: string
  steps: Step[]
  ingredients: Ingredient[]
  images?: {
    id?: string
    image_url: string
    is_featured: boolean
  }[]
  rating?: number
  isLiked?: boolean
  isBookmarked?: boolean
  isPaid?: boolean
  isFree?: boolean
  notes?: string
  tags?: string[]
}

export interface CreateRecipeDto {
  title: string
  description: string
  difficulty: string
  servings: number
  preparation_time: number
  categories: Array<{
    category_id: string
    name: string
  }>
  featured_image: string
  price: number
  steps: Array<{
    step_number: number
    description: string
    image_url?: string
  }>
  ingredients: Array<{
    ingredient_id: string
    quantity: string
    unit: string | null
    name: string
  }>
  images: {
    image_base64: string
    is_featured: boolean
  }[]
}

export interface UpdateRecipeDto extends Partial<CreateRecipeDto> {
  title: string
  description: string
}

export interface RecipeFormData {
  title: string
  description: string
  featuredImage: string
  prepTime: number
  cookTime: number
  servings: number
  difficulty: string
  price: number
  categories: string[]
  tags: string[]
  ingredients: Ingredient[]
  steps: Step[]
  notes: string
}

export interface ValidationRule {
  validate: (value: any) => boolean
  message: string
}

export interface ValidationRules {
  [key: string]: ValidationRule[]
}

export interface Toggle {
  status: string
  message: string
} 
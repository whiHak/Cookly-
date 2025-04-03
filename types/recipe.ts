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
  id: number
  title: string
  slug: string
  description: string
  featuredImage: string
  prepTime: number
  cookTime: number
  servings: number
  difficulty: 'easy' | 'medium' | 'hard'
  categories: number[]
  tags: string[]
  ingredients: Ingredient[]
  instructions: Instruction[]
  notes: string
  createdAt: string
  updatedAt: string
  authorId: number
}

export interface CreateRecipeDto {
  title: string
  description: string
  featuredImage: string
  prepTime: number
  cookTime: number
  servings: number
  difficulty: 'easy' | 'medium' | 'hard'
  categories: number[]
  tags: string[]
  ingredients: Ingredient[]
  instructions: Instruction[]
  notes: string
}

export interface UpdateRecipeDto extends CreateRecipeDto {
  id: number
} 
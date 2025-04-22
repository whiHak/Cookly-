<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mx-auto max-w-4xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold">Edit Recipe</h1>
        <p class="mt-2 text-muted-foreground">
          Update your recipe details and instructions.
        </p>
      </div>

      <!-- Progress Steps -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex items-center"
          >
            <div
              class="h-8 w-8 rounded-full flex items-center justify-center"
              :class="[
                currentStep === index ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                index < currentStep ? 'bg-primary text-primary-foreground' : ''
              ]"
            >
              {{ index + 1 }}
            </div>
            <div
              v-if="index < steps.length - 1"
              class="h-1 w-16 mx-2"
              :class="index < currentStep ? 'bg-primary' : 'bg-muted'"
            ></div>
          </div>
        </div>
        <div class="mt-2 text-sm text-muted-foreground">
          {{ steps[currentStep] }}
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Step 1: Basic Info -->
        <div v-if="isLoading" class="flex justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>

        <div v-else v-show="currentStep === 0" class="space-y-6">
          <div>
            <label class="block text-sm font-medium">Recipe Title</label>
            <input
              v-model="recipe.title"
              type="text"
              class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              :class="errors.title ? 'border-red-500' : ''"
              required
              @blur="validateField('title')"
            />
            <p v-if="errors.title" class="mt-1 text-sm text-red-500">
              {{ errors.title[0] }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium">Description</label>
            <textarea
              v-model="recipe.description"
              rows="4"
              class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              :class="errors.description ? 'border-red-500' : ''"
              required
              @blur="validateField('description')"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-500">
              {{ errors.description[0] }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium">Featured Image</label>
            <div class="mt-1">
              <div
                class="flex justify-center rounded-lg border border-dashed border-border p-6"
                :class="errors.featured_image ? 'border-red-500' : ''"
              >
                <div class="text-center">
                  <img
                    v-if="recipe.featured_image"
                    :src="recipe.featured_image"
                    alt="Recipe preview"
                    class="mx-auto mb-4 h-32 w-32 object-cover rounded-lg"
                  />
                  <div class="flex text-sm text-muted-foreground">
                    <label
                      class="relative cursor-pointer rounded-md bg-background font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                    >
                      <span>Upload a file</span>
                      <input
                        type="file"
                        accept="image/*"
                        class="sr-only"
                        @change="handleImageUpload"
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Details -->
        <div v-show="currentStep === 1" class="space-y-6">
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium">Prep Time (minutes)</label>
              <input
                v-model="recipe.preparation_time"
                type="number"
                min="0"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium">Cook Time (minutes)</label>
              <input
                v-model="recipe.preparation_time"
                type="number"
                min="0"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium">Servings</label>
              <input
                v-model="recipe.servings"
                type="number"
                min="1"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium">Difficulty</label>
              <select
                v-model="recipe.difficulty"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium">Categories</label>
            <div class="mt-2 flex flex-wrap gap-2">
              <button
                v-for="category in categories"
                :key="category.id"
                type="button"
                class="rounded-full px-3 py-1 text-sm"
                :class="[
                  recipe.categories.some(c => c.category_id === category.id)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80',
                ]"
                @click="toggleCategory(category)"
              >
                {{ category.name }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium">Tags</label>
            <div class="mt-2">
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(tag, index) in recipe.tags"
                  :key="index"
                  class="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground"
                >
                  <span>{{ tag }}</span>
                  <button
                    type="button"
                    class="ml-1 hover:text-primary-foreground/80"
                    @click="removeTag(index)"
                  >
                    <Icon name="lucide:x" class="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div class="mt-2 flex gap-2">
                <input
                  v-model="newTag"
                  type="text"
                  placeholder="Add a tag"
                  class="block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                  @keydown.enter.prevent="addTag"
                />
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                  @click="addTag"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Ingredients -->
        <div v-show="currentStep === 2" class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium">Ingredients</h3>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              @click="addIngredient"
            >
              <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
              Add Ingredient
            </button>
          </div>

          <div class="space-y-4">
            <div
              v-for="(ingredient, index) in recipe.ingredients"
              :key="index"
              class="flex items-center gap-4"
            >
              <input
                v-model="ingredient.quantity"
                type="text"
                placeholder="Amount"
                class="block w-24 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
              <input
                v-model="ingredient.unit"
                type="text"
                placeholder="Unit"
                class="block w-24 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
              <input
                v-model="ingredient.name"
                type="text"
                placeholder="Ingredient name"
                class="block flex-1 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="button"
                class="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                @click="removeIngredient(index)"
              >
                <Icon name="lucide:trash-2" class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Step 4: Instructions -->
        <div v-show="currentStep === 3" class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium">Instructions</h3>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              @click="addInstruction"
            >
              <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
              Add Step
            </button>
          </div>

          <div class="space-y-6">
            <div
              v-for="(step, index) in recipe.steps"
              :key="index"
              class="flex gap-4"
            >
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                {{ index + 1 }}
              </div>
              <div class="flex-1 space-y-4">
                <textarea
                  v-model="step.description"
                  rows="3"
                  class="block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describe this step..."
                />
                <div>
                  <label class="block text-sm font-medium">Step Image (Optional)</label>
                  <div class="mt-1">
                    <div
                      class="relative aspect-[16/9] overflow-hidden rounded-lg border-2 border-dashed"
                      :class="step.image_url ? 'border-primary' : 'border-muted'"
                    >
                      <img
                        v-if="step.image_url"
                        :src="step.image_url"
                        :alt="`Step ${index + 1}`"
                        class="h-full w-full object-cover"
                      />
                      <div
                        v-else
                        class="flex h-full items-center justify-center"
                      >
                        <div class="text-center">
                          <Icon
                            name="lucide:image-plus"
                            class="mx-auto h-8 w-8 text-muted-foreground"
                          />
                          <p class="mt-2 text-sm text-muted-foreground">
                            Click to upload
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        class="absolute inset-0 cursor-pointer opacity-0"
                        @change="(e) => handleInstructionImageUpload(e, index)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                class="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                @click="removeInstruction(index)"
              >
                <Icon name="lucide:trash-2" class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Step 5: Notes -->
        <div v-show="currentStep === 4" class="space-y-6">
          <div>
            <label class="block text-sm font-medium">Recipe Notes</label>
            <textarea
              v-model="recipe.notes"
              rows="4"
              class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Add any additional notes, tips, or variations..."
            />
          </div>

          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFree"
                v-model="recipe.isFree"
                class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                @change="handleFreeChange"
              />
              <label for="isFree" class="text-sm font-medium">Make this recipe free</label>
            </div>

            <div>
              <label class="block text-sm font-medium">Price</label>
              <input
                v-model="recipe.price"
                type="number"
                min="0"
                step="0.01"
                :disabled="recipe.isFree"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                :class="errors.price ? 'border-red-500' : ''"
                @blur="validateField('price')"
              />
              <p v-if="errors.price" class="mt-1 text-sm text-red-500">
                {{ errors.price[0] }}
              </p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="mt-8 flex justify-between">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="currentStep === 0"
            @click="goToPreviousStep"
          >
            Previous
          </button>
          <button
            v-if="currentStep < steps.length - 1"
            type="button"
            class="ml-auto inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            @click="goToNextStep"
          >
            Next
          </button>
          <button
            v-else
            type="submit"
            class="ml-auto inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="mr-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
            </span>
            Save Recipe
          </button>
        </div>
      </form>
    </div>

    <!-- Toast notifications -->
    <Toast ref="toast" />

    <!-- Unsaved changes dialog -->
    <ConfirmDialog
      :show="showDialog"
      title="Unsaved Changes"
      message="You have unsaved changes. Are you sure you want to leave?"
      confirm-text="Leave"
      cancel-text="Stay"
      @confirm="confirmNavigation"
      @cancel="cancelNavigation"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFormValidation, rules } from '~/composables/useFormValidation'
import { useUnsavedChanges } from '~/composables/useUnsavedChanges'
import { optimizeImage } from '~/utils/imageOptimizer'
import type { Recipe, Step, Ingredient, UpdateRecipeDto, CreateRecipeDto } from '~/types/recipe'
import { api } from '~/utils/api'
import { v4 as uuidv4 } from 'uuid';


const route = useRoute()
const router = useRouter()
interface ToastRef {
  value: {
    addToast: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void
  } | null
}
const toastRef = inject<ToastRef>('toast')
const newTag = ref('')

const currentStep = ref(0)
const isLoading = ref(false)
const recipe = ref<Recipe>({
  id: '',
  title: '',
  description: '',
  servings: 1,
  preparation_time: 0,
  featured_image: '',
  price: 0,
  ingredients: [],
  isFree: false,
  steps: [],
  categories: [],
  difficulty: 'easy',
  notes: '',
  tags: []
})
const initialForm = ref<Recipe | null>(null)

const steps = [
  'Basic Information',
  'Details',
  'Categories & Tags',
  'Ingredients',
  'Instructions',
  'Notes'
]

// Mock data for categories
interface Category {
  id: string
  name: string
}

const categories: Category[] = [
  { id: '1', name: 'Breakfast' },
  { id: '2', name: 'Lunch' },
  { id: '3', name: 'Dinner' },
  { id: '4', name: 'Dessert' },
  { id: '5', name: 'Snacks' },
  { id: '6', name: 'Vegetarian' },
  { id: '7', name: 'Vegan' },
  { id: '8', name: 'Gluten-Free' },
]

// Validation rules
const validationRules = {
  title: [rules.required('Title is required')],
  description: [rules.required('Description is required')],
  featured_image: [rules.required('Featured image is required')],
  preparation_time: [rules.required('Preparation time is required'), rules.min(0)],
  servings: [rules.required('Number of servings is required'), rules.min(1)],
  difficulty: [rules.required('Difficulty level is required')],
  categories: [{
    validate: (value: typeof recipe.value.categories) => value && value.length > 0,
    message: 'Please select at least one category'
  }],
  ingredients: [{
    validate: (value: typeof recipe.value.ingredients) => {
      if (!value || value.length === 0) return false
      return value.every(ingredient => 
        ingredient.quantity?.toString().trim() !== '' && 
        ingredient.name?.trim() !== ''
      )
    },
    message: 'All ingredients must have an amount and name'
  }],
  steps: [{
    validate: (value: typeof recipe.value.steps) => {
      if (!value || value.length === 0) return false
      return value.every(step => 
        step.description?.trim() !== ''
      )
    },
    message: 'All instructions must have a description'
  }]
}

// Initialize validation with empty recipe
const { errors, validateField, validateForm } = useFormValidation(recipe, validationRules)

// Fetch recipe data
async function fetchRecipe() {
  try {
    isLoading.value = true
    const recipeData = await api.recipes.getBySlug(route.params.slug as string)
    
    // Initialize form with recipe data
    recipe.value = {
      id: recipeData.id,
      title: recipeData.title,
      description: recipeData.description || '',
      servings: recipeData.servings || 1,
      preparation_time: recipeData.preparation_time || 0,
      featured_image: recipeData.featured_image,
      price: recipeData.price || 0,
      ingredients: recipeData.ingredients?.map(i => ({
        quantity: i.quantity,
        unit: i.unit || null,
        name: i.name
      })) || [],
      steps: recipeData.steps?.map(s => ({
        description: s.description,
        image_url: s.image_url || undefined
      })) || [],
      notes: '',
      categories: recipeData.categories?.map(c => ({
        category_id: c.category_id,
        name: c.name
      })) || [],
      difficulty: recipeData.difficulty || 'easy',
      tags: []
    }
    
    // Store initial form state for unsaved changes tracking
    initialForm.value = { ...recipe.value }

  } catch (error) {
    console.error('Error fetching recipe:', error)
    toastRef?.value?.addToast('error','Failed to load recipe')
    router.push('/recipes')
  } finally {
    isLoading.value = false
  }
}

// Helper function to generate unique IDs

const generateId = () => {
  return uuidv4(); // Generates a random UUID (Version 4)
};

// Handle form submission
const handleSubmit = async () => {
  const isValid = await validateForm();
  if (!isValid) return;

  try {
    isLoading.value = true;

     // Combine categories and tags
     const allCategories = [
      ...recipe.value.categories.map(c => {
        return {
          category_id: c.category_id,
          name: c?.name || ''
        }
      }),
      ...(recipe.value.tags ?? []).map(tag => ({
        category_id: generateId(),
        name: tag
      }))
    ]
    
    const updateData: CreateRecipeDto = {
      title: recipe.value.title,
      description: recipe.value.description || '',
      servings: recipe.value.servings || 1,
      featured_image: recipe.value.featured_image,
      preparation_time: recipe.value.preparation_time,
      ingredients: recipe.value.ingredients ? recipe.value.ingredients.map(ingredient => ({
        ingredient_id: generateId(),
        quantity: ingredient.quantity,
        unit: ingredient.unit || null,
        name: ingredient.name
      })) : [],
      steps: recipe.value.steps ? recipe.value.steps.map((step, index) => ({
        step_number: index + 1,
        description: step.description,
        image_url: step.image_url
      })) : [],
      images: [],
      difficulty: recipe.value.difficulty || "",
      price: recipe.value.price,
      categories: allCategories,
    };
    console.log("updatedData", updateData)

    await api.recipes.update(route.params.slug as string, updateData)
    
    toastRef?.value?.addToast('success','Recipe updated successfully')
    router.push(`/recipes/${recipe.value.id}`)
  } catch (error) {
    console.error('Error updating recipe:', error)
    toastRef?.value?.addToast('error','Failed to update recipe')
  } finally {
    isLoading.value = false
  }
}

// Navigation between steps
const getCurrentStepFields = () => {
  switch (currentStep.value) {
    case 0:
      return ['title', 'description', 'featured_image'] as const
    case 1:
      return ['preparation_time', 'servings', 'difficulty', 'categories'] as const
    case 2:
      return ['ingredients'] as const
    case 3:
      return ['steps'] as const
    case 4:
      return ['notes', 'price'] as const
    default:
      return [] as const
  }
}

async function goToNextStep() {
  const currentFields = getCurrentStepFields()
  const isValid = currentFields.every(field => {
    const valid = validateField(field)
    console.log('Current Fields:', valid)
    return valid
  })


  if (!isValid) {
    toastRef?.value?.addToast('error','Please fix the validation errors before proceeding')
    return
  }else {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
    }
  }
}

function goToPreviousStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

onMounted(() => {
  fetchRecipe()
})

// Page meta
useHead({
  title: 'Edit Recipe',
  meta: [
    {
      name: 'description',
      content: 'Update your recipe details and instructions.',
    },
  ],
})

// Image handling
const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (!token) {
      toastRef?.value?.addToast('error', 'Please log in to upload images')
      router.push('/auth/login')
      return
    }

    try {
      const base64Image = await optimizeImage(input.files[0], {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.8,
        format: 'webp',
        outputType: 'base64'
      }) as string

      const { url } = await api.recipes.uploadImage(base64Image)
      recipe.value.featured_image = base64Image
      validateField('featured_image')
    } catch (error) {
      console.error('Error uploading image:', error)
      toastRef?.value?.addToast('error', 'Failed to upload image')
    }
  }
}

// Category handling
const toggleCategory = (category: Category) => {
  const index = recipe.value.categories.findIndex(c => c.category_id === category.id)
  if (index === -1) {
    recipe.value.categories.push({
      category_id: category.id,
      name: category.name
    })
  } else {
    recipe.value.categories.splice(index, 1)
  }
}

// Tag handling
const addTag = () => {
  if (!recipe.value.tags) {
    recipe.value.tags = []
  }
  if (newTag.value.trim() && !recipe.value.tags.includes(newTag.value.trim())) {
    recipe.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  if (recipe.value.tags) {
    recipe.value.tags.splice(index, 1)
  }
}

// Ingredient handling
const addIngredient = () => {
  recipe.value.ingredients.push({
    quantity: '',
    unit: null,
    name: ''
  })
}

const removeIngredient = (index: number) => {
  recipe.value.ingredients.splice(index, 1)
}

// Step handling
const addInstruction = () => {
  recipe.value.steps.push({
    description: '',
    image_url: undefined
  })
}

const removeInstruction = (index: number) => {
  recipe.value.steps.splice(index, 1)
}

const handleFreeChange = () => {
  if (recipe.value.isFree) {
    recipe.value.price = 0
  }
  validateField('price')
}

const handleInstructionImageUpload = async (event: Event, index: number) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (!token) {
      toastRef?.value?.addToast('error', 'Please log in to upload images')
      router.push('/login')
      return
    }

    try {
      const base64Image = await optimizeImage(input.files[0], {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.8,
        format: 'webp',
        outputType: 'base64'
      }) as string

      const { url } = await api.recipes.uploadImage(base64Image)
      recipe.value.steps[index].image_url = base64Image
    } catch (error) {
      console.error('Error uploading step image:', error)
      toastRef?.value?.addToast('error', 'Failed to upload step image')
    }
  }
}

// Unsaved changes tracking
const hasUnsavedChanges = () => {
  if (!initialForm.value) return false
  return JSON.stringify(recipe.value) !== JSON.stringify(initialForm.value)
}

const { showDialog, confirmNavigation, cancelNavigation } = useUnsavedChanges(hasUnsavedChanges)
</script> 
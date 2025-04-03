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
              v-model="form.title"
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
              v-model="form.description"
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
                :class="errors.featuredImage ? 'border-red-500' : ''"
              >
                <div class="text-center">
                  <img
                    v-if="form.featuredImage"
                    :src="form.featuredImage"
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
                v-model="form.prepTime"
                type="number"
                min="0"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium">Cook Time (minutes)</label>
              <input
                v-model="form.cookTime"
                type="number"
                min="0"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium">Servings</label>
              <input
                v-model="form.servings"
                type="number"
                min="1"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium">Difficulty</label>
              <select
                v-model="form.difficulty"
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
                  form.categories.includes(category.id)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80',
                ]"
                @click="toggleCategory(category.id)"
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
                  v-for="(tag, index) in form.tags"
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
              v-for="(ingredient, index) in form.ingredients"
              :key="index"
              class="flex items-center gap-4"
            >
              <input
                v-model="ingredient.amount"
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
              v-for="(step, index) in form.instructions"
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
                      :class="step.image ? 'border-primary' : 'border-muted'"
                    >
                      <img
                        v-if="step.image"
                        :src="step.image"
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
              v-model="form.notes"
              rows="4"
              class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Add any additional notes, tips, or variations..."
            />
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFormValidation } from '~/composables/useFormValidation'
import { useUnsavedChanges } from '~/composables/useUnsavedChanges'
import { optimizeImage } from '~/utils/imageOptimizer'
import type { Recipe, UpdateRecipeDto } from '~/types/recipe'

const route = useRoute()
const router = useRouter()
const toast = ref()
const newTag = ref('')

const currentStep = ref(0)
const isLoading = ref(false)
const recipe = ref<Recipe | null>(null)
const initialForm = ref<UpdateRecipeDto | null>(null)

const steps = [
  'Basic Information',
  'Details',
  'Categories & Tags',
  'Ingredients',
  'Instructions',
  'Notes'
]

// Mock data
const categories = [
  { id: 1, name: 'Breakfast' },
  { id: 2, name: 'Lunch' },
  { id: 3, name: 'Dinner' },
  { id: 4, name: 'Dessert' },
  { id: 5, name: 'Snacks' },
  { id: 6, name: 'Vegetarian' },
  { id: 7, name: 'Vegan' },
  { id: 8, name: 'Gluten-Free' },
]

const form = ref<UpdateRecipeDto>({
  id: 0,
  title: '',
  description: '',
  featuredImage: '',
  prepTime: 0,
  cookTime: 0,
  servings: 1,
  difficulty: 'easy',
  categories: [],
  tags: [],
  ingredients: [],
  instructions: [],
  notes: ''
})

// Validation setup
const validationRules = {
  title: [{ required: true }, { minLength: 3 }],
  description: [{ required: true }, { minLength: 10 }],
  prepTime: [{ required: true }, { min: 0 }],
  cookTime: [{ required: true }, { min: 0 }],
  servings: [{ required: true }, { min: 1 }],
  difficulty: [{ required: true }],
  ingredients: [{ required: true }, { minLength: 1 }],
  instructions: [{ required: true }, { minLength: 1 }]
}

const { errors, validateField, validateForm } = useFormValidation(form, validationRules)

// Unsaved changes tracking
const hasUnsavedChanges = () => {
  if (!initialForm.value) return false
  return JSON.stringify(form.value) !== JSON.stringify(initialForm.value)
}

const { showDialog, confirmNavigation, cancelNavigation } = useUnsavedChanges(hasUnsavedChanges)

// Fetch recipe data
async function fetchRecipe() {
  try {
    isLoading.value = true
    const response = await fetch(`/api/recipes/${route.params.slug}`)
    if (!response.ok) throw new Error('Failed to fetch recipe')
    const recipeData = await response.json() as Recipe
    recipe.value = recipeData
    
    // Initialize form with recipe data
    if (recipe.value) {
      form.value = {
        id: recipe.value.id,
        title: recipe.value.title,
        description: recipe.value.description,
        featuredImage: recipe.value.featuredImage,
        prepTime: recipe.value.prepTime,
        cookTime: recipe.value.cookTime,
        servings: recipe.value.servings,
        difficulty: recipe.value.difficulty,
        categories: [...recipe.value.categories],
        tags: [...recipe.value.tags],
        ingredients: [...recipe.value.ingredients],
        instructions: [...recipe.value.instructions],
        notes: recipe.value.notes
      }
      
      // Store initial form state for unsaved changes tracking
      initialForm.value = { ...form.value }
    }
  } catch (error) {
    toast.value?.show({
      type: 'error',
      message: 'Failed to load recipe'
    })
    router.push('/recipes')
  } finally {
    isLoading.value = false
  }
}

// Handle form submission
async function handleSubmit() {
  if (!(await validateForm())) {
    toast.value?.show({
      type: 'error',
      message: 'Please fix the validation errors'
    })
    return
  }

  try {
    isLoading.value = true
    
    // Optimize image if a new one is selected
    if (form.value.featuredImage instanceof File) {
      const optimizedImage = await optimizeImage(form.value.featuredImage, {
        maxWidth: 1200,
        maxHeight: 800,
        quality: 0.8,
        format: 'webp'
      })
      form.value.featuredImage = optimizedImage
    }

    const response = await fetch(`/api/recipes/${route.params.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) throw new Error('Failed to update recipe')

    toast.value?.show({
      type: 'success',
      message: 'Recipe updated successfully'
    })
    
    router.push(`/recipes/${route.params.slug}`)
  } catch (error) {
    toast.value?.show({
      type: 'error',
      message: 'Failed to update recipe'
    })
  } finally {
    isLoading.value = false
  }
}

// Navigation between steps
const getCurrentStepFields = computed(() => {
  switch (currentStep.value) {
    case 0:
      return ['title', 'description', 'featuredImage'] as const
    case 1:
      return ['prepTime', 'cookTime', 'servings', 'difficulty'] as const
    case 2:
      return ['categories', 'tags'] as const
    case 3:
      return ['ingredients'] as const
    case 4:
      return ['instructions'] as const
    default:
      return ['notes'] as const
  }
})

async function goToNextStep() {
  const currentFields = getCurrentStepFields.value
  const isValid = await Promise.all(
    currentFields.map(field => validateField(field))
  ).then(results => results.every(Boolean))

  if (!isValid) {
    toast.value?.show({
      type: 'error',
      message: 'Please fix the validation errors before proceeding'
    })
    return
  }

  if (currentStep.value < 5) {
    currentStep.value++
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
    try {
      const file = input.files[0]
      const optimizedImage = await optimizeImage(file, {
        maxWidth: 1200,
        maxHeight: 800,
        quality: 0.8,
        format: 'webp'
      })
      
      // Upload the optimized image to your server and get the URL
      const formData = new FormData()
      formData.append('image', optimizedImage as Blob)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) throw new Error('Failed to upload image')
      const { url } = await response.json()
      form.value.featuredImage = url
    } catch (error) {
      toast.value?.show({
        type: 'error',
        message: 'Failed to upload image'
      })
    }
  }
}

// Category handling
const toggleCategory = (categoryId: number) => {
  const index = form.value.categories.indexOf(categoryId)
  if (index === -1) {
    form.value.categories.push(categoryId)
  } else {
    form.value.categories.splice(index, 1)
  }
}

// Tag handling
const addTag = () => {
  if (newTag.value.trim() && !form.value.tags.includes(newTag.value.trim())) {
    form.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  form.value.tags.splice(index, 1)
}

// Ingredient handling
const addIngredient = () => {
  form.value.ingredients.push({ amount: '', unit: '', name: '' })
}

const removeIngredient = (index: number) => {
  form.value.ingredients.splice(index, 1)
}

// Instruction handling
const addInstruction = () => {
  form.value.instructions.push({ description: '', image: '' })
}

const removeInstruction = (index: number) => {
  form.value.instructions.splice(index, 1)
}

const handleInstructionImageUpload = async (event: Event, index: number) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    try {
      const file = input.files[0]
      const optimizedImage = await optimizeImage(file, {
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.8,
        format: 'webp'
      })
      
      // Upload the optimized image to your server and get the URL
      const formData = new FormData()
      formData.append('image', optimizedImage)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) throw new Error('Failed to upload image')
      const { url } = await response.json()
      form.value.instructions[index].image = url
    } catch (error) {
      toast.value?.show({
        type: 'error',
        message: 'Failed to upload instruction image'
      })
    }
  }
}
</script> 
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mx-auto max-w-4xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold">Create New Recipe</h1>
        <p class="mt-2 text-muted-foreground">
          Share your culinary masterpiece with the world.
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
              class="flex h-8 w-8 items-center justify-center rounded-full"
              :class="[
                currentStep >= index
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground',
              ]"
            >
              {{ index + 1 }}
            </div>
            <div
              v-if="index < steps.length - 1"
              class="mx-4 h-0.5 w-8"
              :class="currentStep > index ? 'bg-primary' : 'bg-muted'"
            />
          </div>
        </div>
        <div class="mt-2 flex justify-between">
          <span
            v-for="(step, index) in steps"
            :key="index"
            class="text-sm"
            :class="currentStep >= index ? 'text-primary' : 'text-muted-foreground'"
          >
            {{ step }}
          </span>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Step 1: Basic Info -->
        <div v-show="currentStep === 0" class="space-y-6">
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
            />
            <p v-if="errors.description" class="mt-1 text-sm text-red-500">
              {{ errors.description[0] }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium">Featured Image</label>
            <div class="mt-1">
              <div
                class="relative aspect-[16/9] overflow-hidden rounded-lg border-2 border-dashed"
                :class="form.featuredImage ? 'border-primary' : 'border-muted'"
              >
                <img
                  v-if="form.featuredImage"
                  :src="form.featuredImage"
                  alt="Featured image"
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
                      Click to upload or drag and drop
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  class="absolute inset-0 cursor-pointer opacity-0"
                  @change="handleImageUpload"
                />
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
                :class="errors.prepTime ? 'border-red-500' : ''"
                required
                @blur="validateField('prepTime')"
              />
              <p v-if="errors.prepTime" class="mt-1 text-sm text-red-500">
                {{ errors.prepTime[0] }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium">Cook Time (minutes)</label>
              <input
                v-model="form.cookTime"
                type="number"
                min="0"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                :class="errors.cookTime ? 'border-red-500' : ''"
                required
                @blur="validateField('cookTime')"
              />
              <p v-if="errors.cookTime" class="mt-1 text-sm text-red-500">
                {{ errors.cookTime[0] }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium">Servings</label>
              <input
                v-model="form.servings"
                type="number"
                min="1"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                :class="errors.servings ? 'border-red-500' : ''"
                required
                @blur="validateField('servings')"
              />
              <p v-if="errors.servings" class="mt-1 text-sm text-red-500">
                {{ errors.servings[0] }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium">Difficulty</label>
              <select
                v-model="form.difficulty"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                :class="errors.difficulty ? 'border-red-500' : ''"
                required
                @blur="validateField('difficulty')"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <p v-if="errors.difficulty" class="mt-1 text-sm text-red-500">
                {{ errors.difficulty[0] }}
              </p>
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
                :class="errors.ingredients ? 'border-red-500' : ''"
                @blur="validateField('ingredients')"
              />
              <input
                v-model="ingredient.unit"
                type="text"
                placeholder="Unit"
                class="block w-24 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                :class="errors.ingredients ? 'border-red-500' : ''"
                @blur="validateField('ingredients')"
              />
              <input
                v-model="ingredient.name"
                type="text"
                placeholder="Ingredient name"
                class="block flex-1 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                :class="errors.ingredients ? 'border-red-500' : ''"
                @blur="validateField('ingredients')"
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
              @click="addStep"
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
                  :class="errors.instructions ? 'border-red-500' : ''"
                  @blur="validateField('instructions')"
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
                        @change="(e) => handleStepImageUpload(e, index)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                class="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                @click="removeStep(index)"
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
              :class="errors.notes ? 'border-red-500' : ''"
              @blur="validateField('notes')"
            />
            <p v-if="errors.notes" class="mt-1 text-sm text-red-500">
              {{ errors.notes[0] }}
            </p>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between">
          <button
            v-if="currentStep > 0"
            type="button"
            class="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            @click="currentStep--"
          >
            <Icon name="lucide:arrow-left" class="mr-2 h-4 w-4" />
            Previous
          </button>
          <button
            v-if="currentStep < steps.length - 1"
            type="button"
            class="ml-auto inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            @click="nextStep"
          >
            Next
            <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
          </button>
          <button
            v-else
            type="submit"
            class="ml-auto inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="isSubmitting"
          >
            <Icon
              v-if="isSubmitting"
              name="lucide:loader-2"
              class="mr-2 h-4 w-4 animate-spin"
            />
            {{ isSubmitting ? 'Publishing...' : 'Publish Recipe' }}
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '~/utils/api'
import type { CreateRecipeDto } from '~/types/recipe'
import { useFormValidation, rules } from '~/composables/useFormValidation'
import { useUnsavedChanges } from '~/composables/useUnsavedChanges'
import { optimizeImage } from '~/utils/imageOptimizer'

const router = useRouter()
const toast = ref()

// State
const currentStep = ref(0)
const isSubmitting = ref(false)
const newTag = ref('')

const steps = [
  'Basic Info',
  'Details',
  'Ingredients',
  'Instructions',
  'Notes',
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

const form = ref({
  title: '',
  description: '',
  featuredImage: '',
  prepTime: 0,
  cookTime: 0,
  servings: 1,
  difficulty: 'medium',
  categories: [] as number[],
  tags: [] as string[],
  ingredients: [
    { amount: '', unit: '', name: '' },
  ],
  instructions: [
    { description: '', image: '' },
  ] as Array<{ description: string; image?: string }>,
  notes: '',
})

// Form validation rules
const validationRules = {
  title: [rules.required(), rules.maxLength(100)],
  description: [rules.required(), rules.maxLength(500)],
  featuredImage: [rules.required()],
  prepTime: [rules.required(), rules.min(0)],
  cookTime: [rules.required(), rules.min(0)],
  servings: [rules.required(), rules.min(1)],
  difficulty: [rules.required()],
  categories: [rules.required('Please select at least one category')],
  ingredients: [rules.required('Please add at least one ingredient')],
  instructions: [rules.required('Please add at least one instruction')],
}

const { errors, validateForm, validateField } = useFormValidation(form.value, validationRules)

// Track unsaved changes
const initialFormState = JSON.stringify(form.value)
const hasUnsavedChanges = computed(() => {
  return JSON.stringify(form.value) !== initialFormState
})

const { showDialog, confirmNavigation, cancelNavigation } = useUnsavedChanges(() => hasUnsavedChanges.value)

// Methods
const nextStep = () => {
  const currentFields = getCurrentStepFields()
  const isValid = currentFields.every(field => validateField(field))

  if (isValid) {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
    }
  } else {
    toast.value.addToast('error', 'Please fix the errors before proceeding')
  }
}

const getCurrentStepFields = () => {
  switch (currentStep.value) {
    case 0:
      return ['title', 'description', 'featuredImage'] as const
    case 1:
      return ['prepTime', 'cookTime', 'servings', 'difficulty', 'categories'] as const
    case 2:
      return ['ingredients'] as const
    case 3:
      return ['instructions'] as const
    case 4:
      return ['notes'] as const
    default:
      return [] as const
  }
}

const handleSubmit = async () => {
  if (!validateForm()) {
    toast.value.addToast('error', 'Please fix all errors before submitting')
    return
  }

  isSubmitting.value = true
  try {
    const recipeData: CreateRecipeDto = {
      title: form.value.title,
      description: form.value.description,
      featuredImage: form.value.featuredImage,
      prepTime: form.value.prepTime,
      cookTime: form.value.cookTime,
      servings: form.value.servings,
      difficulty: form.value.difficulty as 'easy' | 'medium' | 'hard',
      categories: form.value.categories,
      tags: form.value.tags,
      ingredients: form.value.ingredients,
      instructions: form.value.instructions,
      notes: form.value.notes,
    }

    const recipe = await api.recipes.create(recipeData)
    toast.value.addToast('success', 'Recipe created successfully')
    router.push(`/recipes/${recipe.slug}`)
  } catch (error) {
    console.error('Error submitting recipe:', error)
    toast.value.addToast('error', 'Failed to create recipe')
  } finally {
    isSubmitting.value = false
  }
}

const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    try {
      const file = await optimizeImage(input.files[0], {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.8,
        format: 'webp',
      })
      const { url } = await api.recipes.uploadImage(file)
      form.value.featuredImage = url
      validateField('featuredImage')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.value.addToast('error', 'Failed to upload image')
    }
  }
}

const handleStepImageUpload = async (event: Event, stepIndex: number) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    try {
      const file = await optimizeImage(input.files[0], {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.8,
        format: 'webp',
      })
      const { url } = await api.recipes.uploadImage(file)
      form.value.instructions[stepIndex].image = url
    } catch (error) {
      console.error('Error uploading step image:', error)
      toast.value.addToast('error', 'Failed to upload step image')
    }
  }
}

const toggleCategory = (categoryId: number) => {
  const index = form.value.categories.indexOf(categoryId)
  if (index === -1) {
    form.value.categories.push(categoryId)
  } else {
    form.value.categories.splice(index, 1)
  }
}

const addTag = () => {
  if (newTag.value.trim()) {
    form.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  form.value.tags.splice(index, 1)
}

const addIngredient = () => {
  form.value.ingredients.push({ amount: '', unit: '', name: '' })
}

const removeIngredient = (index: number) => {
  form.value.ingredients.splice(index, 1)
}

const addStep = () => {
  form.value.instructions.push({ description: '', image: '' })
}

const removeStep = (index: number) => {
  form.value.instructions.splice(index, 1)
}

// Page meta
useHead({
  title: 'Create New Recipe',
  meta: [
    {
      name: 'description',
      content: 'Share your culinary masterpiece with the world.',
    },
  ],
})
</script> 
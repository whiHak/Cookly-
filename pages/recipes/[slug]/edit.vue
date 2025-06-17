<script setup lang="ts">
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFormValidation, rules } from '~/composables/useFormValidation'
import { optimizeImage } from '~/utils/imageOptimizer'
import type { Recipe } from '~/types/recipe'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GetRecipeByIdDocument, UpdateRecipeWithAllDocument, type GetRecipeByIdQuery, type GetRecipeByIdQueryVariables, type UpdateRecipeWithAllMutation } from '~/graphql/generated/graphql'


const route = useRoute()
const router = useRouter()
const recipeId = route.params.slug as string
const { result: recipeResult, loading: recipeLoading, error: recipeError, refetch: refetchRecipe } = useQuery<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>(GetRecipeByIdDocument, { id: recipeId  })
interface ToastRef {
  value: {
    addToast: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void
  } | null
}
const toastRef = inject<ToastRef>('toast')
const newTag = ref('')

const currentStep = ref(0)
const isLoading = computed(() => recipeLoading.value)
const formRecipe = ref<Recipe>({
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
  tags: [],
  images: []
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
    validate: (value: typeof formRecipe.value.categories) => value && value.length > 0,
    message: 'Please select at least one category'
  }],
  ingredients: [{
    validate: (value: typeof formRecipe.value.ingredients) => {
      if (!value || value.length === 0) return false
      return value.every(ingredient => 
        ingredient.quantity?.toString().trim() !== '' && 
        ingredient.name?.trim() !== ''
      )
    },
    message: 'All ingredients must have an amount and name'
  }],
  steps: [{
    validate: (value: typeof formRecipe.value.steps) => {
      if (!value || value.length === 0) return false
      return value.every(step => 
        step.description?.trim() !== ''
      )
    },
    message: 'All instructions must have a description'
  }]
}

// Initialize validation with empty recipe
const { errors, validateField, validateForm } = useFormValidation(formRecipe, validationRules)

const { mutate: updateRecipeWithAllMutation } = useMutation<UpdateRecipeWithAllMutation>(UpdateRecipeWithAllDocument)

watch(recipeResult, (val) => {
  if (val && val.recipes_by_pk) {
    const recipeData = val.recipes_by_pk
    formRecipe.value = {
      id: recipeData.id,
      title: recipeData.title,
      description: recipeData.description || '',
      servings: recipeData.servings || 1,
      preparation_time: recipeData.preparation_time || 0,
      featured_image: recipeData.featured_image,
      price: recipeData.price || 0,
      ingredients: (recipeData.recipe_ingredients || []).map((i: any) => ({
        id: i.id,
        ingredient_id: i.ingredient?.id || '',
        quantity: i.quantity,
        unit: i.unit || null,
        name: i.ingredient?.name || ''
      })),
      steps: (recipeData.recipe_steps || []).map((s: any) => ({
        id: s.id,
        step_number: s.step_number,
        description: s.description,
        image_url: s.image_url || undefined
      })),
      notes: '',
      categories: (recipeData.recipe_categories || []).map((c: any) => ({
        id: c.id,
        category_id: c.category?.id,
        name: c.category?.name
      })),
      images: (recipeData.recipe_images || []).map((img: any) => ({
        id: img.id,
        image_url: img.image_url,
        is_featured: img.is_featured
      })),
      difficulty: recipeData.difficulty || 'easy',
      tags: []
    }
    initialForm.value = { ...formRecipe.value }
  }
})

// Handle form submission
const handleSubmit = async () => {
  const isValid = await validateForm();
  if (!isValid) return;

  try {
    if (formRecipe.value.isFree) {
      formRecipe.value.price = 0;
    }
    // Main recipe data (without steps, ingredients, categories, images)
    const updateData: any = {
      title: formRecipe.value.title,
      description: formRecipe.value.description,
      preparation_time: formRecipe.value.preparation_time,
      featured_image: formRecipe.value.featured_image,
      difficulty: formRecipe.value.difficulty,
      servings: formRecipe.value.servings,
      price: formRecipe.value.price,
    };

    // Prepare nested data for categories, ingredients, steps, images
    const categories = formRecipe.value.categories.map(cat => ({
      category_id: cat.category_id
    }))
    const ingredients = formRecipe.value.ingredients.map(ingredient => ({
      quantity: ingredient.quantity,
      unit: ingredient.unit || null,
      ingredient_id: ingredient.ingredient_id || undefined
    }))
    const steps = formRecipe.value.steps.map((step, idx) => ({
      step_number: idx + 1,
      description: step.description,
      image_url: step.image_url || undefined
    }))
    const images = formRecipe.value.images?.map(img => ({
      image_url: img.image_url,
      is_featured: img.is_featured
    })) || []

    console.log('Submitting recipe with data:', {
      ...updateData,
      categories,
      ingredients,
      steps,
      images
    })
    await updateRecipeWithAllMutation({
      id: formRecipe.value.id,
      input: { ...updateData },
      categories,
      ingredients,
      steps,
      images
    })
    toastRef?.value?.addToast('success', 'Recipe updated successfully')
    router.push(`/recipes/${formRecipe.value.id}`)
  } catch (error) {
    console.error('Error updating recipe:', error)
    toastRef?.value?.addToast('error', 'Failed to update recipe')
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

      // const { url } = await api.recipes.uploadImage(base64Image)
      formRecipe.value.featured_image = base64Image
      validateField('featured_image')
    } catch (error) {
      console.error('Error uploading image:', error)
      toastRef?.value?.addToast('error', 'Failed to upload image')
    }
  }
}

// Category handling
const toggleCategory = (category: Category) => {
  const index = formRecipe.value.categories.findIndex(c => c.category_id === category.id)
  if (index === -1) {
    formRecipe.value.categories.push({
      category_id: category.id,
      name: category.name
    })
  } else {
    formRecipe.value.categories.splice(index, 1)
  }
}

// Tag handling
const addTag = () => {
  if (!formRecipe.value.tags) {
    formRecipe.value.tags = []
  }
  if (newTag.value.trim() && !formRecipe.value.tags.includes(newTag.value.trim())) {
    formRecipe.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  if (formRecipe.value.tags) {
    formRecipe.value.tags.splice(index, 1)
  }
}

// Ingredient handling
const addIngredient = () => {
  formRecipe.value.ingredients.push({
    quantity: '',
    unit: null,
    name: ''
  })
}

const removeIngredient = (index: number) => {
  formRecipe.value.ingredients.splice(index, 1)
}

// Step handling
const addInstruction = () => {
  formRecipe.value.steps.push({
    description: '',
    image_url: undefined
  })
}

const removeInstruction = (index: number) => {
  formRecipe.value.steps.splice(index, 1)
}

const handleFreeChange = () => {
  if (formRecipe.value.isFree) {
    formRecipe.value.price = 0
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

      // const { url } = await api.recipes.uploadImage(base64Image)
      formRecipe.value.steps[index].image_url = base64Image
    } catch (error) {
      console.error('Error uploading step image:', error)
      toastRef?.value?.addToast('error', 'Failed to upload step image')
    }
  }
}

</script> 

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
              v-model="formRecipe.title"
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
              v-model="formRecipe.description"
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
                    v-if="formRecipe.featured_image"
                    :src="formRecipe.featured_image"
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
                v-model="formRecipe.preparation_time"
                type="number"
                min="0"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium">Cook Time (minutes)</label>
              <input
                v-model="formRecipe.preparation_time"
                type="number"
                min="0"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium">Servings</label>
              <input
                v-model="formRecipe.servings"
                type="number"
                min="1"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium">Difficulty</label>
              <select
                v-model="formRecipe.difficulty"
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
                  formRecipe.categories.some(c => c.category_id === category.id)
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
                  v-for="(tag, index) in formRecipe.tags"
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
              v-for="(ingredient, index) in formRecipe.ingredients"
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
              v-for="(step, index) in formRecipe.steps"
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
              v-model="formRecipe.notes"
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
                v-model="formRecipe.isFree"
                class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                @change="handleFreeChange"
              />
              <label for="isFree" class="text-sm font-medium">Make this recipe free</label>
            </div>

            <div>
              <label class="block text-sm font-medium">Price</label>
              <input
                v-model="formRecipe.price"
                type="number"
                min="0"
                step="0.01"
                :disabled="formRecipe.isFree"
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
          >
            Save Recipe
          </button>
        </div>
      </form>
    </div>

    <!-- Toast notifications -->
    <Toast ref="toast" />

    <!-- Unsaved changes dialog -->
  </div>
</template>


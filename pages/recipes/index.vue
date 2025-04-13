<template>
  <div class="container mx-auto px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold">All Recipes</h1>
      <p class="mt-2 text-muted-foreground">
        Discover amazing recipes from our community of food lovers.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">{{ error }}</p>
      <button 
        @click="fetchRecipes" 
        class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
      >
        Try Again
      </button>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Filters and Search -->
      <div class="mb-8 space-y-4">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex-1">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search recipes..."
                class="block w-full rounded-md border bg-background px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Icon
                name="lucide:search"
                class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </div>
          <div class="flex items-center gap-4">
            <select
              v-model="sortBy"
              class="rounded-md flex items-center gap-20 w-24 border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="newest">Newest</option>
              <option value="price">Price</option>
            </select>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              @click="showFilters = !showFilters"
            >
              <Icon
                :name="showFilters ? 'lucide:filter-x' : 'lucide:filter'"
                class="mr-2 h-4 w-4"
              />
              Filters
            </button>
          </div>
        </div>

        <!-- Filter Panel -->
        <div
          v-show="showFilters"
          class="rounded-lg border bg-card p-4 shadow-sm"
        >
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label class="block text-sm font-medium">Category</label>
              <select
                v-model="selectedCategory"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">All Categories</option>
                <option value="Gluten-Free">Gluten-Free</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Lunch">Lunch</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Vegan">Vegan</option>
                <option value="Snacks">Snacks</option>
                <option value="Snacks">Snacks</option>
                
                <!-- Categories will be populated from backend -->
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium">Cooking Time</label>
              <select
                v-model="cookingTime"
                class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Any Time</option>
                <option value="15">15 minutes or less</option>
                <option value="30">30 minutes or less</option>
                <option value="60">1 hour or less</option>
                <option value="120">2 hours or less</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Recipe Grid -->
      <div class="mx-auto max-w-screen-xl lg:max-w-[1400px]">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="recipe in recipes"
            :key="recipe.id"
          >
            <UCard
              class="group hover:shadow-lg transition-shadow h-full"
              @click="navigateTo(`/recipes/${recipe.id}`)"
            >
              <template #header>
                <div class="relative aspect-video overflow-hidden rounded-t-lg">
                  <img
                    :src="recipe.featured_image"
                    :alt="recipe.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div class="absolute top-4 right-4 flex gap-2">
                    <UButton
                      color="white"
                      variant="solid"
                      size="sm"
                      :icon="recipe ? 'i-lucide-bookmark' : 'i-lucide-bookmark-outline'"
                      @click.stop="toggleBookmark(recipe)"
                    />
                  </div>
                </div>
              </template>

              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <UBadge
                    color="primary"
                    variant="subtle"
                    size="sm"
                  >
                    {{ recipe.categories[0].name }}
                  </UBadge>
                  <span class="text-sm text-muted-foreground">
                    {{ recipe.preparation_time }} min
                  </span>
                </div>

                <h3 class="text-lg font-semibold group-hover:text-primary transition-colors">
                  {{ recipe.title }}
                </h3>

                <p class="text-sm text-muted-foreground line-clamp-2">
                  {{ recipe.description }}
                </p>

                <div class="flex items-center justify-between pt-2">
                  <div class="flex items-center gap-2">
                    <UAvatar
                      :src="recipe.user[0].full_name"
                      :alt="recipe.user[0].full_name"
                      size="sm"
                    />
                    <span class="text-sm">{{ recipe.user[0].full_name }} <span class="text-gray-500">{{ user.fullName == recipe.user[0].full_name && "(You)" }}</span></span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon name="lucide:star" class="w-4 h-4 text-yellow-400" />
                    <span class="text-sm">{{ recipe?.rating }}</span>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredRecipes.length === 0"
        class="mt-12 text-center"
      >
        <Icon
          name="lucide:search-x"
          class="mx-auto h-12 w-12 text-muted-foreground"
        />
        <h3 class="mt-4 text-lg font-medium">No recipes found</h3>
        <p class="mt-2 text-sm text-muted-foreground">
          Try adjusting your filters or search terms.
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { api } from '~/utils/api'
import type { Recipe } from '~/types/recipe'
import { useRouter, useRoute } from 'vue-router'

// Router
const router = useRouter()
const route = useRoute()

// State
const searchQuery = ref('')
const sortBy = ref('newest')
const showFilters = ref(false)
const selectedCategory = ref('')
const cookingTime = ref('')
const recipes = ref<Recipe[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

let user = null;

if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user") || "{}");
}

// Fetch recipes
const fetchRecipes = async () => {
  try {

    loading.value = true
    error.value = null
    const data = await api.recipes.getAll()
    recipes.value = data
  } catch (err) {
    console.error('Error fetching recipes:', err)
    if (err instanceof Error && 'status' in err) {
      // Handle API errors
      const apiError = err as { status: number; message: string }
      if (apiError.status === 401 || apiError.message.includes('Authorization')) {
        // Unauthorized or missing auth - redirect to login
      } else {
        error.value = apiError.message || 'Failed to fetch recipes'
      }
    } else if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'Failed to fetch recipes. Please try again later.'
    }
  } finally {
    loading.value = false
  }
}

// Fetch recipes on component mount
onMounted(() => {
  fetchRecipes()
})

// Computed
const filteredRecipes = computed(() => {
  let result = [...recipes.value]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      recipe =>
        recipe.title.toLowerCase().includes(query) ||
        (recipe.description?.toLowerCase().includes(query) ?? false)
    )
  }

  // Apply category filter
  if (selectedCategory.value) {
    result = result.filter(recipe => (recipe.categories.map(category => (category.name === selectedCategory.value)).includes(true)))
  }

  // Apply cooking time filter
  if (cookingTime.value) {
    result = result.filter(recipe => recipe.preparation_time <= Number(cookingTime.value))
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'newest':
      result.sort((a, b) => b.id.localeCompare(a.id))
      break
    case 'price':
      result.sort((a, b) => (b.price || 0) - (a.price || 0))
      break
  }

  return result
})

// Methods
const toggleBookmark = async (recipe: Recipe) => {
  try {
    // TODO: Implement bookmark functionality using api.post
    console.log('Bookmark toggled for recipe:', recipe.id)
  } catch (err) {
    console.error('Failed to toggle bookmark:', err)
  }
}

// Page meta
useHead({
  title: 'All Recipes',
  meta: [
    {
      name: 'description',
      content: 'Browse our collection of delicious recipes from around the world.'
    }
  ]
})
</script> 
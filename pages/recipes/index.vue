<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold">All Recipes</h1>
      <p class="mt-2 text-muted-foreground">
        Discover amazing recipes from our community of food lovers.
      </p>
    </div>

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
            class="rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
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
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
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

          <div>
            <label class="block text-sm font-medium">Difficulty</label>
            <select
              v-model="difficulty"
              class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium">Rating</label>
            <select
              v-model="minRating"
              class="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Recipe Grid -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        class="group relative overflow-hidden rounded-lg border bg-card transition-colors hover:border-primary"
      >
        <NuxtLink :to="`/recipes/${recipe.slug}`">
          <div class="aspect-[4/3] overflow-hidden">
            <img
              :src="recipe.featuredImage"
              :alt="recipe.title"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-4">
            <div class="flex items-start justify-between">
              <h2 class="text-lg font-semibold leading-tight">
                {{ recipe.title }}
              </h2>
              <button
                type="button"
                class="rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                @click.prevent="toggleBookmark(recipe)"
              >
                <Icon
                  :name="recipe.isBookmarked ? 'lucide:bookmark' : 'lucide:bookmark-outline'"
                  class="h-5 w-5"
                />
              </button>
            </div>
            <p class="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {{ recipe.description }}
            </p>
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-1">
                  <Icon name="lucide:clock" class="h-4 w-4 text-muted-foreground" />
                  <span class="text-sm text-muted-foreground">
                    {{ recipe.prepTime }} min
                  </span>
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="lucide:star" class="h-4 w-4 text-yellow-400" />
                  <span class="text-sm text-muted-foreground">
                    {{ recipe.rating }}
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <img
                  :src="recipe.author.avatar"
                  :alt="recipe.author.name"
                  class="h-6 w-6 rounded-full"
                />
                <span class="text-sm text-muted-foreground">
                  {{ recipe.author.name }}
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
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

    <!-- Pagination -->
    <div
      v-if="filteredRecipes.length > 0"
      class="mt-8 flex justify-center"
    >
      <nav class="flex items-center gap-2">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <Icon name="lucide:chevron-left" class="h-4 w-4" />
        </button>
        <span class="text-sm text-muted-foreground">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          <Icon name="lucide:chevron-right" class="h-4 w-4" />
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Recipe {
  id: number
  title: string
  slug: string
  description: string
  featuredImage: string
  prepTime: number
  rating: number
  isBookmarked: boolean
  categoryId: number
  difficulty: 'easy' | 'medium' | 'hard'
  author: {
    name: string
    avatar: string
  }
}

// State
const searchQuery = ref('')
const sortBy = ref('newest')
const showFilters = ref(false)
const selectedCategory = ref('')
const cookingTime = ref('')
const difficulty = ref('')
const minRating = ref('')
const currentPage = ref(1)
const totalPages = ref(5)

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

const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Classic Margherita Pizza',
    slug: 'classic-margherita-pizza',
    description: 'A traditional Italian pizza with fresh tomatoes, mozzarella, and basil.',
    featuredImage: '/images/recipes/margherita-pizza.jpg',
    prepTime: 30,
    rating: 4.8,
    isBookmarked: false,
    categoryId: 3,
    difficulty: 'medium',
    author: {
      name: 'John Doe',
      avatar: '/images/avatars/john-doe.jpg',
    },
  },
  {
    id: 2,
    title: 'Chocolate Chip Cookies',
    slug: 'chocolate-chip-cookies',
    description: 'Soft and chewy chocolate chip cookies with a crispy edge.',
    featuredImage: '/images/recipes/chocolate-chip-cookies.jpg',
    prepTime: 25,
    rating: 4.9,
    isBookmarked: true,
    categoryId: 4,
    difficulty: 'easy',
    author: {
      name: 'Jane Smith',
      avatar: '/images/avatars/jane-smith.jpg',
    },
  },
  // Add more mock recipes as needed
]

// Computed
const filteredRecipes = computed(() => {
  let result = [...recipes]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      recipe =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query)
    )
  }

  // Apply category filter
  if (selectedCategory.value) {
    result = result.filter(recipe => recipe.categoryId === Number(selectedCategory.value))
  }

  // Apply cooking time filter
  if (cookingTime.value) {
    result = result.filter(recipe => recipe.prepTime <= Number(cookingTime.value))
  }

  // Apply difficulty filter
  if (difficulty.value) {
    result = result.filter(recipe => recipe.difficulty === difficulty.value)
  }

  // Apply rating filter
  if (minRating.value) {
    result = result.filter(recipe => recipe.rating >= Number(minRating.value))
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'newest':
      result.sort((a, b) => b.id - a.id)
      break
    case 'popular':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
  }

  return result
})

// Methods
const toggleBookmark = (recipe: any) => {
  recipe.isBookmarked = !recipe.isBookmarked
  // TODO: Implement bookmark functionality with backend
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
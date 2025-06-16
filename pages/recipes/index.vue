<script setup lang="ts">
import { ref, computed, onMounted, watch, inject } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import {
  GET_ALL_RECIPES,
  GET_ALL_CATEGORIES
} from '~/utils/graphql-operations'

// Pagination state
const page = ref(1)
const pageSize = ref(3)

// Filters
const searchQuery = ref('')
const sortBy = ref('newest')
const showFilters = ref(false)
const selectedCategory = ref('')
const cookingTime = ref('')

let user = null;

if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user") || "{}");
}

// Apollo query for categories (for filter dropdown)
const { result: categoriesResult } = useQuery(GET_ALL_CATEGORIES)

// Apollo query for recipes
const variables = computed(() => {
  let where: any = {}
  if (searchQuery.value) {
    where._or = [
      { title: { _ilike: `%${searchQuery.value}%` } },
      { description: { _ilike: `%${searchQuery.value}%` } },
      { recipe_categories: { category: { name: { _ilike: `%${searchQuery.value}%` } } } }
    ]
  }
  if (selectedCategory.value) {
    where.recipe_categories = { category: { name: { _eq: selectedCategory.value } } }
  }
  if (cookingTime.value) {
    where.preparation_time = { _lte: parseInt(cookingTime.value) }
  }
  let order_by: any[] = [{ created_at: 'desc' }]
  if (sortBy.value === 'price') {
    order_by = [{ price: 'desc' }]
  }
  return {
    where,
    order_by,
    limit: pageSize.value,
    offset: (page.value - 1) * pageSize.value
  }
})

const { result: recipesResult, loading: gqlLoading, error: gqlError, refetch } = useQuery(GET_ALL_RECIPES, variables)

const recipes = computed(() => {
  if (!recipesResult.value || !recipesResult.value.recipes) {
    return []
  }
  return recipesResult.value.recipes
})

const totalCount = computed(() => recipesResult.value?.recipes_aggregate?.aggregate?.count || 0)

// Pagination controls
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value))
const goToPage = (p: number) => {
  if (p < 1 || p > totalPages.value) return
  page.value = p
}
// Button handler for error retry
const handleRetry = () => {
  refetch()
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
    <div v-if="gqlLoading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary">
        <h1>Loading...</h1>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="gqlError" class="text-center py-12">
      <p class="text-red-500">{{ gqlError.message }}</p>
      <button 
        @click="handleRetry" 
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
                <option v-for="cat in categoriesResult?.categories || []" :key="cat.id" :value="cat.name">
                  {{ cat.name }}
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
                <div class="relative h-64 overflow-hidden rounded-t-lg">
                  <img
                    :src="recipe.featured_image"
                    :alt="recipe.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <!-- Price Badge -->
                  <div class="absolute top-4 right-4 z-10">
                    <span v-if="recipe.user?.id === user?.id" 
                          class="bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md">
                      Your Recipe
                    </span>
                    <span v-else-if="recipe.isPaid" 
                          class="bg-primary text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md">
                      Paid
                    </span>
                    <span v-else-if="recipe.price > 0" 
                          class="bg-primary text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md">
                      ETB {{ recipe.price }}
                    </span>
                    <span v-else 
                          class="bg-gray-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md">
                      Free
                    </span>
                  </div>
                  <!-- Dark Gradient Overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </template>
              
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <UBadge
                    v-if="recipe.recipe_categories[0].category.name"
                    color="primary"
                    variant="subtle"
                    size="sm"
                  >
                    {{ recipe.recipe_categories[0].category.name }}
                  </UBadge>
                  <span class="text-sm text-muted-foreground flex items-center">
                    <i class="far fa-clock mr-1"></i>
                    {{ recipe.preparation_time }} min
                  </span>
                </div>

                <h3 class="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                  {{ recipe.title }}
                </h3>

                <p class="text-sm text-muted-foreground line-clamp-2">
                  {{ recipe.description }}
                </p>

                <div class="flex items-center justify-between pt-2">
                  <div class="flex items-center gap-2">
                    <UAvatar
                      :src="recipe.user?.full_name"
                      :alt="recipe.user?.full_name"
                      size="sm"
                    />
                    <span class="text-sm">
                      {{ recipe.user.full_name }}
                      <span v-if="user?.fullName === recipe.user.full_name" 
                            class="text-gray-500">(You)</span>
                    </span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon name="lucide:star" class="w-4 h-4 text-yellow-400" />
                    <span class="text-sm">{{ recipe.recipe_ratings_aggregate?.aggregate?.avg?.rating?.toFixed(1) || '0.0' }}</span>
                    <span class="text-xs text-muted-foreground ml-1">({{ recipe.recipe_ratings_aggregate?.aggregate?.count || 0 }})</span>
                  </div>
                  <div class="flex items-center gap-1 ml-2">
                    <i class="fas fa-heart text-red-500"></i>
                    <span class="text-sm">{{ recipe.recipe_likes_aggregate?.aggregate?.count || 0 }}</span>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="recipes.length === 0"
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

      <!-- Pagination Controls -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <button
          class="px-3 py-1 mx-1 rounded border"
          :class="{ 'bg-primary text-white': page === 1 }"
          :disabled="page === 1"
          @click="goToPage(page - 1)"
        >Prev</button>
        <button
          v-for="p in totalPages"
          :key="p"
          class="px-3 py-1 mx-1 rounded border"
          :class="{ 'bg-primary text-white': page === p }"
          @click="goToPage(p)"
        >{{ p }}</button>
        <button
          class="px-3 py-1 mx-1 rounded border"
          :class="{ 'bg-primary text-white': page === totalPages }"
          :disabled="page === totalPages"
          @click="goToPage(page + 1)"
        >Next</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 
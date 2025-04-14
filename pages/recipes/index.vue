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
            v-for="recipe in filteredRecipes"
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
                    <span v-if="recipe.user?.[0]?.id === user?.id" 
                          class="bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md">
                      Your Recipe
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
                  <!-- Like and Bookmark Buttons -->
                  <div class="absolute  bottom-4 right-4 flex space-x-2 z-10">
                    <button
                      @click.stop="toggleLike(recipe)"
                      class="rounded-full bg-white p-2.5 w-10 h-12 self-center shadow-md hover:bg-gray-100 transition-colors"
                      :class="{ 'text-red-500': recipe.isLiked }"
                    >
                      <i :class="recipe.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>
                    </button>
                    <button
                      @click.stop="toggleBookmark(recipe)"
                      class="rounded-full bg-white p-2.5 w-10 h-12 shadow-md hover:bg-gray-100 transition-colors"
                      :class="{ 'text-blue-500': recipe.isBookmarked }"
                    >
                      <i :class="recipe.isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'"></i>
                    </button>
                  </div>
                  <!-- Dark Gradient Overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </template>
              
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <UBadge
                    v-if="recipe.categories?.[0]"
                    color="primary"
                    variant="subtle"
                    size="sm"
                  >
                    {{ recipe.categories[0].name }}
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
                      :src="recipe.user[0].full_name"
                      :alt="recipe.user[0].full_name"
                      size="sm"
                    />
                    <span class="text-sm">
                      {{ recipe.user[0].full_name }}
                      <span v-if="user?.fullName === recipe.user[0].full_name" 
                            class="text-gray-500">(You)</span>
                    </span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon name="lucide:star" class="w-4 h-4 text-yellow-400" />
                    <span class="text-sm">{{ recipe?.rating || '0.0' }}</span>
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
import { ref, computed, onMounted, watch, inject } from 'vue'
import { api } from '~/utils/api'
import { useRouter, useRoute } from 'vue-router'

interface ToastRef {
  value?: {
    addToast: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
  };
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  featured_image: string;
  preparation_time: number;
  price: number;
  user: Array<{
    id: string;
    full_name: string;
    username: string;
  }>;
  categories: Array<{
    category_id: string;
    name: string;
  }>;
  rating?: number;
  isLiked: boolean;
  isBookmarked: boolean;
  created_at?: string;
}

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

const toastRef = inject<ToastRef>('toast');

// Fetch recipes
const fetchRecipes = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await api.recipes.getAll()
    recipes.value = data.map(recipe => ({
      ...recipe,
      isLiked: false,
      isBookmarked: false
    }))
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

// Computed
const filteredRecipes = computed(() => {
  let result = [...recipes.value]

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(recipe => 
      recipe.title.toLowerCase().includes(query) ||
      recipe.description?.toLowerCase().includes(query) ||
      recipe.categories?.some(cat => cat.name.toLowerCase().includes(query)) ||
      false
    )
  }

  // Apply category filter
  if (selectedCategory.value) {
    result = result.filter(recipe => 
      recipe.categories?.some(category => 
        category.name.toLowerCase() === selectedCategory.value.toLowerCase()
      )
    )
  }

  // Apply cooking time filter
  if (cookingTime.value) {
    const maxTime = parseInt(cookingTime.value)
    result = result.filter(recipe => 
      recipe.preparation_time && recipe.preparation_time <= maxTime
    )
  }

  // Apply sorting
  if (sortBy.value === 'newest') {
    result.sort((a, b) => {
      const dateA = new Date(a.created_at || 0)
      const dateB = new Date(b.created_at || 0)
      return dateB.getTime() - dateA.getTime()
    })
  } else if (sortBy.value === 'price') {
    result.sort((a, b) => (b.price || 0) - (a.price || 0))
  }

  return result
})

// Watch for filter changes to update URL
watch([searchQuery, selectedCategory, cookingTime, sortBy], () => {
  // Update URL with current filters
  router.replace({
    query: {
      ...(searchQuery.value && { search: searchQuery.value }),
      ...(selectedCategory.value && { category: selectedCategory.value }),
      ...(cookingTime.value && { time: cookingTime.value }),
      ...(sortBy.value !== 'newest' && { sort: sortBy.value })
    }
  })
})

// Initialize filters from URL on mount
onMounted(() => {
  const query = route.query
  searchQuery.value = query.search?.toString() || ''
  selectedCategory.value = query.category?.toString() || ''
  cookingTime.value = query.time?.toString() || ''
  sortBy.value = query.sort?.toString() || 'newest'
  
  fetchRecipes()
})

// Methods
const toggleLike = async (recipe: Recipe) => {
  try {
    if (!user?.id) {
      toastRef?.value?.addToast('info', 'Please login to like recipes');
      return;
    }

    recipe.isLiked = !recipe.isLiked;
    const res = recipe.isLiked
      ? await api.recipes.likeRecipe(recipe.id)
      : await api.recipes.unlikeRecipe(recipe.id);

    toastRef?.value?.addToast('success', res.message || 'Action completed');
  } catch (err) {
    console.error('Error toggling like:', err);
    recipe.isLiked = !recipe.isLiked; // Revert on error
    toastRef?.value?.addToast('error', 'Failed to toggle like');
  }
};

const toggleBookmark = async (recipe: Recipe) => {
  try {
    if (!user?.id) {
      toastRef?.value?.addToast('info', 'Please login to bookmark recipes');
      return;
    }

    recipe.isBookmarked = !recipe.isBookmarked;
    const res = recipe.isBookmarked
      ? await api.recipes.bookmarkRecipe(recipe.id)
      : await api.recipes.unbookmarkRecipe(recipe.id);

    toastRef?.value?.addToast('success', res.message || 'Action completed');
  } catch (err) {
    console.error('Error toggling bookmark:', err);
    recipe.isBookmarked = !recipe.isBookmarked; // Revert on error
    toastRef?.value?.addToast('error', 'Failed to toggle bookmark');
  }
};

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
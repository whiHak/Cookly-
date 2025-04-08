<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="text-center">
      <p class="text-lg font-semibold">Loading recipe...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center text-red-500">
      <p class="text-lg font-semibold">Failed to load recipe. Please try again later.</p>
    </div>

    <!-- Recipe Content -->
    <div v-if="!loading && !error">
      <!-- Recipe Header -->
      <div class="relative mb-8">
        <div class="aspect-[16/9] overflow-hidden rounded-lg">
          <img
            :src="recipe.featuredImage"
            :alt="recipe.title"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 class="text-4xl font-bold">{{ recipe.title }}</h1>
            <p class="mt-2 text-lg">{{ recipe.description }}</p>
          </div>
        </div>
      </div>

      <!-- Recipe Info -->
      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Ingredients -->
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Ingredients</h2>
            <ul class="mt-4 space-y-4">
              <li
                v-for="(ingredient, index) in recipe.ingredients"
                :key="index"
                class="flex items-center gap-4 p-2 rounded-lg bg-gray-50 shadow-sm"
              >
                <input
                  type="checkbox"
                  class="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <div class="flex flex-col">
                  <span class="text-primary-foreground font-medium">
                    {{ ingredient.quantity }} {{ ingredient.unit }}
                  </span>
                  <span class="text-muted-foreground">{{ ingredient.name }}</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- Instructions -->
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Instructions</h2>
            <ol class="mt-4 space-y-6">
              <li
                v-for="(step, index) in recipe.steps"
                :key="index"
                class="flex gap-4 items-start"
              >
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                  {{ step.step_number }}
                </div>
                <div>
                  <p class="text-muted-foreground">{{ step.description }}</p>
                  <img
                    v-if="step.image_url"
                    :src="step.image_url"
                    :alt="`Step ${step.step_number}`"
                    class="mt-2 rounded-lg shadow-md"
                  />
                </div>
              </li>
            </ol>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-8 space-y-6">
            <!-- Recipe Info -->
            <div class="rounded-lg border p-4 shadow-md">
              <h3 class="font-semibold">Recipe Info</h3>
              <div class="mt-4 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-muted-foreground">Prep Time</span>
                  <span>{{ recipe.preparation_time }} minutes</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-muted-foreground">Price</span>
                  <span>{{ recipe.price == 0 ? "Free" : `$` + recipe.price }}</span>
                </div>
              </div>
              <div v-if="recipe.price > 0" class="mt-4">
                <button
                  class="w-full rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark shadow-lg"
                >
                  Pay Now
                </button>
              </div>
            </div>

            <!-- Categories -->
            <div v-if="recipe.categories" class="rounded-lg border p-4 shadow-md">
              <h3 class="font-semibold">Categories</h3>
              <div class="mt-4 flex flex-wrap gap-2">
                <NuxtLink
                  v-for="category in recipe.categories"
                  :key="category.id"
                  :to="`/categories/${category.slug}`"
                  class="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground hover:bg-muted/80"
                >
                  {{ category.name }}
                </NuxtLink>
              </div>
            </div>

            <!-- Share Recipe -->
            <div class="rounded-lg border p-4">
              <h3 class="font-semibold">Share Recipe</h3>
              <div class="mt-4 flex gap-2">
                <button
                  v-for="platform in sharePlatforms"
                  :key="platform.name"
                  type="button"
                  class="flex items-center justify-center rounded-md border bg-background p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  @click="shareRecipe(platform)"
                >
                  <Icon :name="platform.icon" class="h-5 w-5" />
                </button>
              </div>
            </div>

            <!-- Rating, Like, and Bookmark -->
            <div class="rounded-lg border p-4 shadow-md">
              <h3 class="font-semibold">Rate, Like & Bookmark</h3>
              <div class="mt-4 space-y-4">
                <!-- Star Rating -->
                <div class="flex items-center gap-1">
                  <span
                    v-for="star in 5"
                    :key="star"
                    @click="rateRecipe(star)"
                    class="cursor-pointer text-xl"
                    :class="star <= userRating ? 'text-yellow-500' : 'text-gray-300'"
                  >
                    ★
                  </span>
                </div>
                <!-- Like Button -->
                <button
                  @click="toggleLike"
                  class="flex items-center gap-2 rounded-md border px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <i :class="isLiked ? 'fas fa-heart text-red-500' : 'far fa-heart'"></i>
                  <span>{{ isLiked ? 'Liked' : 'Like' }}</span>
                </button>
                <!-- Bookmark Button -->
                <button
                  @click="toggleBookmark"
                  class="flex items-center gap-2 rounded-md border px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <i :class="isBookmarked ? 'fas fa-bookmark text-blue-500' : 'far fa-bookmark'"></i>
                  <span>{{ isBookmarked ? 'Bookmarked' : 'Bookmark' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// State
const recipe = ref<any>(null)
const loading = ref(true)
const error = ref(false)

const sharePlatforms = [
  { name: 'Facebook', icon: 'lucide:facebook' },
  { name: 'Twitter', icon: 'lucide:twitter' },
  { name: 'Pinterest', icon: 'lucide:youtube' },
  { name: 'WhatsApp', icon: 'lucide:tiktok' },
  { name: 'Email', icon: 'lucide:gmail' },
]

// Rating, Like, and Bookmark State
const userRating = ref(0)
const isLiked = ref(false)
const isBookmarked = ref(false)

// Methods
const rateRecipe = (rating: number) => {
  userRating.value = rating
  console.log(`Rated ${rating} stars`)
}

const toggleLike = () => {
  isLiked.value = !isLiked.value
  console.log(isLiked.value ? 'Liked the recipe' : 'Unliked the recipe')
}

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
  console.log(isBookmarked.value ? 'Bookmarked the recipe' : 'Removed bookmark')
}

// Fetch Recipe
const fetchRecipe = async () => {
  try {
    loading.value = true
    const data = await api.recipes.getBySlug(route.params.slug as string)
    recipe.value = {
      id: data.id,
      title: data.title,
      description: data.description,
      featuredImage: data.featured_image,
      preparation_time: data.preparation_time,
      price: data.price,
      steps: data.steps,
      ingredients: data.ingredients.map((ingredient: any) => ({
        name: ingredient.ingredient_id, // Replace with actual name if available
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      })),
      categories: data.categories || [],
    }
  } catch (err) {
    console.error('Error fetching recipe:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

// Fetch recipe on component mount
onMounted(() => {
  fetchRecipe()
})
</script>
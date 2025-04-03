<template>
  <div class="container mx-auto px-4 py-8">
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
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold">{{ recipe.title }}</h1>
              <div class="mt-2 flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <img
                    :src="recipe.author.avatar"
                    :alt="recipe.author.name"
                    class="h-8 w-8 rounded-full"
                  />
                  <span>{{ recipe.author.name }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="lucide:clock" class="h-4 w-4" />
                  <span>{{ recipe.prepTime }} minutes</span>
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="lucide:star" class="h-4 w-4 text-yellow-400" />
                  <span>{{ recipe.rating }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                @click="toggleBookmark"
              >
                <Icon
                  :name="recipe.isBookmarked ? 'lucide:bookmark' : 'lucide:bookmark-outline'"
                  class="h-5 w-5"
                />
              </button>
              <button
                type="button"
                class="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                @click="toggleShare"
              >
                <Icon name="lucide:share-2" class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-8 lg:grid-cols-3">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        <!-- Description -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold">Description</h2>
          <p class="mt-2 text-muted-foreground">{{ recipe.description }}</p>
        </div>

        <!-- Ingredients -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold">Ingredients</h2>
          <div class="mt-4 space-y-2">
            <div
              v-for="(ingredient, index) in recipe.ingredients"
              :key="index"
              class="flex items-center gap-2"
            >
              <input
                type="checkbox"
                :id="`ingredient-${index}`"
                class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                :for="`ingredient-${index}`"
                class="text-muted-foreground"
              >
                {{ ingredient }}
              </label>
            </div>
          </div>
        </div>

        <!-- Instructions -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold">Instructions</h2>
          <div class="mt-4 space-y-6">
            <div
              v-for="(step, index) in recipe.instructions"
              :key="index"
              class="flex gap-4"
            >
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                {{ index + 1 }}
              </div>
              <div>
                <p class="text-muted-foreground">{{ step.description }}</p>
                <img
                  v-if="step.image"
                  :src="step.image"
                  :alt="`Step ${index + 1}`"
                  class="mt-2 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="recipe.notes" class="mb-8">
          <h2 class="text-xl font-semibold">Notes</h2>
          <div class="mt-4 rounded-lg bg-muted p-4">
            <p class="text-muted-foreground">{{ recipe.notes }}</p>
          </div>
        </div>

        <!-- Comments -->
        <div>
          <h2 class="text-xl font-semibold">Comments</h2>
          <div class="mt-4 space-y-4">
            <div
              v-for="comment in recipe.comments"
              :key="comment.id"
              class="rounded-lg border p-4"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <img
                    :src="comment.author.avatar"
                    :alt="comment.author.name"
                    class="h-8 w-8 rounded-full"
                  />
                  <div>
                    <div class="font-medium">{{ comment.author.name }}</div>
                    <div class="text-sm text-muted-foreground">
                      {{ formatDate(comment.createdAt) }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="lucide:star" class="h-4 w-4 text-yellow-400" />
                  <span>{{ comment.rating }}</span>
                </div>
              </div>
              <p class="mt-2 text-muted-foreground">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <!-- Recipe Info -->
        <div class="sticky top-8 space-y-6">
          <div class="rounded-lg border p-4">
            <h3 class="font-semibold">Recipe Info</h3>
            <div class="mt-4 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-muted-foreground">Prep Time</span>
                <span>{{ recipe.prepTime }} minutes</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-muted-foreground">Cook Time</span>
                <span>{{ recipe.cookTime }} minutes</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-muted-foreground">Total Time</span>
                <span>{{ recipe.prepTime + recipe.cookTime }} minutes</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-muted-foreground">Servings</span>
                <span>{{ recipe.servings }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-muted-foreground">Difficulty</span>
                <span class="capitalize">{{ recipe.difficulty }}</span>
              </div>
            </div>
          </div>

          <!-- Categories -->
          <div class="rounded-lg border p-4">
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

          <!-- Tags -->
          <div class="rounded-lg border p-4">
            <h3 class="font-semibold">Tags</h3>
            <div class="mt-4 flex flex-wrap gap-2">
              <NuxtLink
                v-for="tag in recipe.tags"
                :key="tag"
                :to="`/tags/${tag}`"
                class="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground hover:bg-muted/80"
              >
                {{ tag }}
              </NuxtLink>
            </div>
          </div>

          <!-- Share -->
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// State
const recipe = ref({
  id: 1,
  title: 'Classic Margherita Pizza',
  slug: 'classic-margherita-pizza',
  description: 'A traditional Italian pizza with fresh tomatoes, mozzarella, and basil. This recipe will guide you through making a perfect Margherita pizza at home.',
  featuredImage: '/images/recipes/margherita-pizza.jpg',
  prepTime: 30,
  cookTime: 15,
  servings: 4,
  difficulty: 'medium',
  rating: 4.8,
  isBookmarked: false,
  author: {
    name: 'John Doe',
    avatar: '/images/avatars/john-doe.jpg',
  },
  ingredients: [
    '2 cups all-purpose flour',
    '1 teaspoon active dry yeast',
    '1 teaspoon sugar',
    '1 teaspoon salt',
    '3/4 cup warm water',
    '2 tablespoons olive oil',
    '1 cup tomato sauce',
    '8 ounces fresh mozzarella',
    'Fresh basil leaves',
    'Extra virgin olive oil',
  ],
  instructions: [
    {
      description: 'In a small bowl, combine the yeast, sugar, and warm water. Let it sit for 5 minutes until frothy.',
    },
    {
      description: 'In a large bowl, mix the flour and salt. Add the yeast mixture and olive oil. Knead until smooth.',
      image: '/images/recipes/margherita-pizza-step1.jpg',
    },
    {
      description: 'Cover the dough and let it rise for 2 hours.',
    },
    {
      description: 'Preheat the oven to 500°F (260°C) with a pizza stone or baking sheet.',
    },
    {
      description: 'Roll out the dough and top with sauce, mozzarella, and basil.',
      image: '/images/recipes/margherita-pizza-step2.jpg',
    },
    {
      description: 'Bake for 12-15 minutes until the crust is golden and cheese is melted.',
    },
  ],
  notes: 'For best results, use a pizza stone and preheat it for at least 30 minutes. You can also use a cast iron skillet for a crispy crust.',
  categories: [
    { id: 1, name: 'Italian', slug: 'italian' },
    { id: 2, name: 'Pizza', slug: 'pizza' },
    { id: 3, name: 'Main Course', slug: 'main-course' },
  ],
  tags: ['pizza', 'italian', 'vegetarian', 'quick-meal'],
  comments: [
    {
      id: 1,
      content: 'This recipe is amazing! The crust turned out perfectly crispy.',
      rating: 5,
      createdAt: '2024-03-15T10:30:00Z',
      author: {
        name: 'Jane Smith',
        avatar: '/images/avatars/jane-smith.jpg',
      },
    },
    {
      id: 2,
      content: 'I added some fresh garlic to the sauce, and it was delicious!',
      rating: 4,
      createdAt: '2024-03-14T15:45:00Z',
      author: {
        name: 'Mike Johnson',
        avatar: '/images/avatars/mike-johnson.jpg',
      },
    },
  ],
})

const sharePlatforms = [
  { name: 'Facebook', icon: 'lucide:facebook' },
  { name: 'Twitter', icon: 'lucide:twitter' },
  { name: 'Pinterest', icon: 'lucide:pinterest' },
  { name: 'WhatsApp', icon: 'lucide:message-circle' },
  { name: 'Email', icon: 'lucide:mail' },
]

// Methods
const toggleBookmark = () => {
  recipe.value.isBookmarked = !recipe.value.isBookmarked
  // TODO: Implement bookmark functionality with backend
}

const toggleShare = () => {
  // TODO: Implement share functionality
}

const shareRecipe = (platform: any) => {
  // TODO: Implement platform-specific sharing
  console.log('Share on:', platform.name)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Page meta
useHead({
  title: recipe.value.title,
  meta: [
    {
      name: 'description',
      content: recipe.value.description,
    },
    {
      property: 'og:title',
      content: recipe.value.title,
    },
    {
      property: 'og:description',
      content: recipe.value.description,
    },
    {
      property: 'og:image',
      content: recipe.value.featuredImage,
    },
  ],
})
</script> 
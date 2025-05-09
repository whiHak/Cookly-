<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          src="/images/avatars/Pizza.jpg"
          alt="Delicious food background"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/50" />
      </div>
      
      <div class="container relative z-10 text-center text-white">
        <h1 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          class="text-5xl md:text-6xl font-bold mb-6"
        >
          Discover Amazing Recipes
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
        >
          Share your culinary journey with the world. Find inspiration, create, and connect with food lovers.
        </p>
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
          class="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <UButton
            to="/recipes"
            size="xl"
            color="white"
            variant="solid"
          >
            Browse Recipes
          </UButton>
          <UButton
            to="/recipes/create"
            size="xl"
            color="white"
            variant="outline"
          >
            Share Your Recipe
          </UButton>
        </div>
      </div>
    </section>

    <!-- Featured Recipes -->
    <section class="py-16">
      <div class="container">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold">Featured Recipes</h2>
          <UButton
            to="/recipes"
            variant="ghost"
            color="primary"
          >
            View All
          </UButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="recipe in featuredRecipes"
            :key="recipe.id"
          >
            <UCard
              class="group hover:shadow-lg transition-shadow h-full"
              @click="navigateTo(`/recipes`)"
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
                      :icon="recipe.isBookmarked ? 'i-lucide-bookmark' : 'i-lucide-bookmark-outline'"
                      @click.stop="toggleBookmark(recipe)"
                    />
                  </div>
                </div>
              </template>

              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <UBadge
                    :color="recipe?.category?.color as any"
                    variant="subtle"
                    size="sm"
                  >
                    {{ recipe.category.name }}
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
                      :src="recipe.user.profile_picture"
                      :alt="recipe.user.username"
                      size="sm"
                    />
                    <span class="text-sm">{{ recipe.user.username }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon name="lucide:star" class="w-4 h-4 text-yellow-400" />
                    <span class="text-sm">{{ recipe.rating }}</span>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-16 bg-muted/50">
      <div class="container">
        <h2 class="text-3xl font-bold mb-8">Browse by Category</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div
            v-for="(category, index) in categories"
            :key="category.id"
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :enter="{ opacity: 1, scale: 1, transition: { delay: index * 100 } }"
          >
            <UCard
              class="group cursor-pointer hover:shadow-lg transition-all h-full"
              @click="navigateTo(`/recipes?category=${category.id}`)"
            >
              <div class="aspect-square relative overflow-hidden rounded-lg">
                <img
                  :src="category.image_url"
                  :alt="category.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div class="absolute inset-0 flex items-center justify-center">
                  <h3 class="text-xl font-semibold text-white">
                    {{ category.name }}
                  </h3>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-16">
      <div class="container">
        <div class="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
          >
            <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
            <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest recipes, cooking tips, and food inspiration.
            </p>
            <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <UInput
                v-model="email"
                type="email"
                placeholder="Enter your email"
                size="lg"
                class="w-full"
              />
              <UButton
                type="submit"
                color="primary"
                size="lg"
                :loading="isSubscribing"
              >
                Subscribe
              </UButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { useMotion } from '@vueuse/motion'

// State
const email = ref('')
const isSubscribing = ref(false)

interface ToastRef {
  value: {
    addToast: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void
  } | null
}
const toastRef = inject<ToastRef>('toast')


// Mock featured recipes (replace with API data)
const featuredRecipes = [
  {
    id: 1,
    title: 'Ethiopian Doro Wat (Spicy Chicken Stew)',
    description: 'Doro Wat is a deeply spiced, slow-cooked Ethiopian chicken stew made with caramelized onions, berbere spice, and tender chicken pieces. Traditionally served with injera (Ethiopian sour flatbread) and hard-boiled eggs, it’s a bold, comforting dish full of layers of flavor — perfect for special occasions or family gatherings.',
    featured_image: '/images/doro.jpg',
    preparation_time: 50,
    rating: 4.9,
    isBookmarked: false,
    category: {
      id: 'mexican',
      name: 'Lunch',
      color: 'secondary'
    },
    user: {
      username: 'Betselot Abraham',
      profile_picture: '/images/avatars/sweet-tooth.jpg'
    }
  },
  {
    id: 2,
    title: 'Classic Italian Pasta',
    description: 'A traditional Italian pasta recipe with fresh ingredients and authentic flavors.',
    featured_image: '/images/categories/italy.jpeg',
    preparation_time: 30,
    rating: 4.8,
    isBookmarked: false,
    category: {
      id: 'italians',
      name: 'Italian',
      color: 'primary'
    },
    user: {
      username: 'Chef.Aweke',
      profile_picture: '/images/avatars/Pizza.jpg'
    }
  },
  {
    id: 3,
    title: 'Healthy Buddha Bowl',
    description: 'A nutritious and colorful bowl packed with protein, vegetables, and whole grains.',
    featured_image: '/images/categories/dessert.jpg',
    preparation_time: 25,
    rating: 4.6,
    isBookmarked: true,
    category: {
      id: 'healthy',
      name: 'Healthy',
      color: 'success'
    },
    user: {
      username: 'MahiTesfa',
      profile_picture: '/images/categories/healthy-eats.jpg'
    }
  },
]

// Mock categories (replace with API data)
const categories = ref([
  {
    id: "italian",
    name: 'Italian',
    image_url: '/images/categories/italy.jpeg'
  },
  {
    id: "asian",
    name: 'Asian',
    image_url: '/images/categories/asian.jpg'
  },
  {
    id: "mexican",
    name: 'Mexican',
    image_url: '/images/categories/mexican.jpg'
  },
  {
    id: "Lunch",
    name: 'Ethipian',
    image_url: '/images/doro.jpg'
  },
  {
    id: "vegetarian",
    name: 'Vegetarian',
    image_url: '/images/categories/vegi.jpg'
  }
])

// Methods
const toggleBookmark = async (recipe: any) => {
  // TODO: Implement bookmark functionality
  recipe.isBookmarked = !recipe.isBookmarked
}

const handleSubscribe = async () => {
  toastRef?.value?.addToast('info', 'Comming soon')

}

// Page meta
useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content: 'Discover and share amazing recipes from around the world. Join our community of food lovers.'
    }
  ]
})
</script> 
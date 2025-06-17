<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useEventListener, onClickOutside } from '@vueuse/core'
import { useUserStore } from '~/stores/useUserStore'
import { DEFAULT_AVATAR } from '~/constants'
import { User, PlusCircle, Settings, LogOut, BookMarked} from 'lucide-vue-next';
import { useQuery } from '@vue/apollo-composable'
import { GetAllRecipesDocument, type GetAllCategoriesQueryVariables, type GetAllRecipesQuery } from '~/graphql/generated/graphql'



interface Category {
  id: number
  name: string
}

// Navigation items
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Bookmarks', href: '/recipes/bookmarks' },
]

// Footer links
const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Recipes', href: '/recipes' },
  { name: "Bookmarks", href: '/recipes/bookmarks' },
]

//  categories
const categories = ref<Category[]>([
  { id: 1, name: 'Italian' },
  { id: 2, name: 'Asian' },
  { id: 3, name: 'Mexican' },
  { id: 4, name: 'Desserts' },
  { id: 5, name: 'Vegetarian' },
  { id: 6, name: 'Seafood' },
])

// Use Nuxt's color mode composable
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

// User store
const userStore = useUserStore()
const isAuthenticated = computed(() => userStore.isAuthenticated)
const user = computed(() => userStore.user)

// State
const isUserMenuOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref('')


// Methods
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const openSearch = () => {
  isSearchOpen.value = true
}

const variables = computed(() => {
  let where: any = {}
  if (searchQuery.value) {
    where._or = [
      { title: { _ilike: `%${searchQuery.value}%` } },
      { description: { _ilike: `%${searchQuery.value}%` } },
      { recipe_categories: { category: { name: { _ilike: `%${searchQuery.value}%` } } } }
    ]
  }
  return {where}
})

const {result: recipesResult, loading: isSearching, refetch} = useQuery<GetAllRecipesQuery, GetAllCategoriesQueryVariables>(GetAllRecipesDocument, variables)

const recipes = computed(() => {
  if (!recipesResult.value || !recipesResult.value.recipes) {
    return []
  }
  return recipesResult.value.recipes
})


const navigateToRecipe = (recipe: any) => {
  isSearchOpen.value = false
  navigateTo(`/recipes/${recipe.id}`)
}

const searchByCategory = (category: Category) => {
  isSearchOpen.value = false
  navigateTo(`/recipes?category=${category.name}`)
}

const handleLogout = async () => {
  userStore.logout()
  navigateTo('/auth/login')
  isUserMenuOpen.value = false
}

// Close user menu when clicking outside
const menuButtonRef = ref<HTMLElement | null>(null)
onClickOutside(menuButtonRef, () => {
  isUserMenuOpen.value = false
})

// Keyboard shortcuts
useEventListener(document, 'keydown', (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    openSearch()
  }
  if (e.key === 'Escape') {
    isSearchOpen.value = false
  }
})

// Initialize user state from storage
onMounted(() => {
  userStore.initializeFromStorage()
})
</script> 

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation -->
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav class="container flex h-16 items-center">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl">
          <img src="/images/logo.svg" alt="Food Recipe" class="h-8 w-auto" />
          <span class="hidden sm:inline-block">Food Recipe</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6 ml-6">
          <NuxtLink 
            v-for="item in navigation" 
            :key="item.href" 
            :to="item.href"
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <div class="flex items-center ml-auto gap-4">
          <!-- Search -->
          <button 
            class="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            @click="openSearch"
          >
            <Icon name="lucide:search" class="h-4 w-4" />
            <span>Search recipes...</span>
            <kbd class="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
              <span>⌘</span><span>K</span>
            </kbd>
          </button>

          <!-- Theme Toggle -->
          <button 
            class="size-9 flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
            @click="toggleTheme"
          >
            <Icon 
              :name="isDark ? 'lucide:sun' : 'lucide:moon'" 
              class="h-4 w-4"
            />
          </button>

          <!-- Auth Buttons -->
          <template v-if="!isAuthenticated">
            <NuxtLink 
              to="/auth/login"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-4"
            >
              Login
            </NuxtLink>
            <NuxtLink 
              to="/auth/register"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
            >
              Sign up
            </NuxtLink>
          </template>

          <!-- User Menu -->
          <div v-else class="relative">
            <button 
              class="flex items-center gap-2 rounded-full hover:bg-accent hover:text-accent-foreground p-1"
              @click="isUserMenuOpen = !isUserMenuOpen"
            >
              <img 
                :src="user?.avatar || DEFAULT_AVATAR" 
                :alt="user?.username || 'User'"
                class="h-8 w-8 rounded-full object-cover bg-muted p-1"
              />
              <Icon 
                name="lucide:chevron-down" 
                class="h-4 w-4"
              />
            </button>

            <!-- Dropdown Menu -->
            <div 
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-max rounded-md bg-popover text-popover-foreground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="p-2">
                <!-- User Info -->
                <div class="px-2 py-3 border-b">
                  <div class="flex items-center gap-3">
                    <img 
                      :src="user?.avatar || DEFAULT_AVATAR" 
                      :alt="user?.username || 'User'"
                      class="h-10 w-10 rounded-full object-cover bg-muted p-1"
                    />
                    <div>
                      <p class="font-medium">{{ user?.username || 'User' }}</p>
                      <p class="text-sm text-muted-foreground">{{ user?.email }}</p>
                    </div>
                  </div>
                </div>

                <!-- Menu Items -->
                <div class="py-1 mt-1">
                  <NuxtLink 
                    to="/recipes/bookmarks"
                    class="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                  >
                    <BookMarked
                    :size="18"
                    />
                    My Bookmarks
                  </NuxtLink>
                  <NuxtLink 
                    to="/recipes/create"
                    class="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                  >
                    <PlusCircle
                    :size="18"
                    />
                    Create Recipe
                  </NuxtLink>
                  <button 
                    class="flex w-full items-center gap-2 px-2 py-2 text-sm rounded-md text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    @click="handleLogout"
                  >
                    <LogOut
                      :size="18"
                    />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <!-- Mobile Navigation -->
    <div 
      v-show="isMobileMenuOpen"
      class="fixed inset-0 z-50 bg-background md:hidden"
    >
      <div class="container flex h-16 items-center border-b">
        <button 
          class="mr-2"
          @click="isMobileMenuOpen = false"
        >
          <Icon name="lucide:x" class="h-6 w-6" />
        </button>
        <span class="font-bold">Menu</span>
      </div>
      <nav class="container grid gap-y-4 py-4">
        <NuxtLink 
          v-for="item in navigation" 
          :key="item.href" 
          :to="item.href"
          class="text-lg font-medium hover:text-primary"
          @click="isMobileMenuOpen = false"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>
    </div>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t bg-muted/50">
      <div class="container py-12 md:py-16">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-2">
          <!-- About -->
          <div class="col-span-2 md:col-span-1">
            <div class="flex items-center gap-2 font-bold text-xl mb-4">
              <img src="/images/logo.svg" alt="Food Recipe" class="h-8 w-auto" />
              <span>Food Recipe</span>
            </div>
            <p class="text-sm text-muted-foreground mb-4">
              Share and discover amazing recipes from around the world.
            </p>
          </div>

          <!-- Quick Links -->
          <div class="text-right">
            <h3 class="font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li v-for="link in quickLinks" :key="link.href">
                <NuxtLink 
                  :to="link.href"
                  class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

        </div>

        <div class="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {{ new Date().getFullYear() }} Food Recipe. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Search Dialog -->
    <TransitionRoot appear :show="isSearchOpen" as="template">
      <Dialog as="div" class="relative z-50" @close="isSearchOpen = false">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-start justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-lg bg-background p-4 text-left shadow-xl transition-all">
                <div class="relative">
                  <Icon 
                    name="lucide:search" 
                    class="absolute left-3 top-3 h-5 w-5 text-muted-foreground"
                  />
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search recipes..."
                    class="w-full rounded-md border bg-background pl-10 pr-4 py-2 text-sm"
                  />
                </div>

                <div v-if="recipes.length > 0" class="mt-4 max-h-[60vh] overflow-y-auto">
                  <div 
                    v-for="result in recipes.slice(0,5)" 
                    :key="result.id"
                    class="flex items-center gap-4 p-2 hover:bg-accent rounded-md cursor-pointer"
                    @click="navigateToRecipe(result)"
                  >
                    <img 
                      :src="result.featured_image" 
                      :alt="result.title"
                      class="h-12 w-12 rounded-md object-cover"
                    />
                    <div>
                      <h4 class="font-medium">{{ result.title }}</h4>
                      <p class="text-sm text-muted-foreground">{{ result.description }}</p>
                    </div>
                  </div>
                </div>

                <div 
                  v-else-if="searchQuery && !isSearching" 
                  class="mt-4 text-center text-muted-foreground py-8"
                >
                  No recipes found
                </div>

                <div v-if="!searchQuery" class="mt-4">
                  <h3 class="font-medium mb-2">Popular Categories</h3>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="category in categories.slice(0, 6)"
                      :key="category.id"
                      class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      @click="searchByCategory(category)"
                    >
                      {{ category.name }}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>


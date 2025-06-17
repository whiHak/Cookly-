<script setup lang="ts">
import { ref, onMounted, inject, watchEffect } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import type { Recipe } from "~/types/recipe";
import {
  GetUserBookmarksDocument,
  UnbookmarkRecipeDocument,
  type GetUserBookmarksQuery,
  type GetUserBookmarksQueryVariables,
  type UnbookmarkRecipeMutation,
} from "~/graphql/generated/graphql";

interface ToastRef {
  value?: {
    addToast: (
      type: "success" | "error" | "info" | "warning",
      message: string
    ) => void;
  };
}
// Stores
const { mutate: unbookmarkRecipeMutation } =
  useMutation<UnbookmarkRecipeMutation>(UnbookmarkRecipeDocument);

// State
let bookmarks: Recipe[] = [];
const loading = ref(true);
const error = ref<string | null>(null);
const isReady = ref(false);
const toastRef = inject<ToastRef>("toast");

let user: any = null;
if (typeof window !== "undefined") {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    navigateTo("/auth/login");
  }
  if (userStr) {
    user = JSON.parse(userStr);
  }
}

// Only run the query if user and user.id exist
const {
  result: bookmarksResult,
  loading: gqlLoading,
  error: gqlError,
  refetch,
} = useQuery<GetUserBookmarksQuery, GetUserBookmarksQueryVariables>(
  GetUserBookmarksDocument,
  () => (user && user.id ? { user_id: user.id }: {user_id: null}),
  { enabled: !!(user && user.id) }
);

const fetchBookmarks = async () => {
  loading.value = true;
  isReady.value = false;
  try {
    if (!user || !user.id) {
      bookmarks = [];
      error.value = "User not found.";
      return;
    }
    await refetch();
    if (bookmarksResult.value && bookmarksResult.value.recipe_bookmarks) {
      bookmarks = bookmarksResult.value.recipe_bookmarks.map((bm: any) => {
        const recipe = bm.recipe;
        return {
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          difficulty: recipe.difficulty,
          servings: recipe.servings,
          preparation_time: recipe.preparation_time,
          categories:
            recipe.recipe_categories?.map((cat: any) => ({
              id: cat.category?.id,
              category_id: cat.category?.id,
              name: cat.category?.name,
            })) || [],
          user: recipe.user,
          featured_image: recipe.featured_image,
          price: recipe.price,
          steps: recipe.steps || [],
          ingredients: recipe.ingredients || [],
          images: recipe.images || [],
          rating: recipe.rating,
          isLiked: recipe.isLiked,
          isBookmarked: recipe.isBookmarked,
          isPaid: recipe.price > 0,
          isFree: recipe.price === 0,
          notes: recipe.notes,
          tags: recipe.tags,
        } as Recipe;
      });
    } else {
      bookmarks = [];
    }
    error.value = null;
  } catch (err: any) {
    error.value = err?.message || "Failed to fetch bookmarks.";
    bookmarks = [];
  } finally {
    loading.value = false;
    isReady.value = true;
  }
};

onMounted(fetchBookmarks);

// Remove bookmark
const removeBookmark = async (recipe: Recipe) => {
  try {
    await unbookmarkRecipeMutation({
      recipe_id: recipe.id,
      user_id: user?.id,
    });
    await fetchBookmarks();
    toastRef?.value?.addToast("success", "Recipe removed from bookmarks");
  } catch (err) {
    console.error("Error removing bookmark:", err);
    toastRef?.value?.addToast("error", "Failed to remove bookmark");
  }
};

// Page meta
useHead({
  title: "My Bookmarks",
  meta: [
    {
      name: "description",
      content: "View your bookmarked recipes.",
    },
  ],
});
</script>

<template>
  <div v-if="isReady" class="container mx-auto px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold">My Bookmarked Recipes</h1>
      <p class="mt-2 text-muted-foreground">
        Your collection of saved recipes.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">{{ error }}</p>
      <button
        @click="fetchBookmarks"
        class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
      >
        Try Again
      </button>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Recipe Grid -->
      <div class="mx-auto max-w-screen-xl lg:max-w-[1400px]">
        <div
          v-if="bookmarks.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div v-for="recipe in bookmarks" :key="recipe.id">
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
                    <span
                      v-if="recipe.user?.id === user?.id"
                      class="bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md"
                    >
                      Your Recipe
                    </span>
                    <span
                      v-else-if="recipe.isPaid"
                      class="bg-primary text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md"
                    >
                      Paid
                    </span>
                    <span
                      v-else-if="recipe.price > 0"
                      class="bg-primary text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md"
                    >
                      ETB {{ recipe.price }}
                    </span>
                    <span
                      v-else
                      class="bg-gray-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md"
                    >
                      Free
                    </span>
                  </div>
                  <!-- Remove Bookmark Button -->
                  <div class="absolute bottom-4 right-4 z-10">
                    <button
                      @click.stop="removeBookmark(recipe)"
                      class="rounded-full bg-white p-2.5 w-10 h-12 shadow-md hover:bg-gray-100 transition-colors text-blue-500"
                    >
                      <i class="fas fa-bookmark"></i>
                    </button>
                  </div>
                  <!-- Dark Gradient Overlay -->
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  ></div>
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

                <h3
                  class="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1"
                >
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
                    <span class="text-sm">{{ recipe.user?.full_name }}</span>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="mt-12 text-center">
          <Icon
            name="lucide:bookmark"
            class="mx-auto h-12 w-12 text-muted-foreground"
          />
          <h3 class="mt-4 text-lg font-medium">No bookmarked recipes</h3>
          <p class="mt-2 text-sm text-muted-foreground">
            Start bookmarking recipes you like to see them here.
          </p>
          <button
            @click="navigateTo('/recipes')"
            class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Browse Recipes
          </button>
        </div>
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

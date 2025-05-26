<script setup lang="ts">
import { ref, onMounted, computed, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuery, useMutation } from "@vue/apollo-composable";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { DEFAULT_AVATAR } from "~/constants";
import {
  GET_RECIPE_BY_ID,
  COMMENT_ON_RECIPE,
  GET_RECIPE_COMMENTS,
  LIKE_RECIPE,
  UNLIKE_RECIPE,
  BOOKMARK_RECIPE,
  UNBOOKMARK_RECIPE,
  RATE_RECIPE,
} from "~/utils/graphql-operations";

const API_BASE_URL =
  process.env.NUXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface ToastRef {
  value?: {
    addToast: (
      type: "success" | "error" | "info" | "warning",
      message: string
    ) => void;
  };
}

const route = useRoute();
const router = useRouter();
const toastRef = inject<ToastRef>("toast");

let user = null;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user") || "{}");
}

const chapaPublicKey = process.env.NUXT_PUBLIC_CHAPA_PUBLIC_KEY;

const recipeId = computed(() => route.params.slug);

// Recipe Query
const {
  result: recipeResult,
  loading,
  error,
  refetch,
} = useQuery(GET_RECIPE_BY_ID, { id: recipeId });
const recipe = computed(() => recipeResult.value?.recipes_by_pk || null);

// Comments Query
const { result: commentsResult, refetch: refetchComments } = useQuery(
  GET_RECIPE_COMMENTS,
  { recipe_id: recipeId }
);
const comments = computed(() =>
  (commentsResult.value?.recipe_comments || []).map((comment: any) => ({
    user: {
      name:
        comment.user.full_name === user?.fullName
          ? "You"
          : comment.user.full_name,
      avatar: DEFAULT_AVATAR,
    },
    text: comment.content,
    createdAt: new Date(comment.created_at).toLocaleString(),
  }))
);

// Mutations
const { mutate: commentOnRecipe } = useMutation(COMMENT_ON_RECIPE);
const { mutate: likeRecipeMutation } = useMutation(LIKE_RECIPE);
const { mutate: unlikeRecipeMutation } = useMutation(UNLIKE_RECIPE);
const { mutate: bookmarkRecipeMutation } = useMutation(BOOKMARK_RECIPE);
const { mutate: unbookmarkRecipeMutation } = useMutation(UNBOOKMARK_RECIPE);
const { mutate: rateRecipeMutation } = useMutation(RATE_RECIPE);
const { mutate: deleteRecipeMutation } = useMutation(DELETE_RECIPE);

// State
const sharePlatforms = [
  { name: "Facebook", icon: "lucide:facebook" },
  { name: "Twitter", icon: "lucide:twitter" },
  { name: "Pinterest", icon: "lucide:youtube" },
  { name: "WhatsApp", icon: "lucide:tiktok" },
  { name: "Email", icon: "lucide:gmail" },
];

// Rating, Like, and Bookmark State
const userRating = ref(0);
const isLiked = computed(() =>
  recipe.value?.recipe_likes?.some((like: any) => like.user_id === user?.id)
);
const isBookmarked = computed(() =>
  recipe.value?.recipe_bookmarks?.some((bm: any) => bm.user_id === user?.id)
);
const likeCount = computed(
  () => recipe.value?.recipe_likes_aggregate?.aggregate?.count || 0
);
const avgRating = computed(
  () =>
    recipe.value?.recipe_ratings_aggregate?.aggregate?.avg?.rating?.toFixed(
      1
    ) || "0.0"
);
const ratingCount = computed(
  () => recipe.value?.recipe_ratings_aggregate?.aggregate?.count || 0
);

// State for comments
const newComment = ref("");

// State for payment
const isPaid = ref(false);

// State for delete confirmation
const showDeleteConfirm = ref(false);

// Methods
const rateRecipe = async (rating: number) => {
  try {
    if (!user?.id) {
      toastRef?.value?.addToast("info", "Please login to rate recipes");
      return;
    }
    userRating.value = rating;
    await rateRecipeMutation({
      recipe_id: recipeId.value,
      user_id: user.id,
      rating,
    });
    refetch();
  } catch (err) {
    toastRef?.value?.addToast("error", "Failed to rate recipe");
  }
};

const shareRecipe = (platform: { name: string; icon: string }) => {
  console.log(`Sharing recipe on ${platform.name}`);
  // Add logic to share the recipe on the selected platform
};

const toggleLike = async () => {
  try {
    if (!user?.id) {
      toastRef?.value?.addToast("info", "Please login to like recipes");
      return;
    }
    if (isLiked.value) {
      await unlikeRecipeMutation({
        recipe_id: recipeId.value,
        user_id: user?.id,
      });
    } else {
      await likeRecipeMutation({
        recipe_id: recipeId.value,
        user_id: user?.id,
      });
    }
    refetch();
  } catch (err) {
    toastRef?.value?.addToast("error", "Failed to toggle like");
  }
};

const toggleBookmark = async () => {
  try {
    if (!user?.id) {
      toastRef?.value?.addToast("info", "Please login to bookmark recipes");
      return;
    }
    if (isBookmarked.value) {
      await unbookmarkRecipeMutation({
        recipe_id: recipeId.value,
        user_id: user?.id,
      });
    } else {
      await bookmarkRecipeMutation({
        recipe_id: recipeId.value,
        user_id: user?.id,
      });
    }
    refetch();
  } catch (err) {
    toastRef?.value?.addToast("error", "Failed to toggle bookmark");
  }
};

// Method to post a comment
const postComment = async () => {
  if (!newComment.value.trim()) {
    toastRef?.value?.addToast("error", "Comment cannot be empty");
    return;
  }
  try {
    await commentOnRecipe({
      recipe_id: recipeId.value,
      user_id: user?.id,
      content: newComment.value,
    });
    newComment.value = "";
    toastRef?.value?.addToast("success", "Comment posted successfully");
    refetchComments();
  } catch (err) {
    toastRef?.value?.addToast("error", "Failed to post comment");
  }
};

// Fetch comments on component mount
const fetchComments = async () => {
  try {
    refetchComments();
  } catch (err) {
    console.error("Error fetching comments:", err);
  }
};

let tx_ref: string | null = null;
// Fetch Recipe
const fetchRecipe = async () => {
  try {
    loading.value = true;
    refetch();

    // Generate tx_ref with more details
    const userId = user?.id || "guest";
    tx_ref = `TX-${recipe.value.id}-${userId}`.toString();

    // Check payment status
    if (recipe.value.price > 0) {
      await checkPament();
    } else {
      isPaid.value = true;
    }
  } catch (err) {
    console.error("Error fetching recipe:", err);
    // error.value = true;
  } finally {
    loading.value = false;
  }
};

const returnUrl = computed(() => {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${window.location.pathname}`;
});

// Add function to handle purchase click
const handlePurchaseClick = (e: Event) => {
  e.preventDefault();

  if (!user?.id) {
    // Store the current URL to redirect back after login
    localStorage.setItem("redirectAfterLogin", window.location.pathname);

    // Show message
    toastRef?.value?.addToast("info", "Please login to purchase this recipe");

    // Redirect to login
    router.push("/auth/login");
    return;
  }

  // If user is logged in, submit the form
  const form = e.target as HTMLFormElement;
  form.submit();
};

// Update the payment verification
const checkPament = async () => {
  try {
    if (!tx_ref) return;

    const verificationResult = await fetch(
      `${API_BASE_URL}/payments/verify/${tx_ref}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const verification = await verificationResult.json();
    if (verification.status === "success") {
      isPaid.value = true;
      // Save the purchase details
      // api.chapa.savePurchase(recipe.value.id);
    } else {
      isPaid.value = false;
    }
  } catch (error) {
    console.error("Error checking payment:", error);
    isPaid.value = false;
  }
};

// Update the payment overlay to show different message for recipe creator
const showPaymentOverlay = computed(() => {
  if (!recipe.value?.price || recipe.value.price === 0) return false;
  if (isPaid.value) return false;
  if (user?.id && recipe.value.user?.id === user.id) {
    return false;
  }
  return true;
});

// Add a banner to show when user is the creator
const isCreator = computed(() => {
  return user?.id && recipe.value?.user?.id === user.id;
});

// Add function to navigate to edit page
const navigateToEdit = () => {
  router.push(`/recipes/${route.params.slug}/edit`);
};

// Add function to handle delete
const handleDelete = async () => {
  try {
    if (!recipe.value?.id) return;
    await deleteRecipeMutation({ id: recipe.value.id });
    toastRef?.value?.addToast("success", "Recipe deleted successfully");
    router.push("/recipes");
  } catch (err) {
    console.error("Error deleting recipe:", err);
    toastRef?.value?.addToast("error", "Failed to delete recipe");
  } finally {
    showDeleteConfirm.value = false;
  }
};

// Fetch recipe and comments on component mount
onMounted(async () => {
  await fetchRecipe(); // Wait for recipe to load first
  await fetchComments();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center text-red-500">
      <p class="text-lg font-semibold">
        Failed to load recipe. Please try again later.
      </p>
    </div>

    <!-- Recipe Content -->
    <div v-if="!loading && !error" class="relative">
      <!-- Recipe Header -->
      <div class="relative mb-8">
        <div class="aspect-[16/9] overflow-hidden rounded-lg">
          <img
            :src="recipe.featured_image"
            :alt="recipe.title"
            class="h-full w-full object-cover"
          />
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
        >
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
          <div class="mb-8 relative">
            <h2 class="text-2xl font-semibold">Ingredients</h2>
            <div
              class="recipe-content"
              :class="{
                'blur-content': !isPaid && recipe.price > 0 && !isCreator,
              }"
            >
              <ul class="mt-4 space-y-4">
                <li
                  v-for="(ingredient, index) in recipe.recipe_ingredients"
                  :key="index"
                  class="flex items-center gap-4 p-2 rounded-lg bg-gray-50 shadow-sm"
                >
                  <input
                    type="checkbox"
                    class="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <div class="flex flex-row gap-2 items-center">
                    <span class="text-primary-foreground font-medium">
                      {{ ingredient.quantity }} {{ ingredient.unit }}
                    </span>
                    <span class="text-muted-foreground">
                      - {{ ingredient.name }}</span
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Instructions -->
          <div class="mb-8 relative">
            <h2 class="text-2xl font-semibold">Instructions</h2>
            <div
              class="recipe-content"
              :class="{
                'blur-content': !isPaid && recipe.price > 0 && !isCreator,
              }"
            >
              <ol class="mt-4 space-y-6">
                <li
                  v-for="(step, index) in recipe.recipe_steps"
                  :key="index"
                  class="flex gap-4 items-start"
                >
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"
                  >
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

          <!-- Comments Section -->
          <div class="mt-12">
            <h2 class="text-2xl font-semibold mb-4">Comments</h2>
            <!-- Post Comment -->
            <div class="mb-6 flex items-start gap-4">
              <img
                :src="DEFAULT_AVATAR"
                alt="User Avatar"
                class="h-12 w-12 rounded-full object-cover"
              />
              <div class="flex-1">
                <textarea
                  v-model="newComment"
                  placeholder="Write a comment..."
                  class="w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  rows="3"
                ></textarea>
                <button
                  @click="postComment"
                  class="mt-2 rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                >
                  Post Comment
                </button>
              </div>
            </div>

            <!-- Display Comments -->
            <div v-if="comments.length" class="space-y-6">
              <div
                v-for="(comment, index) in comments"
                :key="index"
                class="rounded-lg border p-4 shadow-md"
              >
                <div class="flex items-center gap-4">
                  <img
                    :src="DEFAULT_AVATAR"
                    alt="User Avatar"
                    class="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p class="font-semibold">{{ comment.user.name }}</p>
                    <p class="text-sm text-muted-foreground">
                      {{ comment.createdAt }}
                    </p>
                  </div>
                </div>
                <p class="mt-4 text-muted-foreground">{{ comment.text }}</p>
              </div>
            </div>
            <p v-else class="text-center text-muted-foreground">
              No comments yet. Be the first to comment!
            </p>
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
                  <span class="text-muted-foreground">Difficulty</span>
                  <span class="capitalize">{{ recipe.difficulty }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-muted-foreground">Servings</span>
                  <span>{{ recipe.servings }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-muted-foreground">Price</span>
                  <span>{{
                    recipe.price == 0 ? "Free" : `ETB ` + recipe.price
                  }}</span>
                </div>
              </div>
              <div v-if="showPaymentOverlay" class="mt-4">
                <form
                  method="POST"
                  action="https://api.chapa.co/v1/hosted/pay"
                  @submit="handlePurchaseClick"
                >
                  <input
                    type="hidden"
                    name="public_key"
                    value=""
                  />
                  <input type="hidden" name="tx_ref" :value="tx_ref" />
                  <input type="hidden" name="amount" :value="recipe.price" />
                  <input type="hidden" name="currency" value="ETB" />
                  <input
                    type="hidden"
                    name="email"
                    :value="user?.email || 'customer@example.com'"
                  />
                  <input
                    type="hidden"
                    name="first_name"
                    :value="user?.fullName?.split(' ')[0] || 'Customer'"
                  />
                  <input
                    type="hidden"
                    name="last_name"
                    :value="user?.fullName?.split(' ')[1] || 'Name'"
                  />
                  <input type="hidden" name="title" :value="recipe.title" />
                  <input
                    type="hidden"
                    name="description"
                    :value="`Purchase recipe: ${recipe.title}`"
                  />
                  <input
                    type="hidden"
                    name="logo"
                    value="https://chapa.link/asset/images/chapa_swirl.svg"
                  />
                  <input type="hidden" name="callback_url" :value="returnUrl" />
                  <input type="hidden" name="return_url" :value="returnUrl" />
                  <button
                    class="w-full rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark shadow-lg"
                  >
                    Purchase Recipe
                  </button>
                </form>
              </div>
            </div>

            <!-- Categories -->
            <div
              v-if="recipe.recipe_categories"
              class="rounded-lg border p-4 shadow-md"
            >
              <h3 class="font-semibold">Categories</h3>
              <div class="mt-4 flex flex-wrap gap-2">
                <NuxtLink
                  v-for="category in recipe.recipe_categories"
                  :key="category.id"
                  :to="`/recipes?category=${category.category.name}`"
                  class="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground hover:bg-muted/80"
                >
                  {{ category.category.name }}
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
                    :class="
                      star <= userRating ? 'text-yellow-500' : 'text-gray-300'
                    "
                  >
                    ★
                  </span>
                </div>
                <!-- Like Button -->
                <button
                  @click="toggleLike"
                  class="flex items-center gap-2 rounded-md border px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <i
                    :class="
                      isLiked ? 'fas fa-heart text-red-500' : 'far fa-heart'
                    "
                  ></i>
                  <span>Like</span>
                </button>
                <!-- Bookmark Button -->
                <button
                  @click="toggleBookmark"
                  class="flex items-center gap-2 rounded-md border px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <i
                    :class="
                      isBookmarked
                        ? 'fas fa-bookmark text-blue-500'
                        : 'far fa-bookmark'
                    "
                  ></i>
                  <span>Bookmark</span>
                </button>
              </div>
            </div>

            <!-- Creator Actions -->
            <div v-if="isCreator" class="space-y-4">
              <!-- Creator Banner -->
              <div
                class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
              >
                <p class="font-bold">Creator Access</p>
                <p>
                  You created this recipe. You have full access to all content.
                </p>
              </div>

              <!-- Creator Actions -->
              <div class="flex gap-4">
                <button
                  @click="navigateToEdit"
                  class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  <Icon name="lucide:edit" class="w-4 h-4" />
                  Edit Recipe
                </button>
                <button
                  @click="showDeleteConfirm = true"
                  class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <Icon name="lucide:trash" class="w-4 h-4" />
                  Delete Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Required Overlay -->
      <div v-if="showPaymentOverlay" class="payment-required-overlay">
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-xl font-semibold mb-4">Premium Recipe</h3>
          <p class="mb-4">Purchase this recipe to view the full content</p>
          <p class="text-2xl font-bold mb-4">ETB {{ recipe.price }}</p>
          <form
            method="POST"
            action="https://api.chapa.co/v1/hosted/pay"
            @submit="handlePurchaseClick"
          >
            <input
              type="hidden"
              name="public_key"
              value=""
            />
            <input type="hidden" name="tx_ref" :value="tx_ref" />
            <input type="hidden" name="amount" :value="recipe.price" />
            <input type="hidden" name="currency" value="ETB" />
            <input
              type="hidden"
              name="email"
              :value="user?.email || 'customer@example.com'"
            />
            <input
              type="hidden"
              name="first_name"
              :value="user?.fullName?.split(' ')[0] || 'Customer'"
            />
            <input
              type="hidden"
              name="last_name"
              :value="user?.fullName?.split(' ')[1] || 'Name'"
            />
            <input type="hidden" name="title" :value="recipe.title" />
            <input
              type="hidden"
              name="description"
              :value="`Purchase recipe: ${recipe.title}`"
            />
            <input
              type="hidden"
              name="logo"
              value="https://chapa.link/asset/images/chapa_swirl.svg"
            />
            <input type="hidden" name="callback_url" :value="returnUrl" />
            <input type="hidden" name="return_url" :value="returnUrl" />
            <button
              class="w-full rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark shadow-lg"
            >
              Purchase Recipe
            </button>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Dialog -->
      <div
        v-if="showDeleteConfirm"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
          <h3 class="text-lg font-semibold mb-2">Delete Recipe</h3>
          <p class="text-gray-600 mb-4">
            Are you sure you want to delete this recipe? This action cannot be
            undone.
          </p>
          <div class="flex justify-end gap-4">
            <button
              @click="showDeleteConfirm = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              @click="handleDelete"
              class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipe-content {
  transition: all 0.3s ease;
}

.blur-content {
  filter: blur(8px);
  pointer-events: none;
  user-select: none;
}

.payment-required-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

/* Remove the old overlay styles */
</style>

<script setup lang="ts">
import { ref, onMounted, computed, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuery, useMutation } from "@vue/apollo-composable";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { DEFAULT_AVATAR } from "~/constants";
import { BookmarkRecipeDocument, CommentOnRecipeDocument, DeleteRecipeDocument, GetRecipeByIdDocument, GetRecipeCommentsDocument, LikeRecipeDocument, RateRecipeDocument, UnbookmarkRecipeDocument, UnlikeRecipeDocument, type BookmarkRecipeMutation, type CommentOnRecipeMutation, type DeleteRecipeMutation, type GetRecipeByIdQuery, type GetRecipeByIdQueryVariables, type LikeRecipeMutation, type RateRecipeMutation, type UnbookmarkRecipeMutation, type UnlikeRecipeMutation } from "~/graphql/generated/graphql";

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

let user: any = null;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user") || "{}");
}

const chapaPublicKey = process.env.NUXT_PUBLIC_CHAPA_PUBLIC_KEY;

// Get recipeId from route
const recipeId = route.params.slug;

// Recipe Query
const {
  result: recipeResult,
  loading,
  error,
  refetch,
} = useQuery<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>(GetRecipeByIdDocument, { id: recipeId as string });
let recipe: any = null;

// Comments Query
const { result: commentsResult, refetch: refetchComments } = useQuery(
  GetRecipeCommentsDocument,
  { recipe_id: recipeId as string }
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
const { mutate: commentOnRecipe } = useMutation<CommentOnRecipeMutation>(CommentOnRecipeDocument);
const { mutate: likeRecipeMutation } = useMutation<LikeRecipeMutation>(LikeRecipeDocument);
const { mutate: unlikeRecipeMutation } = useMutation<UnlikeRecipeMutation>(UnlikeRecipeDocument);
const { mutate: bookmarkRecipeMutation } = useMutation<BookmarkRecipeMutation>(BookmarkRecipeDocument);
const { mutate: unbookmarkRecipeMutation } = useMutation<UnbookmarkRecipeMutation>(UnbookmarkRecipeDocument);
const { mutate: rateRecipeMutation } = useMutation<RateRecipeMutation>(RateRecipeDocument);
const { mutate: deleteRecipeMutation } = useMutation<DeleteRecipeMutation>(DeleteRecipeDocument);

// Rating, Like, and Bookmark State
const userRating = ref(0);
const localLiked = ref(false);
const localBookmarked = ref(false);

const isLiked = computed(() => localLiked.value);
const isBookmarked = computed(() => localBookmarked.value);
// State for comments
const newComment = ref("");

// State for payment
const isPaid = ref(false);

// State for delete confirmation
const showDeleteConfirm = ref(false);

// State for readiness
const isReady = ref(false);

// Methods
const rateRecipe = async (rating: number) => {
  try {
    if (!user?.id) {
      toastRef?.value?.addToast("info", "Please login to rate recipes");
      return;
    }
    userRating.value = rating;
    await rateRecipeMutation({
      recipe_id: recipeId,
      rating,
    });
    refetch();
  } catch (err) {
    toastRef?.value?.addToast("error", "Failed to rate recipe");
  }
};

const toggleLike = async () => {
  try {
    if (!user?.id) {
      toastRef?.value?.addToast("info", "Please login to like recipes");
      return;
    }
    localLiked.value = !localLiked.value; // Optimistic update
    if (localLiked.value) {
      await likeRecipeMutation({
        recipe_id: recipeId,
      });
    } else {
      await unlikeRecipeMutation({
        recipe_id: recipeId,
      });
    }
    await fetchRecipe();
    // Sync with backend after fetch
    localLiked.value = recipe?.recipe_likes?.some((like: any) => like.user_id === user?.id) || false;
  } catch (err) {
    toastRef?.value?.addToast("error", "Failed to toggle like");
    // Revert optimistic update on error
    localLiked.value = recipe?.recipe_likes?.some((like: any) => like.user_id === user?.id) || false;
  }
};

const toggleBookmark = async () => {
  try {
    if (!user?.id) {
      toastRef?.value?.addToast("info", "Please login to bookmark recipes");
      return;
    }
    localBookmarked.value = !localBookmarked.value; // Optimistic update
    if (localBookmarked.value) {
      await bookmarkRecipeMutation({
        recipe_id: recipeId,
      });
    } else {
      await unbookmarkRecipeMutation({
        recipe_id: recipeId,
      });
    }
    await fetchRecipe();
    // Sync with backend after fetch
    localBookmarked.value = recipe?.recipe_bookmarks?.some((bm: any) => bm.user_id === user?.id) || false;
  } catch (err) {
    toastRef?.value?.addToast("error", "Failed to toggle bookmark");
    // Revert optimistic update on error
    localBookmarked.value = recipe?.recipe_bookmarks?.some((bm: any) => bm.user_id === user?.id) || false;
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
      recipe_id: recipeId,
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

// tx_ref as a function
function getTxRef() {
  const userId = user?.id || "guest";
  if (!recipe?.id) return null;
  return `tx-${recipe.id}-${userId}`.toString();
}

// returnUrl as a function
function getReturnUrl() {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${window.location.pathname}`;
}

// showPaymentOverlay as a function
function showPaymentOverlay() {
  if (!recipe?.price || recipe.price === 0) return false;
  if (isPaid.value) return false;
  if (user?.id && recipe.user?.id === user.id) {
    return false;
  }
  return true;
}

// isCreator as a function
function isCreator() {
  return user?.id && recipe?.user?.id === user.id;
}

// Fetch Recipe
const fetchRecipe = async () => {
  try {
    loading.value = true;
    await refetch();
    recipe = recipeResult.value?.recipes_by_pk || null;
    // Wait for recipe to be available
    if (recipe && recipe.price > 0) {
      await checkPament();
    } else if (recipe) {
      isPaid.value = true;
    }
  } catch (err) {
    console.error("Error fetching recipe:", err);
    // error.value = true;
  } finally {
    loading.value = false;
    isReady.value = true;
  }
};

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
    const txRef = getTxRef();
    if (!txRef) return;

    // Call backend endpoint instead of Chapa directly
    const verificationResult = await fetch(
      `${API_BASE_URL}/payment/verify?tx_ref=chewatatest-6669`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const verification = await verificationResult.json();
    console.log("Payment verification result (backend):", verification);
    if (verification.status === "success" || verification.success) {
      isPaid.value = true;
      // Save the purchase details if needed
    } else {
      isPaid.value = false;
    }
  } catch (error) {
    console.error("Error checking payment (backend):", error);
    isPaid.value = false;
  }
};

// Add function to navigate to edit page
const navigateToEdit = () => {
  router.push(`/recipes/${route.params.slug}/edit`);
};

// Add function to handle delete
const handleDelete = async () => {
  try {
    if (!recipe?.id) return;
    await deleteRecipeMutation({ id: recipe.id });
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
  // Set initial local states
  localLiked.value = recipe?.recipe_likes?.some((like: any) => like.user_id === user?.id) || false;
  localBookmarked.value = recipe?.recipe_bookmarks?.some((bm: any) => bm.user_id === user?.id) || false;
});
</script>

<template>
  <div v-if="isReady" class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading && !recipe" class="flex justify-center text-center">
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
    <div v-if="recipe && !error" class="relative">
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
                'blur-content': !isPaid && recipe.price > 0 && !isCreator(),
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
                'blur-content': !isPaid && recipe.price > 0 && !isCreator(),
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
              <div v-if="showPaymentOverlay()" class="mt-4">
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
                  <input type="hidden" name="tx_ref" :value="getTxRef()" />
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
                  <input type="hidden" name="callback_url" :value="getReturnUrl()" />
                  <input type="hidden" name="return_url" :value="getReturnUrl()" />
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
            <div v-if="isCreator()" class="space-y-4">
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
      <div v-if="showPaymentOverlay()" class="payment-required-overlay">
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
            <input type="hidden" name="tx_ref" :value="getTxRef()" />
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
            <input type="hidden" name="callback_url" :value="getReturnUrl()" />
            <input type="hidden" name="return_url" :value="getReturnUrl()" />
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

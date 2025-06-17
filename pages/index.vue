<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { GetAllRecipesDocument, type GetAllRecipesQuery, type GetAllRecipesQueryVariables } from "~/graphql/generated/graphql";

const { result: featuredRecipesResult, loading: featuredRecipesLoading, error: featuredRecipesError } = useQuery<GetAllRecipesQuery, GetAllRecipesQueryVariables>(GetAllRecipesDocument, {
  limit: 3,
})
const featuredRecipes = computed(() => {
  if (!featuredRecipesResult.value || !featuredRecipesResult.value.recipes) {
    return []
  }
  return featuredRecipesResult.value.recipes
})


// Page meta
useHead({
  title: "Home",
  meta: [
    {
      name: "description",
      content:
        "Discover and share amazing recipes from around the world. Join our community of food lovers.",
    },
  ],
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative h-[600px] flex items-center justify-center overflow-hidden"
    >
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
          Share your culinary journey with the world. Find inspiration, create,
          and connect with food lovers.
        </p>
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
          class="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <UButton to="/recipes" size="xl" color="white" variant="solid">
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
          <UButton to="/recipes" variant="ghost" color="primary">
            View All
          </UButton>
        </div>

        <div v-if="featuredRecipesLoading"> 
          <UProgress indeterminate />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="recipe in featuredRecipes" :key="recipe.id">
            <UCard
              class="group hover:shadow-lg transition-shadow h-full"
              @click="navigateTo(`/recipes/${recipe.id}`)"
            >
              <template #header>
                <div class="relative aspect-video overflow-hidden rounded-t-lg">
                  <img
                    :src="recipe.featured_image"
                    :alt="recipe.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </template>

              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <UBadge
                    variant="subtle"
                    size="sm"
                  >
                    {{ recipe.recipe_categories[0]?.category?.name }}
                  </UBadge>   
                  <span class="text-sm text-muted-foreground">
                    {{ recipe.preparation_time }} min
                  </span>
                </div>

                <h3
                  class="text-lg font-semibold group-hover:text-primary transition-colors"
                >
                  {{ recipe.title }}
                </h3>

                <p class="text-sm text-muted-foreground line-clamp-2">
                  {{ recipe.description }}
                </p>

                <div class="flex items-center justify-between pt-2">
                  <div class="flex items-center gap-2">
                    <UAvatar
                      :src="recipe?.user?.full_name ?? undefined"
                      :alt="recipe?.user?.username"
                      size="sm"
                    />
                    <span class="text-sm">{{ recipe.user?.full_name }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon name="lucide:star" class="w-4 h-4 text-yellow-400" />
                    <span class="text-sm">{{ recipe.recipe_ratings_aggregate.aggregate?.avg?.rating || 0 }}</span>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <!-- <section class="py-16 bg-muted/50">
      <div class="container">
        <h2 class="text-3xl font-bold mb-8">Browse by Category</h2>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div
            v-for="(category, index) in categories"
            :key="category.id"
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :enter="{
              opacity: 1,
              scale: 1,
              transition: { delay: index * 100 },
            }"
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
                <div
                  class="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"
                />
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
    </section> -->
</div>
</template>

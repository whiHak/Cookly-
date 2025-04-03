<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: '%s - Food Recipe',
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toast ref="toastRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import Toast from '~/components/ui/Toast.vue'
useHead({
  titleTemplate: '%s - Food Recipe',
  htmlAttrs: {
    lang: 'en',
  },
})

const toastRef = ref<InstanceType<typeof Toast> | null>(null)

provide('toast', toastRef)
</script>

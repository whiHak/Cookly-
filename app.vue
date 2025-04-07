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
import { useUserStore } from '~/stores/useUserStore'

const toastRef = ref<InstanceType<typeof Toast> | null>(null)

provide('toast', toastRef)

// Initialize user store
onMounted(() => {
  const userStore = useUserStore()
  userStore.initializeFromStorage()
})

// Page meta
useHead({
  title: 'Food Recipe',
  meta: [
    {
      name: 'description',
      content: 'Discover and share amazing recipes from around the world.'
    }
  ]
})
</script>

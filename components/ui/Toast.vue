<template>
  <TransitionGroup
    tag="div"
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-2 opacity-0"
    class="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="flex w-96 items-center gap-3 rounded-lg p-4 shadow-lg"
      :class="[
        toast.type === 'success' ? 'bg-green-50 text-green-900' : '',
        toast.type === 'error' ? 'bg-red-50 text-red-900' : '',
        toast.type === 'info' ? 'bg-blue-50 text-blue-900' : '',
        toast.type === 'warning' ? 'bg-yellow-50 text-yellow-900' : '',
      ]"
    >
      <div class="flex-shrink-0">
        <Icon
          :name="getIcon(toast.type)"
          class="h-5 w-5"
          :class="[
            toast.type === 'success' ? 'text-green-500' : '',
            toast.type === 'error' ? 'text-red-500' : '',
            toast.type === 'info' ? 'text-blue-500' : '',
            toast.type === 'warning' ? 'text-yellow-500' : '',
          ]"
        />
      </div>
      <div class="flex-1">
        <p class="text-sm font-medium">{{ toast.message }}</p>
      </div>
      <button
        type="button"
        class="flex-shrink-0 rounded-lg p-1.5 hover:bg-black/5"
        @click="removeToast(toast.id)"
      >
        <Icon name="lucide:x" class="h-4 w-4 opacity-60" />
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface Toast {
  id: number
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
}

const toasts = ref<Toast[]>([])
let toastId = 0

const getIcon = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return 'lucide:check-circle'
    case 'error':
      return 'lucide:x-circle'
    case 'info':
      return 'lucide:info'
    case 'warning':
      return 'lucide:alert-triangle'
  }
}

const addToast = (type: Toast['type'], message: string) => {
  const id = toastId++
  toasts.value.push({ id, type, message })
  setTimeout(() => removeToast(id), 5000)
}

const removeToast = (id: number) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index !== -1) {
    toasts.value.splice(index, 1)
  }
}

defineExpose({
  addToast,
})
</script> 
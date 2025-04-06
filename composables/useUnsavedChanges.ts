import { ref, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'

export function useUnsavedChanges(hasChanges: () => boolean) {
  const router = useRouter()
  const showDialog = ref(false)
  const pendingNavigation = ref<string | null>(null)

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (hasChanges()) {
      e.preventDefault()
      e.returnValue = ''
    }
  }

  const handleRouteChange = (to: any, from: any, next: any) => {
    if (hasChanges()) {
      showDialog.value = true
      pendingNavigation.value = to.fullPath
      next(false)
    } else {
      next()
    }
  }

  const confirmNavigation = () => {
    showDialog.value = false
    if (pendingNavigation.value) {
      router.push(pendingNavigation.value)
      pendingNavigation.value = null
    }
  }

  const cancelNavigation = () => {
    showDialog.value = false
    pendingNavigation.value = null
  }

  // Only add browser-specific event listeners if window is defined
  if (typeof window !== 'undefined') {
    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Clean up event listeners
    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    })
  }

  // Router navigation guard works in both SSR and client
  router.beforeEach(handleRouteChange)

  return {
    showDialog,
    confirmNavigation,
    cancelNavigation,
  }
} 
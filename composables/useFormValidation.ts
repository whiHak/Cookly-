import { ref, computed, unref } from 'vue'
import type { Ref } from 'vue'

export interface ValidationRule {
  validate: (value: any) => boolean
  message: string
}

export interface ValidationRules {
  [key: string]: ValidationRule[]
}

export function useFormValidation<T extends Record<string, any>>(form: T | Ref<T>, rules: ValidationRules) {
  const errors = ref<Record<string, string[]>>({})
  const isValid = computed(() => Object.keys(errors.value).length === 0)

  const validateField = (field: keyof T) => {
    const fieldRules = rules[field as string]
    if (!fieldRules) return true

    const formValue = unref(form)
    const fieldErrors: string[] = []
    for (const rule of fieldRules) {
      if (!rule.validate(formValue[field])) {
        fieldErrors.push(rule.message)
      }
    }

    if (fieldErrors.length > 0) {
      errors.value[field as string] = fieldErrors
    } else {
      delete errors.value[field as string]
    }

    return fieldErrors.length === 0
  }

  const validateForm = () => {
    errors.value = {}
    let isValid = true

    for (const field in rules) {
      if (!validateField(field as keyof T)) {
        isValid = false
      }
    }

    return isValid
  }

  const clearErrors = () => {
    errors.value = {}
  }

  return {
    errors,
    isValid,
    validateField,
    validateForm,
    clearErrors,
  }
}

// Common validation rules
export const rules = {
  required: (message = 'This field is required'): ValidationRule => ({
    validate: (value: any) => {
      if (Array.isArray(value)) return value.length > 0
      if (typeof value === 'string') return value.trim().length > 0
      return value !== null && value !== undefined
    },
    message,
  }),

  minLength: (min: number, message = `Must be at least ${min} characters`): ValidationRule => ({
    validate: (value: string) => value.length >= min,
    message,
  }),

  maxLength: (max: number, message = `Must be no more than ${max} characters`): ValidationRule => ({
    validate: (value: string) => value.length <= max,
    message,
  }),

  min: (min: number, message = `Must be at least ${min}`): ValidationRule => ({
    validate: (value: number) => value >= min,
    message,
  }),

  max: (max: number, message = `Must be no more than ${max}`): ValidationRule => ({
    validate: (value: number) => value <= max,
    message,
  }),

  email: (message = 'Must be a valid email address'): ValidationRule => ({
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  url: (message = 'Must be a valid URL'): ValidationRule => ({
    validate: (value: string) => {
      try {
        new URL(value)
        return true
      } catch {
        return false
      }
    },
    message,
  }),
}
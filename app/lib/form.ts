import { computed, readonly, shallowRef } from 'vue'

export type UiFieldErrors = Record<string, readonly string[]>

export interface UiFormError {
  /** Id of the control to focus. Errors without one are listed but not linked. */
  id?: string
  message: string
}

export interface UseFormErrorsOptions {
  /** Control ids for fields whose id differs from the field name. */
  ids?: Record<string, string>
}

function isFieldErrors(value: unknown): value is UiFieldErrors {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  return Object.values(value).every(
    (messages) => Array.isArray(messages) && messages.every((m) => typeof m === 'string'),
  )
}

export function useFormErrors({ ids = {} }: UseFormErrorsOptions = {}) {
  const errors = shallowRef<UiFieldErrors>({})

  function set(next: UiFieldErrors) {
    errors.value = Object.fromEntries(Object.entries(next).filter(([, list]) => list.length))
  }

  /**
   * Reads `errors` from a validation problem response such as ASP.NET Core's ValidationProblem.
   * Returns false when the body has no field errors, so the caller can show a general error.
   */
  function setFromProblem(body: unknown) {
    const value = body && typeof body === 'object' ? (body as { errors?: unknown }).errors : null
    if (!isFieldErrors(value) || !Object.keys(value).length) return false
    set(value)
    return true
  }

  function clear(name?: string) {
    if (name === undefined) {
      errors.value = {}
    } else if (name in errors.value) {
      errors.value = Object.fromEntries(
        Object.entries(errors.value).filter(([key]) => key !== name),
      )
    }
  }

  function get(name: string) {
    return errors.value[name]
  }

  const summary = computed<UiFormError[]>(() =>
    Object.entries(errors.value).flatMap(([name, messages]) =>
      messages.map((message) => ({ id: ids[name] ?? name, message })),
    ),
  )

  return { errors: readonly(errors), set, setFromProblem, clear, get, summary }
}

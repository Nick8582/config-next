import axios from "axios"

export const getContentType = () => ({
  "Content-Type": "application/json",
})

// TODO: проверить в дальнейшем корректность работы
export const errorCatch = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message

    if (message) {
      return Array.isArray(message) ? message[0] : message
    }
  }

  return error instanceof Error ? error.message : "Unknown error"
}

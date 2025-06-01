import { useState } from "react"

import { toast } from "sonner"

/**
 * Хук для работы с буфером обмена (clipboard) с уведомлениями через Sonner
 *
 * @returns {Object} Объект с состоянием и методом для копирования
 * @property {boolean} isCopied - Флаг, указывающий успешность последнего копирования
 * @property {(text: string, options?: ClipboardOptions) => Promise<void>} copy - Функция для копирования текста
 *
 * @example
 * // Базовое использование
 * const { copy } = useClipboard();
 *
 * <button onClick={() => copy('Текст для копирования')}>
 *   Копировать
 * </button>
 *
 * @example
 * // С кастомными сообщениями
 * <button onClick={() => copy('Текст', {
 *   successMessage: 'Успешно скопировано в буфер!',
 *   errorMessage: 'Ошибка копирования',
 *   duration: 3000
 * })}>
 *   Копировать
 * </button>
 */
export const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false)

  interface ClipboardOptions {
    successMessage?: string
    errorMessage?: string
    duration?: number
  }

  const copy = async (text: string, options?: ClipboardOptions) => {
    const {
      successMessage = "Скопировано в буфер обмена",
      errorMessage = "Не удалось скопировать",
      duration = 2000,
    } = options || {}

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      toast.success(successMessage, { duration })
      setTimeout(() => setIsCopied(false), duration)
    } catch (err) {
      console.error("Copy failed:", err)
      toast.error(errorMessage, { duration })
    }
  }

  return { isCopied, copy }
}

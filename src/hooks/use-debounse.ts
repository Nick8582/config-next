import { useEffect, useState } from "react"

/**
 * Хук для отложенного обновления значения
 * @template T
 * @param {T} value Значение для отложенного обновления
 * @param {number} [delay=500] Задержка в миллисекундах
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

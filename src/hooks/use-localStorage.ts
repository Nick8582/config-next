import { useEffect, useState } from "react"

/**
 * Хук для работы с localStorage
 * @template T
 * @param {string} key Ключ в localStorage
 * @param {T} initialValue Начальное значение
 * @returns {[T, (value: T | ((val: T) => T)) => void]}
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

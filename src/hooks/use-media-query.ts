import { useEffect, useState } from "react"

/**
 * Хук для отслеживания медиа-запросов CSS
 * @param {string} query - Медиа-запрос (например, '(max-width: 768px)')
 * @returns {boolean} Соответствует ли текущее окно медиа-запросу
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)

    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}

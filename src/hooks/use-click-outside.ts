import { RefObject, useEffect } from "react"

type ExcludedRefs = Array<RefObject<HTMLElement | null>>

/**
 * Хук для обработки кликов вне элемента
 * @template T - Тип HTML-элемента
 * @param {React.RefObject<T | null>} ref - Референс на отслеживаемый элемент
 * @param {() => void} callback - Функция, вызываемая при клике вне элемента
 * @param {Array<React.RefObject<HTMLElement | null>>} [excludeRefs] - Референсы на элементы, клики по которым игнорируются
 * @example
 * const ref = useRef(null);
 * useClickOutside(ref, () => console.log('Клик снаружи'));
 */

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
  excludeRefs?: ExcludedRefs
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node

      if (
        ref.current &&
        !ref.current.contains(target) &&
        !excludeRefs?.some(r => r.current?.contains(target))
      ) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [ref, callback, excludeRefs])
}

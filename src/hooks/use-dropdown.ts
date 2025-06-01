import { useRef, useState } from "react"

import { useClickOutside } from "./use-click-outside"

/**
 * Хук для управления dropdown-меню
 * @returns {Object} Объект с параметрами dropdown
 * @property {boolean} isOpen - Состояние открытия/закрытия
 * @property {Function} toggle - Функция переключения состояния
 * @property {Function} open - Функция открытия
 * @property {Function} close - Функция закрытия
 * @property {React.RefObject<HTMLDivElement>} dropdownRef - Референс на dropdown-элемент
 * @property {React.RefObject<HTMLButtonElement>} triggerRef - Референс на триггер
 * @property {Object} dropdownProps - Пропы для dropdown-элемента
 * @property {Object} triggerProps - Пропы для триггер-элемента
 * @example
 * const { isOpen, dropdownRef, triggerProps } = useDropdown();
 * return (
 *   <div>
 *     <button {...triggerProps}>Меню</button>
 *     {isOpen && <div ref={dropdownRef}>Контент</div>}
 *   </div>
 * );
 */

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const toggle = () => setIsOpen(prev => !prev)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  useClickOutside<HTMLDivElement>(dropdownRef, close, [triggerRef])

  return {
    isOpen,
    toggle,
    open,
    close,
    dropdownRef,
    triggerRef,
    dropdownProps: {
      ref: dropdownRef,
      "aria-hidden": !isOpen,
      "aria-expanded": isOpen,
    },
    triggerProps: {
      ref: triggerRef,
      onClick: toggle,
      "aria-haspopup": true,
      "aria-expanded": isOpen,
    },
  }
}

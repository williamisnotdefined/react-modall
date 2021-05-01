import { useState, useCallback } from 'react'

const useModal = (initialOpen = false) => {
  const [ isOpen, setIsOpen ] = useState(initialOpen)

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleModal = useCallback(() => {
    setIsOpen(currentState => !currentState)
  }, [])

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  }
}

export default useModal
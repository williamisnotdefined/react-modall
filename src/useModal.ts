import { useState, useCallback } from 'react'

type useModalType = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  toggleModal: () => void
}

const useModal = (initialOpen = false): useModalType => {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleModal = useCallback(() => {
    setIsOpen((currentState) => !currentState)
  }, [])

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  }
}

export default useModal

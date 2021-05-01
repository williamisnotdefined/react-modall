import { useEffect, useState } from 'react'

const Z_INDEX_MODAL = 2000

export const getZIndex = (modalCounter) => (
  Z_INDEX_MODAL + (modalCounter * 3)
)

const useModalInternalState = (isOpenProp) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    zIndex: 0,
    internalModalCounter: null
  })

  useEffect(() => {
    // modal é montada aberta
    if (isOpenProp) {
      const internalModalCounter = useModalInternalState.incrementCounter()

      setModalState({
        isOpen: true,
        zIndex: getZIndex(internalModalCounter),
        internalModalCounter
      })
    }

    return () => {
      // se a modal for desmonstada aberta
      if (isOpenProp) {
        useModalInternalState.decrementCounter()
      }
    }
  }, [])

  useEffect(() => {
    if (isOpenProp) {
      const internalModalCounter = useModalInternalState.incrementCounter()

      setModalState({
        isOpen: true,
        zIndex: getZIndex(internalModalCounter),
        internalModalCounter
      })
    } else {
      setModalState(modalState => ({
        ...modalState,
        isOpen: false,
        internalModalCounter: null
      }))

      useModalInternalState.decrementCounter()
    }
  }, [isOpenProp])

  useEffect(() => {
    if (useModalInternalState.modalCounter === 0) {
      document.body.classList.remove('modal-open')
    } else {
      document.body.classList.add('modal-open')
    }
  }, [modalState.isOpen])

  return {
    isOpen: modalState.isOpen,
    zIndex: modalState.zIndex,
    internalModalCounter: modalState.internalModalCounter
  }
}

useModalInternalState.modalCounter = 0 // z-index controller

useModalInternalState.incrementCounter = () => {
  useModalInternalState.modalCounter = useModalInternalState.modalCounter + 1;
  return useModalInternalState.modalCounter;
}

useModalInternalState.decrementCounter = () => {
  if (useModalInternalState.modalCounter > 0) {
    useModalInternalState.modalCounter = useModalInternalState.modalCounter - 1;
  }

  return useModalInternalState.modalCounter;
}

export default useModalInternalState
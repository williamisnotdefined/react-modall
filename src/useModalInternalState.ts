import { useEffect, useState } from 'react'

const Z_INDEX_MODAL = 2000

export const getZIndex = (modalCounter: number): number => Z_INDEX_MODAL + modalCounter * 3

type ModalInternalStateType = {
  isOpen: boolean
  zIndex: number
  internalModalCounter: number | null
}

const useModalInternalState = (isOpenProp: boolean): ModalInternalStateType => {
  const [modalState, setModalState] = useState<ModalInternalStateType>({
    isOpen: false,
    zIndex: 0,
    internalModalCounter: null,
  })

  useEffect(() => {
    if (isOpenProp) {
      const internalModalCounter = useModalInternalState.incrementCounter()

      setModalState({
        isOpen: true,
        zIndex: getZIndex(internalModalCounter),
        internalModalCounter,
      })
    }

    return () => {
      if (isOpenProp) {
        useModalInternalState.decrementCounter()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // only on component did mount

  useEffect(() => {
    if (isOpenProp) {
      const internalModalCounter = useModalInternalState.incrementCounter()

      setModalState({
        isOpen: true,
        zIndex: getZIndex(internalModalCounter),
        internalModalCounter,
      })
    } else {
      setModalState((currentModalState) => ({
        ...currentModalState,
        isOpen: false,
        internalModalCounter: null,
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
    internalModalCounter: modalState.internalModalCounter,
  }
}

useModalInternalState.modalCounter = 0 // z-index controller

useModalInternalState.incrementCounter = () => {
  useModalInternalState.modalCounter += 1
  return useModalInternalState.modalCounter
}

useModalInternalState.decrementCounter = () => {
  if (useModalInternalState.modalCounter > 0) {
    useModalInternalState.modalCounter -= 1
  }

  return useModalInternalState.modalCounter
}

export default useModalInternalState

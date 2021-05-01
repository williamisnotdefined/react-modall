import { useEffect, useCallback } from 'react'
import useModalInternalState from './useModalInternalState'

const useEscPressed = (isOpenModal, internalModalCounter, closeOnOverlay, onClose) => {

  const onEscPress = useCallback(({ code }) => {
    if (code !== 'Escape' || !closeOnOverlay) {
      return
    }

    const lastModalOpened = internalModalCounter === useModalInternalState.modalCounter

    if (lastModalOpened) {
      onClose()
      document.removeEventListener('keyup', onEscPress)
    }
  }, [ internalModalCounter, closeOnOverlay, onClose ])

  useEffect(() => {
    if (isOpenModal) {
      document.addEventListener('keyup', onEscPress)
    }
  }, [isOpenModal])

}

export default useEscPressed
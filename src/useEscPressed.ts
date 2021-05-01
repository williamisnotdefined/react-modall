import { useEffect, useCallback } from 'react'
import useModalInternalState from './useModalInternalState'

const useEscPressed = (
  isOpenModal: boolean,
  internalModalCounter: number,
  closeOnOverlay: boolean,
  onClose: () => void,
): void => {
  const onEscPress = useCallback(
    ({ code }) => {
      if (code !== 'Escape' || !closeOnOverlay) {
        return
      }

      const lastModalOpened = internalModalCounter === useModalInternalState.modalCounter

      if (lastModalOpened) {
        onClose()
        document.removeEventListener('keyup', onEscPress)
      }
    },
    [internalModalCounter, closeOnOverlay, onClose],
  )

  useEffect(() => {
    if (isOpenModal) {
      document.addEventListener('keyup', onEscPress)
    }
  }, [isOpenModal, onEscPress])
}

export default useEscPressed

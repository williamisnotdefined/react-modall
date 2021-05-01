import { useCallback } from 'react'
// import PropTypes from 'prop-types'

import noOp from './utils/noOp'

import useModalInternalState from './useModalInternalState'
import useEscPressed from './useEscPressed'
import { ModalWrapper, Overlay, ContentWrapper } from './styles'

type ModalProps = {
  isOpen: boolean
  onClose(): void

  closeOnOverlay: boolean

  // children: PropTypes.node
  customAnimation: boolean
  className: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,

  closeOnOverlay,

  children,
  customAnimation,
  className,
}) => {
  const onClickOverlay = useCallback(() => {
    if (closeOnOverlay) {
      onClose()
    }
  }, [closeOnOverlay, onClose])

  const { isOpen: isOpenModal, zIndex, internalModalCounter } = useModalInternalState(isOpen)

  useEscPressed(isOpenModal, internalModalCounter, closeOnOverlay, onClose)

  return (
    <ModalWrapper className={className} isOpen={isOpenModal} zIndex={zIndex} customAnimation={customAnimation}>
      <Overlay onClick={onClickOverlay} />
      <ContentWrapper>{children}</ContentWrapper>
    </ModalWrapper>
  )
}

Modal.defaultProps = {
  isOpen: false,
  onClose: noOp,
  closeOnOverlay: true,
  customAnimation: false,
  className: '',
}

/* Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,

  closeOnOverlay: PropTypes.bool,

  children: PropTypes.node,
  customAnimation: PropTypes.bool,
  className: PropTypes.string,
}; */

export default Modal
export { ModalWrapper, Overlay, ContentWrapper }

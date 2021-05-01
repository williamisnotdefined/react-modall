import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import useModalInternalState from './useModalInternalState'
import useEscPressed from './useEscPressed'
import { ModalWrapper, Overlay, ContentWrapper } from './styles'

const noOp = () => {}

const ModalComponent = ({
  isOpen,
  onClose,

  closeOnOverlay,

  children,
  customAnimation,
  className
}) => {

  const onClickOverlay = useCallback(() => {
    if (closeOnOverlay) {
      onClose()
    }
  }, [closeOnOverlay, onClose])

  const {
    isOpen: isOpenModal,
    zIndex,
    internalModalCounter
  } = useModalInternalState(isOpen)

  useEscPressed(isOpenModal, internalModalCounter, closeOnOverlay, onClose)

  return (
    <ModalWrapper
      className={className}
      isOpen={isOpenModal}
      zIndex={zIndex}
      customAnimation={customAnimation}
    >
      <Overlay onClick={onClickOverlay} />
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </ModalWrapper>
  )
}

ModalComponent.defaultProps = {
  isOpen: false,
  onClose: noOp,
  closeOnOverlay: true,
  customAnimation: false,
  className: ''
}

ModalComponent.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,

  closeOnOverlay: PropTypes.bool,

  children: PropTypes.node,
  customAnimation: PropTypes.bool,
  className: PropTypes.string
}

export default ModalComponent
export {
  ModalWrapper,
  Overlay,
  ContentWrapper
}
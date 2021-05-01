import styled, { css, keyframes } from 'styled-components'

const openAnimation = keyframes`
 0% {
  transform: translateY(20px) scale(0.8);
  overflow: hidden;
 }
 99% {
  transform: translateY(0px) scale(1);
  overflow: hidden;
 }
 100% {
  transform: translateY(0px) scale(1);
 }
`

const closeAnimation = keyframes`
  0% {
    transform: translateY(0px) scale(1);
    overflow: hidden;
  }
  99% {
    transform: translateY(20px) scale(0.8);
    overflow: hidden;
  }
  100% {
    transform: translateY(20px) scale(0.8);
    overflow: hidden;
  }
`

const OpenedModalAttrs = css`
  opacity: 1;
  pointer-events: all;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
`

export const ContentWrapper = styled.div`
  overflow: auto;
  position: relative;
  margin: 0 auto;
  background-color: #fff;
`

type ModalWrapperProps = {
  zIndex: number
  customAnimation: boolean
  isOpen: boolean
}

export const ModalWrapper = styled.div<ModalWrapperProps>`
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease-out;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;

  ${({ zIndex }) => css`
    z-index: ${zIndex};

    ${Overlay} {
      z-index: ${zIndex + 1};
    }

    ${ContentWrapper} {
      z-index: ${zIndex + 2};
    }
  `};

  ${({ isOpen }) => isOpen && OpenedModalAttrs};

  ${({ customAnimation, isOpen }) =>
    !customAnimation &&
    css`
      > ${ContentWrapper} {
        ${isOpen &&
        css`
          animation-name: ${openAnimation};
          animation-duration: 0.4s;
          animation-iteration-count: 1;
        `}

        ${!isOpen &&
        css`
          animation-name: ${closeAnimation};
          animation-duration: 0.4s;
          animation-iteration-count: 1;
        `}
      }
    `}
`

import styled from "styled-components";

export const ModalContainer = styled.div`
  display: ${({ isShow }) => (isShow ? "block" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

export const ModalForm = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: ${({ theme }) => theme.primary};
  overflow: hidden;

  @media (max-width: 800px) {
    flex-direction: column;
  }

  @media (max-width: 512px) {
    /* flex-direction: column; */
    height: 100%;
    width: 100%;
    border-radius: 0;
  }
`;

export const ModalPhotoWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);

  @media (max-width: 800px) {
    width: 100%;
    height: auto;
  }
`;

export const ModalPhoto = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  @media (max-width: 800px) {
    height: 300px;
  }

  @media (max-width: 512px) {
    height: 280px;
  }
`;

export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const ModalContentWrapper = styled.div`
  overflow: hidden;
  overflow-y: auto;

  @media (max-width: 800px) {
    height: calc(80vh - 300px - 60px);
  }

  @media (max-width: 512px) {
    height: calc(100vh - 280px - 60px);
  }
`;

export const ModalCloseWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalCloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 20px;
  background: ${({ theme }) => theme.contrastColor};
  transform: scale(1);
  border-radius: 20px;
  transition: all 0.1s ease;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }
`;

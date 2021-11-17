import styled from "styled-components";
import Loading from "images/Loading.svg";

export const OverLay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: ${({ isShow }) => (isShow ? "1" : "0")};
  visibility: ${({ isShow }) => (isShow ? "visible" : "hidden")};
  transition: all 0.2s ease-in-out;
  z-index: 49;
`;

export const Container = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.primary};
  max-width: 597.5px;
  width: 95%;
  height: auto;
  top: ${({ isShow }) => (isShow ? "50%" : "40%")};
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  box-shadow: var(--box-shadow);
  transition: all 0.1s linear 0.1s;
  overflow: hidden;
`;

export const LoadingSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3) url(${Loading}) no-repeat center center;
`;

export const Top = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.contrastColor};
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.subTextColor};
  text-transform: uppercase;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  right: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 0;
  font-size: 1.2rem;
  background-color: ${({ theme }) => theme.contrastColor};
  color: ${({ theme }) => theme.textColor};
  transition: all 0.1s ease-in-out 0s;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }

  &:active {
    font-size: 1.1rem;
    width: 38px;
    height: 38px;
  }
`;

export const Content = styled.div`
  padding: 14px 14px 0 14px;
  position: relative;
  max-height: 400px;
  overflow: hidden;
  overflow-y: scroll;
`;

export const DescArea = styled.textarea`
  width: 100%;
  height: 115px;
  margin-top: 8px;
  resize: none;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ isSmall }) => (isSmall ? "1.2rem" : "1.6rem")};
  font-weight: 300;
  background-color: transparent;
  transition: all 0.1s ease-in-out 0s;
`;

export const UserWrapper = styled.div`
  display: flex;
`;

export const AvatarWrapper = styled.div`
  display: flex;
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Name = styled.div`
  font-weight: 500;
  margin-left: 8px;
`;

export const LetterCount = styled.div`
  position: absolute;
  top: 170px;
  right: 14px;
  color: ${({ theme }) => theme.subTextColor};
`;

export const PhotoWrapper = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  color: #ccc;
`;

export const Photo = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

export const RemovePhotoButton = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  right: -100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  font-size: 2rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  ${PhotoWrapper}:hover & {
    right: 0;
  }

  & > span {
    font-size: 1.4rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px 10px 14px;
  flex-direction: column;
`;

export const UploadButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  font-size: 1.4rem;
  margin-bottom: 8px;
`;

export const UploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  transition: all 0.15s ease-in-out 0s;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.subTextColor};

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`;

export const PostButtonWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const PostButton = styled.button`
  width: 100%;
  background-color: var(--primary-color);
  border: 0;
  padding: 10px 24px;
  border-radius: 5px;
  text-transform: uppercase;
  color: #fff;
  transition: all 0.15s ease-in-out 0s;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background: ${({ theme }) => theme.contrastColor};
    color: ${({ theme }) => theme.subTextColor};
    cursor: not-allowed;
  }

  &:disabled:hover {
    opacity: 1;
  }
`;

export const PostPayment = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  align-items: flex-end;
`;

export const SwitchWrapper = styled.div`
  display:flex;
  align-items: center;
  font-size:14px;

`
export const InputPrice = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  width:50%;
`;

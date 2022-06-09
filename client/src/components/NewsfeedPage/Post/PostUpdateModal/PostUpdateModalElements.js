import styled from "styled-components";
import Loading from "assets/images/Loading.svg";

export const Container = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.primary};
  max-width: 597.5px;
  width: 100%;
  height: auto;
  top: ${({ isShow }) => (isShow ? "50%" : "40%")};
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  box-shadow: var(--box-shadow);
  transition: all 0.1s linear;
  overflow: hidden;
`;

export const LoadingSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3) url(${Loading}) no-repeat center center;
  background-size: 90px;
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
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
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
  padding: 0 14px 0 14px;
  position: relative;
  max-height: calc(100vh - 200px);
  overflow: hidden;
  overflow-y: auto;
`;

export const DescArea = styled.textarea`
  width: 100%;
  height: 105px;
  margin-top: 8px;
  resize: none;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ isSmall }) => (isSmall ? "16px" : "20px")};
  font-weight: 300;
  background-color: transparent;
  transition: all 0.1s ease-in-out 0s;
`;

export const UserWrapper = styled.div`
  display: flex;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  margin-top: 14px;
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Name = styled.div`
  margin-left: 8px;
  margin-top: 14px;

  & > .fullName {
    font-weight: 500;
  }

  & > .name {
    font-size: 14px;
    color: ${({ theme }) => theme.subTextColor};
  }
`;

export const LetterCount = styled.div`
  position: absolute;
  top: 170px;
  right: 14px;
  color: ${({ theme }) => theme.subTextColor};
`;

export const PhotoWrapper = styled.div`
  position: relative;
  display: flex;
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

export const PostPayment = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  align-items: flex-end;
`;

import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  width: 100%;
  height: auto;
  box-shadow: 0 0 5px 0 rgba(0 0 0 / 10%);
  border-radius: 5px;
  background-color: ${({ theme }) => theme.primary};
`;

export const AvatarLink = styled(Link)`
  position: relative;
  display: flex;
  border-radius: 50%;
  overflow: hidden;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

export const OverLay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.1s ease-in-out 0s;

  ${AvatarLink}:hover > & {
    background-color: #ffffff20;
  }
`;

export const DescSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  margin-left: 8px;
  background-color: ${({ theme }) => theme.contrastColor};
  transition: all 0.1s ease-in-out 0s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }

  & > div {
    flex-grow: 1;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.textColor};
    opacity: 0.4;
    margin-left: 12px;
    user-select: none;
  }
`;

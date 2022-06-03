import styled from "styled-components";

export const ScrollToTopContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: calc(var(--max-width) + ((100vw - var(--max-width)) / 2));
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.contrastColor};
  user-select: none;
  transition: all 0.2s ease;
  z-index: 99;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
    animation: popUp 2s ease-in-out infinite forwards;
  }

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100px;
    top: -10px;
  }

  @keyframes popUp {
    0% {
      bottom: 10px;
    }
    50% {
      bottom: 20px;
    }
    100% {
      bottom: 10px;
    }
  }

  @media (max-width: 1140px) {
    left: unset;
    right: 20px;
  }
`;

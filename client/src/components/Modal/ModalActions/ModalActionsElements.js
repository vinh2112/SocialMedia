import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  padding-left: 10px;
`;

export const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 10px 0;
`;

export const ButtonTooltip = styled.div`
  position: absolute;
  bottom: -30%;
  left: 50%;
  transform: translateX(-50%) scale(0.5);
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.contrastColor};
  opacity: 0;
  visibility: hidden;
  user-select: none;
  pointer-events: none;
  transition: all 0.1s ease;

  ${ButtonWrapper}:hover > & {
    opacity: 0.8;
    visibility: visible;
    transform: translateX(-50%) scale(1);
  }

  &.danger {
    color: var(--danger-color);
  }
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 20px;
  background: ${({ theme }) => theme.contrastColor};
  transform: scale(1);
  transition: all 0.1s ease;
  cursor: pointer;

  &.danger {
    color: var(--danger-color);
  }

  &:active {
    transform: scale(0.95);
  }
`;

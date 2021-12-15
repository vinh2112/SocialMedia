import styled, { css } from "styled-components";

export const ActionContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0 4px;
`;

// Action

const Action = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  margin: 4px 0;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  transition: background 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }

  & > .iconify {
    font-size: 1.4rem;
  }

  & > .iconify + span {
    font-size: 0.8rem;
    margin-left: 8px;
  }
`;

export const LikeAction = styled.div`
  ${Action}
`;

export const CommentAction = styled.div`
  ${Action}
`;

export const MoreAction = styled.div`
  ${Action}
  position: relative;
  z-index: 0;
`;

// ------------

export const ActionMenu = styled.ul`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  bottom: 120%;
  right: 5px;
  min-width: 150px;
  padding: 5px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.primary};
  cursor: default;
`;

export const MenuItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  &.danger {
    color: #ed4956;
  }

  & .iconify {
    font-size: 1.2rem;
    margin-right: 8px;
  }

  & .iconify:last-child {
    position: absolute;
    right: 0px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.contrastColor};
  }
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
`;

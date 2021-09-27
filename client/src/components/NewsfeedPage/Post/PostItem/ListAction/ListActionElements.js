import styled, { css } from "styled-components";

export const ActionContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Action

const Action = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  white-space: nowrap;
  max-width: 30%;
  width: 100%;
  cursor: pointer;
  user-select: none;

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
`;

// ------------

export const ActionMenu = styled.ul`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  bottom: 110%;
  right: 5px;
  min-width: 150px;
  padding: 5px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.primary};
`;

export const MenuItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  transition: all 0.1s ease-in-out;

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

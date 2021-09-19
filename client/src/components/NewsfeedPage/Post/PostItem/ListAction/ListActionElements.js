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
`;

// ------------

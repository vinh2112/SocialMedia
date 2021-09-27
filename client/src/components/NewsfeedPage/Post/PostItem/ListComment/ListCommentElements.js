import styled from "styled-components";

export const Container = styled.div`
  border-top: 1px solid ${({ theme }) => theme.contrastColor};
  padding: 8px 12px;
`;

export const CommentForm = styled.div`
  display: flex;
`;

export const CommentArea = styled.textarea`
  flex: 1;
  height: 50px;
  border: 0;
  outline: 0;
  border-bottom: 2px solid ${({ theme }) => theme.contrastColor};
  background: transparent;
  resize: none;
  margin-right: 8px;
  color: ${({ theme }) => theme.textColor};
  transition: border 0.15s ease-out 0s;

  &:focus,
  &:not(:placeholder-shown) {
    border-bottom: 2px solid ${({ theme }) => theme.subTextColor};
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubmitButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.6rem;
  cursor: pointer;

  &.disable {
    opacity: 0.3;
    cursor: default;
  }
`;

export const TextCount = styled.p`
  color: ${({ theme }) => theme.subTextColor};
  margin: 4px 0 0;
  width: 66px;
  text-align: center;
  font-size: 0.8rem;
  user-select: none;
`;

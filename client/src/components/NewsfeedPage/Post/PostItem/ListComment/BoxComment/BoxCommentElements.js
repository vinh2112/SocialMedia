import styled from "styled-components";

export const CommentForm = styled.form`
  display: flex;
  margin-left: ${({ isReply }) => (isReply ? "8px" : "")};
`;

export const CommentArea = styled.textarea`
  flex: 1;
  width: 100%;
  border: 0;
  outline: 0;
  overflow: hidden;
  min-height: 28px;
  resize: none;
  background: transparent;
  border-bottom: 2px solid ${({ theme }) => theme.contrastColor};
  font-size: 14px;
  height: 32px;
  line-height: 20px;
  padding: 4px 0 8px 0;
  color: ${({ theme }) => theme.textColor};
  transition: border 0.15s ease-out 0s;

  &:focus,
  &:not(:placeholder-shown) {
    border-bottom: 2px solid ${({ theme }) => theme.subTextColor};
  }
  &::placeholder {
    font-style: italic;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
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
  width: 50px;
  text-align: center;
  font-size: 0.8rem;
  user-select: none;
`;

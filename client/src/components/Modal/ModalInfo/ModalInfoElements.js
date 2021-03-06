import styled from "styled-components";

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
  font-size: 14px;
  font-weight: 700;
  color: #999;
`;

export const Likes = styled.div`
  display: inline-block;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const LikeButtonWrapper = styled.div`
  color: ${({ theme }) => theme.textColor};

  & > * {
    flex-shrink: 0;
  }
`;

export const LikeButton = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 30px;
  font-weight: 400;
  cursor: pointer;
  user-select: none;
`;

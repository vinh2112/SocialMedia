import styled from "styled-components";

export const PostTopTitle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;

  & > h3 {
    display: inline-block;
    white-space: nowrap;
    margin-right: 10px;
    font-weight: 400;
    color: ${({ theme }) => theme.subTextColor};
  }

  & > span {
    display: block;
    height: 1.8px;
    width: 100%;
    opacity: 0.3;
    background-color: ${({ theme }) => theme.subTextColor};
    user-select: none;
  }

  @media (max-width: 700px) {
    padding: 0 8px;
    margin-bottom: 8px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc((var(--max-width) * 2 / 3) - 20px);
  padding-right: 20px;

  @media (max-width: 1024px) {
    padding: 0;
    margin: 0 auto;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

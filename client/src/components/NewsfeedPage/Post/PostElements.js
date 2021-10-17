import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${({ direction }) =>
    direction === "left" ? "0 20px 0 0" : "0 0 0 20px"};
  width: calc((var(--max-width) * 1.9 / 3) - 20px);
  z-index: 1;

  @media (max-width: 1024px) {
    padding: 0 20px;
    margin: 0 auto;
  }

  @media (max-width: 500px) {
    width: 100%;
    padding: 0 4px;
  }
`;

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
    opacity: 1;
    background-color: ${({ theme }) => theme.hoverColor};
    user-select: none;
  }

  @media (max-width: 700px) {
    padding: 0 8px;
  }
`;

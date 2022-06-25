import styled from "styled-components";

export const UserSectionContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  & > .user__title {
    font-weight: 500;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.subTextColor};
    margin-bottom: 20px;
  }

  & > .user__body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
`;

export const UserCard = styled.div`
  grid-column: ${({ span }) => (span ? `span ${span}` : "")};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 20px 16px 20px 16px;
  margin: 0 auto;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.primary};
  box-shadow: var(--box-shadow);
`;

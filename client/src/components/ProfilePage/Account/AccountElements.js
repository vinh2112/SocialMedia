import styled from "styled-components";

export const AccountContainer = styled.aside`
  flex-shrink: 0;

  @media (max-width: 1024px) {
    margin-bottom: 20px;
  }
`;

export const AccountWrapper = styled.div`
  position: fixed;
  width: 300px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.primary};

  @media (max-width: 1024px) {
    position: relative;
    display: flex;
    width: 100%;
    border-radius: 0;
    padding: 16px;
  }
`;

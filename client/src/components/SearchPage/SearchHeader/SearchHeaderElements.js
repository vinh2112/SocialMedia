import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 10px 10px;
  background-color: ${({ theme }) => theme.primary};
`;

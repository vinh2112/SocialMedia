import styled from "styled-components";
import Loading from "assets/images/Loading.svg";

export const Container = styled.div`
  border-top: 1px solid ${({ theme }) => theme.contrastColor};
  padding: 8px 12px;
  margin: 0 4px;
`;

export const LoadingSection = styled.div`
  width: 100%;
  height: 80px;
  background: url(${Loading}) no-repeat center center;
  background-size: 60px;
`;

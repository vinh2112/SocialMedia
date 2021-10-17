import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  margin-top: 8px;
  margin-left: 8px;

  &::after {
    content: "";
    position: absolute;
    width: 20px;
    top: 10px;
    bottom: 10px;
    left: 0;
    transform: translate(-25px, -30%);
    border-radius: 0 0 0 5px;
    border-bottom: 2px solid ${({ theme }) => theme.borderColor};
    border-left: 2px solid ${({ theme }) => theme.borderColor};
  }

  &:first-child ~ &:after {
    top: -25px;
    bottom: 0px;
  }
`;

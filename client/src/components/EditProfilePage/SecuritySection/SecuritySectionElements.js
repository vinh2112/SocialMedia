import styled from "styled-components";

export const SecurityContainer = styled.div`
  width: 100%;
  margin: 20px 0;
`;

export const SecurityWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const Item = styled.div`
  display: flex;
  justify-content: center;

  & .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.borderColor};
  }

  & input {
    color: ${({ theme }) => theme.textColor};
  }

  & label {
    color: ${({ theme }) => theme.textColor};
  }
`;

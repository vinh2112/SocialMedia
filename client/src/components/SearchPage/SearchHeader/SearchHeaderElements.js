import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SearchTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: ${({ theme }) => theme.subTextColor};
`;

export const SearchBar = styled.div`
  position: relative;
  width: 100%;
  max-width: 350px;
  background: ${({ theme }) => theme.contrastColor};
  padding: 12px 25px 12px 45px;
  border-radius: 24px;
`;

export const SearchLabel = styled.label`
  position: absolute;
  left: 13px;
  font-size: 20px;
  transition: all 0.2s ease;
`;

export const SearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: 0;
  outline: 0;
  color: ${({ theme }) => theme.textColor};
  font-size: 15px;

  &:focus ~ ${SearchLabel}, &:valid ~ ${SearchLabel} {
    color: var(--primary-color);
  }
`;

export const SearchClose = styled.div`
  position: absolute;
  display: none;
  right: 8px;
  top: 13px;

  ${SearchInput}:valid ~ & {
    display: block;
  }
`;

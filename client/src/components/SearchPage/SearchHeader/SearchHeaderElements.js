import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SearchTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 1px;
  margin-right: 12px;
  color: ${({ theme }) => theme.subTextColor};
`;

export const SearchBar = styled.div`
  position: relative;
  width: 100%;
  max-width: 350px;
  background: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.contrastColor};
  padding: 10px 25px 10px 45px;
  border-radius: 24px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
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
  top: 12px;

  ${SearchInput}:valid ~ & {
    display: flex;
  }
`;

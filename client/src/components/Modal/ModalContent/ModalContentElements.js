import { Button, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  padding: 10px 10px 4px;
`;

export const ContentTop = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const AvatarWrapper = styled.div``;

export const AvatarLink = styled(Link)``;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  object-fit: cover;
`;

export const AuthorWrapper = styled.div`
  margin-left: 10px;
  flex-grow: 1;
  flex-shrink: 0;
  overflow: hidden;
`;

export const AuthorName = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
`;

export const CreatedDate = styled.div`
  color: ${({ theme }) => theme.subTextColor};
  font-size: 14px;
  margin-top: 2px;
`;

export const DescWrapper = styled.div`
  margin: 8px 0 0px;

  & > div > textarea {
    width: 100%;
    resize: none;
    font-size: 0.9rem;
    padding: 0 4px;
    outline: none;
    border: 1px solid ${({ theme }) => theme.contrastColor};
    color: ${({ theme }) => theme.textColor};
    background: none;
    border-radius: 3px;

    &:focus {
      outline: 2px solid ${({ theme }) => theme.contrastColor};
    }
  }
`;

export const Desc = styled.div`
  line-height: 1.4rem;
  font-size: 14px;
`;

export const CustomButton = styled(Button)`
  && {
    height: 30px;
  }
`;

export const CustomInputLabel = styled(InputLabel)`
  && {
    color: ${({ theme }) => theme.textColor};
  }
`;

export const CustomInputAdornment = styled(InputAdornment)`
  && {
    & > p {
      color: ${({ theme }) => theme.textColor};
    }
  }
`;

export const CustomOutlinedInput = styled(OutlinedInput)`
  && {
    color: ${({ theme }) => theme.textColor};

    & > fieldset {
      border-color: ${({ theme }) => theme.contrastColor};
    }
  }
`;

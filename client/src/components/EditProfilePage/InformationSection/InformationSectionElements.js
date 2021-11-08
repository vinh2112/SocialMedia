import styled from "styled-components";

export const InfoContainer = styled.div`
  width: 100%;
  margin: 0 0 20px;
`;

export const InfoWrapper = styled.div`
  width: 80%;
  height: calc(100vh - 40px - 54px);
  margin: 0 auto;
  padding-right: 16px;
  overflow: hidden;
  overflow-y: auto;
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: center;

  & .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.borderColor};
  }

  & input,
  textarea {
    color: ${({ theme }) => theme.textColor};
  }

  & label {
    color: ${({ theme }) => theme.textColor};
  }
`;

export const AvatarWrapper = styled.div`
  margin-top: 20px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.4);
    filter: brightness(0.95);
  }
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

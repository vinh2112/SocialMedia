import styled from "styled-components";

export const OnlineUserContainer = styled.div`
  position: sticky;
  top: 64px;
  margin-top: 16px;

  & > .contact-title {
    margin-left: 6px;
    color: ${({ theme }) => theme.subTextColor};
    font-size: 18px;
  }
`;

export const ListOnlineUser = styled.ul`
  margin-top: 4px;
`;

export const OnlineUserItemContainer = styled.li`
  display: flex;
  align-items: center;
  border-radius: 5px;
  transition: all 0.1s ease;
  padding: 8px 6px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.contrastColor};
  }
`;

export const OUAvatarWrapper = styled.div`
  display: flex;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
`;

export const OUAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: opacity(${({ online }) => (online ? 1 : 0.5)});
`;

export const OUName = styled.div`
  margin-left: 10px;
  font-size: 16px;
  font-weight: 500;
  user-select: none;
  color: ${({ theme }) => theme.textColor};
  filter: opacity(${({ online }) => (online ? 1 : 0.5)});
`;

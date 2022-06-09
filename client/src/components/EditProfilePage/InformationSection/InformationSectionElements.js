import styled from "styled-components";

export const InfoContainer = styled.div`
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
`;

export const InfoWrapper = styled.div`
  width: 100%;
  max-width: 350px;
  height: 100%;
  margin: 0 auto;
  padding: 20px 16px;
`;

export const AvatarWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;

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

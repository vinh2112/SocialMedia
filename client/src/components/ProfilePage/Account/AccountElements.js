import { Card, CardContent, Skeleton } from "@mui/material";
import styled from "styled-components";

export const AccountContainer = styled.aside`
  flex: 1;
  padding-left: 16px;
  width: 100%;

  @media (max-width: 1024px) {
    margin-bottom: 20px;
    padding-left: 0;
    width: 100%;
  }
`;

export const AccountWrapper = styled.div`
  position: sticky;
  top: 56px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  background-color: ${({ theme }) => theme.primary};

  @media (max-width: 1024px) {
    position: relative;
    top: 0;
    display: flex;
    width: 100%;
    border-radius: 0;
    padding: 16px;
  }
`;

export const ProfileLoadingContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 320px;
  padding-left: 16px;

  @media (max-width: 1024px) {
    width: 100%;
    height: 150px;
    margin-bottom: 20px;
    padding-left: 0;
  }
`;

export const CustomCard = styled(Card)`
  && {
    background: ${({ theme }) => theme.primary};

    @media (max-width: 1024px) {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
    }
  }
`;

export const ProfileLoadingWrapper = styled.div`
  width: 100%;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;

export const CustomCardContent = styled(CardContent)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px;

    @media (max-width: 1024px) {
      ${ProfileLoadingWrapper} & {
        align-items: flex-start;
      }
    }
  }
`;

export const CustomSkeleton = styled(Skeleton)`
  && {
    background-color: ${({ theme }) => theme.contrastColor};
  }
`;

import { Card, Skeleton } from "@mui/material";
import styled from "styled-components";

export const SearchListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 512px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CustomCard = styled(Card)`
  && {
    background: ${({ theme }) => theme.primary};
  }
`;

export const CustomSkeleton = styled(Skeleton)`
  && {
    background: ${({ theme }) => theme.contrastColor};
  }
`;

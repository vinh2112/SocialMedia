import { Card, Skeleton } from "@mui/material";
import styled from "styled-components";

export const SearchListContainer = styled.div`
  margin: 10px 0;
`;

export const CustomCard = styled(Card)`
  && {
    background: ${({ theme }) => theme.primary};
    box-shadow: unset;
  }
`;

export const CustomSkeleton = styled(Skeleton)`
  && {
    background: ${({ theme }) => theme.contrastColor};
  }
`;

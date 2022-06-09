import { Card, Skeleton } from "@mui/material";
import styled from "styled-components";

export const SearchListContainer = styled.div`
  margin: 30px 0 20px;
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

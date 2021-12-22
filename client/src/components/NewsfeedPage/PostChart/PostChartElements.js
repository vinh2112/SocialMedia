import { Card, Skeleton } from "@mui/material";
import styled from "styled-components";

export const PostChartContainer = styled.div`
  position: fixed;
  top: 72px;
  left: calc(100vw - ((100vw - var(--max-width) + 48px) / 2));
  transform: translateX(-100%);
  width: 332px;
  background: ${({ theme }) => theme.primary};
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  padding: 12px;

  @media (max-width: 1024px) {
    position: relative;
    order: 1;
    top: 0;
    left: 0;
    margin: 0 auto 20px;
    transform: translateX(0);
    width: 100%;
  }

  @media (max-width: 700px) {
    border-radius: 0;
  }
`;

export const PostTopTitle = styled.div`
  width: 100%;

  & > .title {
    white-space: nowrap;
    margin-right: 12px;
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.subTextColor};
  }

  & > div:last-child {
    width: 30%;
    background-color: ${({ theme }) => theme.contrastColor};
    padding-bottom: 2px;
    margin: 10px 0 12px;
  }

  @media (max-width: 700px) {
    padding: 0 8px;
  }
`;

export const PostChartWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 70px);
  grid-gap: 10px;
  grid-template-areas:
    "h1 h1 h2 h2"
    "h1 h1 h3 h3"
    "h4 h4 h6 h6"
    "h5 h5 h6 h6";

  @media (max-width: 1024px) {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    margin: 0 0 20px;
    box-sizing: content-box;

    & > div {
      flex-shrink: 0;
      width: 140px;
      height: 140px;
    }
  }

  @media (max-width: 700px) {
    margin: 0 -6px 20px;
    padding: 10px;
  }

  @media (min-width: 1025px) {
    & > div:first-child {
      grid-area: h1;
    }

    & > div:nth-child(2) {
      grid-area: h2;
    }

    & > div:nth-child(3) {
      grid-area: h3;
    }

    & > div:nth-child(4) {
      grid-area: h4;
    }

    & > div:nth-child(5) {
      grid-area: h5;
    }

    & > div:last-child {
      grid-area: h6;
    }
  }
`;

export const PostChartItem = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.6);
  }
`;

export const CustomCard = styled(Card)`
  && {
    background-color: ${({ theme }) => theme.primary};
    border-radius: 10px;
  }
`;

export const CustomSkeleton = styled(Skeleton)`
  && {
    background-color: ${({ theme }) => theme.contrastColor};
  }
`;

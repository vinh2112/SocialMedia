import { Card, Skeleton } from "@mui/material";
import styled from "styled-components";

export const PostChartContainer = styled.div`
  position: relative;
  top: 0;
  right: 0;
  width: 100%;
  /* background: ${({ theme }) => theme.primary};
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  padding: 8px 12px 12px; */

  @media (max-width: 1024px) {
    position: relative;
    order: 1;
    top: 0;
    left: 0;
    margin: 0 auto;
    transform: translateX(0);
    padding: 12px;

    width: 100%;
  }

  @media (max-width: 700px) {
    border-radius: 0;
  }
`;

export const PostTopTitle = styled.div`
  width: 100%;
  margin-bottom: 10px;
  margin-left: 12px;
  & > .title {
    white-space: nowrap;
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.subTextColor};
  }

  @media (max-width: 1024px) {
    margin-left: 0;
  }

  /* & > div:last-child {
    width: 40%;
    height: 1.4px;
    background-color: ${({ theme }) => theme.borderColor};
    margin: 5px 0 8px;
  } */
`;

export const PostChartWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 72px);
  grid-gap: 4px;
  /* grid-template-areas:
    "h1 h1 h2 h2"
    "h1 h1 h3 h3"
    "h4 h4 h6 h6"
    "h5 h5 h6 h6"; */

  @media (max-width: 1024px) {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    box-sizing: content-box;

    & > div {
      flex-shrink: 0;
      width: 140px;
      height: 140px;
    }
  }

  @media (max-width: 700px) {
    & > div {
      flex-shrink: 0;
      width: 100px;
      height: 100px;
    }
  }

  @media (min-width: 1025px) {
    & > div:nth-child(2),
    & > div:nth-child(8) {
      grid-column: span 2;
    }

    & > div:nth-child(6n - 5) {
      grid-column: span 2;
      grid-row: span 2;
    }
    /* & > div:first-child {
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
    } */
  }
`;

export const PostChartItem = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: 150%;
  border-radius: 10px;
  transition: box-shadow 0.1s ease, background 0.5s ease;
  cursor: pointer;

  &:hover {
    background-size: 170%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
  }
`;

export const CustomCard = styled(Card)`
  && {
    background-color: ${({ theme }) => theme.primary};
    border-radius: 10px;
    box-shadow: var(--box-shadow);
  }
`;

export const CustomSkeleton = styled(Skeleton)`
  && {
    background-color: ${({ theme }) => theme.contrastColor};
  }
`;

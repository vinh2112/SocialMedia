import { Link } from "react-router-dom";
import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 25px 10px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  @media (max-width: 700px) {
    grid-gap: 10px;
  }
`;

export const DashboardTitle = styled.h3`
  color: ${({ theme }) => theme.subTextColor};
  max-width: 1280px;
  margin: 0 auto 20px;
  font-weight: 500;
  letter-spacing: 1px;
`;

export const DashboardCardContainer = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 350px;
  padding: 24px 0px 24px 20px;
  margin: 0 auto;
  border-radius: var(--border-radius-admin);
  background-color: ${({ theme }) => theme.primary};
  box-shadow: var(--box-shadow);
  text-decoration: none;

  @media (max-width: 700px) {
    padding: 24px 48px 24px 24px;
  }

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    grid-column: span 2;
  }
`;

export const DashboardCardWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DashboardCardBoxed = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  top: 0;
  font-size: 24px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;

  ${DashboardCardContainer}:hover & {
    top: -10px;
  }

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: currentColor;
    opacity: 0.1;
  }
`;

export const DashboardCardContent = styled.div`
  margin-left: 16px;

  & > .card-number {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.textColor};
  }

  & > .card-title {
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.subTextColor};
    letter-spacing: 1px;
    white-space: nowrap;
  }
`;

export const DashboardChartContainer = styled.div`
  grid-column: span 5;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 20px 16px 20px 16px;
  margin: 0 auto;
  border-radius: var(--border-radius-admin);
  background-color: ${({ theme }) => theme.primary};
  box-shadow: var(--box-shadow);
`;

export const DashboardTemp = styled.div`
  grid-column: span 3;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 20px 16px 20px 16px;
  margin: 0 auto;
  border-radius: var(--border-radius-admin);
  background-color: ${({ theme }) => theme.primary};
  box-shadow: var(--box-shadow);
`;

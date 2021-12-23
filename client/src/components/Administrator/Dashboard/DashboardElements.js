import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  padding: 16px;

  @media (max-width: 700px) {
    grid-gap: 10px;
  }
`;

export const DashboardCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 60px 32px 24px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.primary};
  box-shadow: 0 0 6px 0 rgba(0 0 0 / 7%);

  @media (max-width: 700px) {
    padding: 24px 48px 24px 24px;
  }
`;

export const DashboardCardWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DashboardCardBoxed = styled.div`
  width: 50px;
  height: 50px;
  font-size: 30px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  position: relative;

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
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.textColor};
  }

  & > .card-title {
    font-weight: 700;
    color: ${({ theme }) => theme.subTextColor};
    white-space: nowrap;
  }
`;

export const DashboardReport = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px 12px 24px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
  box-shadow: 0 0 6px 0 rgba(0 0 0 / 7%);

  & > .report-title {
    font-weight: 700;
    color: ${({ theme }) => theme.subTextColor};
  }

  & > .report-count {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-weight: 700;
    color: #fefefe;
    background-color: var(--danger-color);
  }
`;

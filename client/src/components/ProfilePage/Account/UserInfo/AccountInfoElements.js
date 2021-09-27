import styled from "styled-components";

export const AvatarWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 16px 0 8px;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.contrastColor};

  @media (max-width: 1024px) {
    top: 0;
    left: 0;
    transform: translate(0);
    margin: 0;
  }
`;

export const Avatar = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
`;

export const EditButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.contrastColor};
  transition: all 0.05s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`;

export const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 16px 16px;

  @media (max-width: 1024px) {
    padding: 0;
    margin-left: 20px;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const AccountName = styled.div`
  font-weight: 400;
  font-size: 1.1rem;
`;

export const Desc = styled.div`
  margin-top: 4px;
  font-style: italic;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.subTextColor};

  @media (max-width: 1024px) {
    text-align: left;
  }
`;

export const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  margin-top: 8px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 1fr);
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;

  ${Details} &:nth-child(3) {
    grid-column: span 3/4;
  }

  @media (max-width: 1024px) {
    align-items: flex-start;
    margin-top: 0;
    ${Details} &:nth-child(3) {
      grid-column: auto;
    }
  }
`;

export const Title = styled.div`
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: 700;
  margin-top: 6px;
  color: ${({ theme }) => theme.subTextColor};

  ${DetailItem}:nth-child(1):hover &,
  ${DetailItem}:nth-child(2):hover & {
    text-decoration: underline;
  }

  ${DetailItem}:nth-child(1) &,
  ${DetailItem}:nth-child(2) & {
    cursor: pointer;
  }
`;

export const Detail = styled.div``;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: span 3/4;

  @media (max-width: 1024px) {
    grid-column: auto;
  }
`;

export const Button = styled.button`
  width: 100%;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  padding: 8px 20px;
  text-transform: uppercase;
  background: var(--primary-color);
  color: #fff;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;

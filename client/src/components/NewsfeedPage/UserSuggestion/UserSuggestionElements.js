import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  position: fixed;
  top: 80px;
  left: calc(100vw - ((100vw - var(--max-width) + 32px) / 2));
  transform: translateX(-100%);
  width: 300px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const Top = styled.div`
  display: flex;
`;

export const Title = styled.div`
  font-weight: 500;
  color: #999;
  flex: 1;
`;

export const SeeAll = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.8rem;
`;

export const SuggestionList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

export const SuggestItem = styled.div`
  display: flex;
  padding: 8px 0;
`;

export const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const SuggestInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Name = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
`;

export const Follow = styled.div`
  margin-top: 2px;
  font-size: 0.75rem;
  color: #999;
`;

export const FollowButton = styled.button`
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--primary-color);
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0;
`;

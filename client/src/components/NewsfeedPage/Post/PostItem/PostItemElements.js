import styled from "styled-components";
import { Link } from "react-router-dom";

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.primary};
  margin-bottom: 20px;
  box-shadow: var(--box-shadow);
  overflow: hidden;

  @media (max-width: 700px) {
    margin-bottom: 8px;
  }
`;

export const PostTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  border-bottom: 0.5px solid ${({ theme }) => theme.contrastColor};
`;

export const PostAuthor = styled.div`
  color: ${({ theme }) => theme.textColor};
  transition: all 0.2s ease-in-out 0s;
  border-bottom: 0.5px solid ${({ theme }) => theme.contrastColor};
`;

export const PostImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 550px;
`;

export const AuthorInfo = styled.div`
  display: flex;
  padding: 10px 16px 0;
`;

export const AvatarLink = styled(Link)`
  display: flex;
  margin-right: 8px;
  text-decoration: none;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const AvatarLetter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  font-weight: 700;
  background-color: var(--primary-color);
`;

export const RightSide = styled.div`
  flex: 1;
`;

export const AuthorName = styled(Link)`
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};

  &:hover {
    text-decoration: underline;
  }
`;

export const PostCreated = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.subTextColor};
`;

export const Description = styled.div`
  color: #fff;
  margin: 8px 0 12px;
  padding: 0 16px;
  font-size: 0.9rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};

  & .post__desc {
    display: block;
    line-height: 1.2rem;
    width: 100%;
    max-height: ${({ isShow }) => (isShow ? "" : "2.4rem")};
    overflow: ${({ isShow }) => (isShow ? "visible" : "hidden")};
  }
`;

export const ToggleButton = styled.div`
  color: #aaa;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 4px 0;
  cursor: pointer;
  user-select: none;
  display: inline-block;

  ${Description} .post__desc:hidden {
    display: none;
  }
`;

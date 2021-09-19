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
  box-shadow: 0 0 5px 0 rgba(0 0 0 / 10%);
  overflow: hidden;

  @media (max-width: 700px) {
    box-shadow: none;
    border-radius: 0;
    margin-bottom: 8px;
  }
`;

export const PostTop = styled.div`
  position: relative;
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
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
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
`;

export const PostCreated = styled.div`
  margin-top: 6px;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.subTextColor};
`;

export const Description = styled.div`
  color: #fff;
  margin: 8px 0 12px;
  padding: 0 16px;
  line-height: 1.3rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  height: ${({ isShow }) => (isShow ? "auto" : "3rem")};

  & .post-desc {
    margin: 0;
    width: ${({ isShow }) => (isShow ? "100%" : "100px")};
    white-space: ${({ isShow }) => (isShow ? "wrap" : "nowrap")};
    overflow: ${({ isShow }) => (isShow ? "visible" : "hidden")};
    text-overflow: ellipsis;
    height: auto;
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
`;

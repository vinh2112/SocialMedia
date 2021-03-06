import styled from "styled-components";
import { Link } from "react-router-dom";

export const PostContainer = styled.div`
  position: relative;
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
`;

export const PostAuthor = styled.div`
  color: ${({ theme }) => theme.textColor};
  transition: all 0.2s ease-in-out 0s;
`;

export const PostImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 550px;
  background-color: rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
`;

export const AuthorInfo = styled.div`
  display: flex;
  padding: 12px 16px 0;
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

export const AuthorNameWrapper = styled.div`
  display: flex;
  gap: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.subTextColor};

  & > a {
    color: inherit;
    text-decoration: none;
  }

  & > a:first-child {
    color: ${({ theme }) => theme.textColor};
  }

  & > a:hover {
    text-decoration: underline;
  }
`;

export const PostCreated = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: ${({ theme }) => theme.subTextColor};
`;

export const Description = styled.div`
  color: #fff;
  margin: 12px 0 8px;
  padding: 0 16px;
  font-size: 0.9rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};

  & .post__desc {
    display: block;
    line-height: 1.2rem;
    width: 100%;
  }

  & > div > textarea {
    width: 100%;
    resize: none;
    font-size: 0.9rem;
    padding: 0 4px;
    outline: none;
    border: 1px solid ${({ theme }) => theme.contrastColor};
    color: ${({ theme }) => theme.textColor};
    background: none;
    border-radius: 3px;

    &:focus {
      outline: 2px solid ${({ theme }) => theme.contrastColor};
    }
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

export const DescriptionWrapper = styled.div`
  display: flex;

  & > pre {
    flex: 1;
    margin-right: 10px;
  }

  & > .post-price {
    color: var(--primary-color);
    font-size: 16px;
    font-weight: 500;
    height: fit-content;
    min-width: 60px;
    text-align: center;
    padding: 8px;
    background-color: ${({ theme }) => theme.primary};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border-radius: 6px;

    @media (max-width: 1024px) {
      font-size: 14px;
      min-width: 60px;
    }
  }
`;

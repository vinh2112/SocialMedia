import { Link } from "react-router-dom";
import styled from "styled-components";

export const PostContainer = styled.div`
  width: 100%;
  max-width: var(--max-width);
  margin: auto;
  padding-top: 72px;
  padding-bottom: 10px;

  & .relative__post-container {
    margin: 0 16px;

    @media (max-width: 700px) {
      margin: 20px 16px 0;
    }

    & .relative__post-container-title {
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.subTextColor};
      font-weight: 500;

      & > span {
        flex: 1;
        margin-left: 10px;
        height: 1px;
        background-color: ${({ theme }) => theme.subTextColor};
        opacity: 0.5;
      }
    }

    & .relative__post-container_post__list {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-row-gap: 30px;
      grid-column-gap: 18px;
      margin-top: 20px;

      @media (max-width: 1050px) {
        grid-template-columns: repeat(4, 1fr);
      }

      @media (max-width: 850px) {
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 10px;
      }

      @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
`;

export const PostWrapper = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 16px 20px;
  gap: 12px;
  
`

export const CategoryItem = styled.div`
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.contrastColor};
  border-radius: 4px;
`

export const RelativePostItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: unset;
  text-decoration: none;

  & .relative__post-item_info {
    width: 100%;
    display: flex;
    margin-top: 4px;
    padding: 8px;
    border-radius: 5px;
    transition: all 0.1s ease;
    color: unset;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.contrastColor};
    }
  }
`;

export const RelativeItemPhoto = styled(Link)`
  flex: 1;
  display: flex;

  & > img {
    width: 100%;
    height: 250px;
    border-radius: 10px 10px 0 0;
    object-fit: cover;
  }
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  width: 100%;

  & .user__info-name {
    font-weight: 500;
    font-size: 16px;
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .user__info-nickName {
    color: ${({ theme }) => theme.subTextColor};
    font-size: 14px;
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

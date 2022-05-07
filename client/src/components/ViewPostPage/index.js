import PostItem from "components/NewsfeedPage/Post/PostItem";
import React, { useEffect, useState } from "react";
import {
  PostContainer,
  PostWrapper,
  RelativePostItemContainer,
  Avatar,
  UserInfo,
  RelativeItemPhoto,
  CategoryItem,
  CategoryWrapper,
} from "./ViewPostElements";
import { useParams } from "react-router-dom";
import * as api from "api";
import { Link } from "react-router-dom";
import DefaultAvatar from "images/DefaultAvatar.png";

export default function ViewPost() {
  const [post, setPost] = useState(null);
  const [relativePosts, setRelativePosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        await api.PostAPI.fetchPost(id).then((res) => setPost(res.data));
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchRelativePosts = async () => {
      if (post) {
        await api.PostAPI.fetchRelativePosts(post._id).then((res) => setRelativePosts(res.data));
      }
    };

    fetchRelativePosts();
  }, [post]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <PostContainer>
      <PostWrapper>{post && <PostItem post={post} />}</PostWrapper>
      <CategoryWrapper>
      {post && post.category.map((cate, index) => <CategoryItem key={index}>#{cate}</CategoryItem>)}
      </CategoryWrapper>
      <div className="relative__post-container">
        <div className="relative__post-container-title">
          Relative posts <span />
        </div>

        <div className="relative__post-container_post__list">
          {relativePosts.map((post) => (
            <RelativePostItem key={post._id} post={post} />
          ))}
        </div>
      </div>
    </PostContainer>
  );
}

const RelativePostItem = ({ post }) => {
  return (
    <RelativePostItemContainer>
      <RelativeItemPhoto to={`/post/${post._id}`} className="relative__post-item_photo">
        <img src={post.image.url} alt="" />
      </RelativeItemPhoto>
      <Link to={`/profile/${post.userId._id}`} className="relative__post-item_info">
        <Avatar src={post.userId.avatar || DefaultAvatar} alt="" />
        <UserInfo>
          <div className="user__info-name">{post.userId.fullName}</div>
          <div className="user__info-nickName">@{post.userId.name}</div>
        </UserInfo>
      </Link>
    </RelativePostItemContainer>
  );
};

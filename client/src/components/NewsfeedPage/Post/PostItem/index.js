import React, { useState } from "react";
import ListAction from "./ListAction";
import ListComment from "./ListComment";
import {
  PostContainer,
  PostTop,
  PostImage,
  PostAuthor,
  AuthorInfo,
  AvatarLink,
  Avatar,
  RightSide,
  AuthorName,
  PostCreated,
  Description,
  ToggleButton,
} from "./PostItemElements";

const PostItem = ({ post }) => {
  const [isShow, setIsShow] = useState(false);
  const [isShowComment, setIsShowComment] = useState(false);

  return (
    <PostContainer>
      <PostTop>
        <PostAuthor>
          <AuthorInfo>
            <AvatarLink to="#">
              <Avatar src={post.download_url} />
            </AvatarLink>
            <RightSide>
              <AuthorName to="#">{post.author}</AuthorName>
              <PostCreated>Vừa mới xong</PostCreated>
            </RightSide>
          </AuthorInfo>
          <Description isShow={isShow}>
            <p className="post-desc">
              Công bố iPad 10.2 inch 2021 Đây là thế hệ iPad Gen 9 hoàn toàn
              mới, kế nhiệm iPad Gen 8 đã ra mắt từ năm ngoái Bộ xử lý A13
              Bionic Camera trước 12MP Ultra Wide, FaceTime với Center Stage
              Camera sau 8MP Màn hình 10.2 inch chuẩn Retina, hỗ trợ TrueTone
              Tương thích phụ kiện Smart Keyboard và Apple Pencil Giá khởi điểm
              từ 329$, tức khoảng 7.4 triệu đồng (tương đương iPad 8 năm ngoái)
            </p>

            {isShow ? (
              <></>
            ) : (
              <ToggleButton onClick={() => setIsShow(!isShow)}>
                Xem thêm
              </ToggleButton>
            )}
          </Description>
        </PostAuthor>
        <PostImage loading="lazy" src={post.download_url} />
      </PostTop>
      <ListAction
        isShowComment={isShowComment}
        setIsShowComment={setIsShowComment}
      />
      {isShowComment && <ListComment />}
    </PostContainer>
  );
};

export default PostItem;

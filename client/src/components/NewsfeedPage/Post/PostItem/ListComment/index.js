import React, { useState } from "react";
import {
  Container,
  CommentForm,
  CommentArea,
  RightSide,
  SubmitButton,
  TextCount,
} from "./ListCommentElements";
import { Icon } from "@iconify/react";
import CommentItem from "./CommentItem";

const ListComment = () => {
  const [value, setValue] = useState("");

  const handleTextarea = (e) => {
    if (e.target.value.length <= 250) {
      setValue(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    console.log("asda");
  };
  return (
    <Container>
      <CommentForm>
        <CommentArea
          placeholder="Nhập bình luận ..."
          onChange={handleTextarea}
          value={value}
        />
        <RightSide>
          <SubmitButton
            className={value.length > 0 ? "" : "disable"}
            disabled={value.length > 0 ? false : true}
            onClick={handleSubmit}
          >
            <Icon icon="fluent:send-16-regular" />
          </SubmitButton>
          <TextCount>{value.length}/250</TextCount>
        </RightSide>
      </CommentForm>

      <CommentItem />
      <CommentItem />
    </Container>
  );
};

export default ListComment;

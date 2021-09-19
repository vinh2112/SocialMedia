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
  const [letter, setLetter] = useState(0);
  const [value, setValue] = useState("");

  const handleTextarea = (e) => {
    if (e.target.value.length <= 250) {
      setLetter(e.target.value.length);
      setValue(e.target.value);
    }
  };

  console.log("comment");

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
            className={letter > 0 ? "" : "disable"}
            disabled={letter > 0 ? false : true}
            onClick={handleSubmit}
          >
            <Icon icon="fluent:send-16-regular" />
          </SubmitButton>
          <TextCount>{letter}/250</TextCount>
        </RightSide>
      </CommentForm>

      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </Container>
  );
};

export default ListComment;

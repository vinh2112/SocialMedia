import React from "react";
import { Button, ButtonTooltip, ButtonWrapper, Container } from "./ModalActionsElements";
import { Icon } from "@iconify/react";
import { saveAs } from "file-saver";
import { authState$ } from "redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { PaymentAPI } from "api";
import { useHistory } from "react-router-dom";
import * as actions from "redux/actions";

export default function ModalActions({ post, handleEdit }) {
  const { currentUser } = useSelector(authState$);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleDownload = async () => {
    // saveAs(post.image.url, post.image.public_id + ".png");
    if (post.isPaymentRequired) {
      if (currentUser) {
        if (post.userId._id === currentUser._id) {
          await saveAs(post.image.url, `${post.image.public_id}.png`);
        } else {
          const isPaid = await PaymentAPI.checkPayment(post._id);

          if (isPaid.data) {
            await saveAs(post.image.url, `${post.image.public_id}.png`);
          } else {
            history.push("/checkout", { post });
          }
        }
      } else {
        dispatch(
          actions.toast.showToast({
            message: "Please Login",
            type: "warning",
          })
        );
      }
    } else {
      await saveAs(post.image.url, `${post.image.public_id}.png`);
    }
  };
  return (
    <Container>
      <ButtonWrapper>
        <Button onClick={handleDownload}>
          <Icon icon="fe:download" />
        </Button>
        <ButtonTooltip>Download</ButtonTooltip>
      </ButtonWrapper>

      <ButtonWrapper onClick={() => handleEdit(true)}>
        <Button className="danger">
          <Icon icon="jam:triangle-danger" />
        </Button>
        <ButtonTooltip className="danger">Report</ButtonTooltip>
      </ButtonWrapper>

      {post.userId._id === currentUser._id && (
        <ButtonWrapper>
          <Button className="danger">
            <Icon icon="feather:delete" />
          </Button>
          <ButtonTooltip className="danger">Delete</ButtonTooltip>
        </ButtonWrapper>
      )}
    </Container>
  );
}

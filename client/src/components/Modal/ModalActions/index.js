import React from "react";
import { Button, ButtonTooltip, ButtonWrapper, Container } from "./ModalActionsElements";
import { Icon } from "@iconify/react";
import { saveAs } from "file-saver";

export default function ModalActions({ post }) {
  const handleDownload = () => {
    saveAs(post.image.url, post.image.public_id + ".png");
  };
  return (
    <Container>
      <ButtonWrapper>
        <Button onClick={handleDownload}>
          <Icon icon="fe:download" />
        </Button>
        <ButtonTooltip>Download</ButtonTooltip>
      </ButtonWrapper>

      <ButtonWrapper>
        <Button className="danger">
          <Icon icon="jam:triangle-danger" />
        </Button>
        <ButtonTooltip className="danger">Report</ButtonTooltip>
      </ButtonWrapper>

      <ButtonWrapper>
        <Button className="danger">
          <Icon icon="feather:delete" />
        </Button>
        <ButtonTooltip className="danger">Delete</ButtonTooltip>
      </ButtonWrapper>
    </Container>
  );
}

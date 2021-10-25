import React from "react";
import {
  ModalCloseButton,
  ModalCloseWrapper,
  ModalContainer,
  ModalContentContainer,
  ModalContentWrapper,
  ModalForm,
  ModalPhoto,
  ModalPhotoWrapper,
} from "./ModalElements";
import { Icon } from "@iconify/react";
import ModalActions from "./ModalActions";
import ModalContent from "./ModalContent";
import ModalInfo from "./ModalInfo";
import { useSelector } from "react-redux";
import { postState$ } from "redux/selectors";

export default function Modal({ index, isShow, closeModal }) {
  const { data } = useSelector(postState$);
  return (
    <ModalContainer isShow={isShow}>
      <ModalForm>
        <ModalPhotoWrapper>
          <ModalPhoto
            style={{
              backgroundImage: `url(${data[index].image.url})`,
            }}
          />
        </ModalPhotoWrapper>

        <ModalContentContainer>
          <ModalActions post={data[index]} />
          <ModalContentWrapper>
            <ModalContent post={data[index]} />
            <ModalInfo post={data[index]} />
          </ModalContentWrapper>
        </ModalContentContainer>

        <ModalCloseWrapper>
          <ModalCloseButton onClick={closeModal}>
            <Icon icon="eva:close-fill" />
          </ModalCloseButton>
        </ModalCloseWrapper>
      </ModalForm>
    </ModalContainer>
  );
}

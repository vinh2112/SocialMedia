import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState$ } from "redux/selectors";
import {
  ButtonCloseModal,
  ButtonCloseModalWrapper,
  ModalContainer,
  ModalTitle,
  ModalTop,
  ReasonAreaWrapper,
  ReportBottom,
  ReportContent,
  ReportOption,
} from "./ModalReportElements";
import * as actions from "redux/actions";
import * as api from "api";
import { LoadingButton } from "@mui/lab";
import { containedButtonStyle, textFieldStyle } from "styles/muiCustom";
import { TextField } from "@mui/material";

const reportOptions = [
  {
    id: "rpt1",
    label: "Bad quality",
    value: "Quality of photo is so bad",
  },
  {
    id: "rpt2",
    label: "Nude photos",
    value: "Nude photos",
  },
  {
    id: "rpt3",
    label: "Violence",
    value: "The image contains violent content",
  },
  {
    id: "rpt4",
    label: "Suicidal/Seft-injury",
    value: "Suicidal/Seft-injury",
  },
];

const initialState = {
  postId: "",
  reason: "",
};

export default function ModalReport({ postId, handleEdit }) {
  const { currentUser } = useSelector(authState$);
  const [isOther, setIsOther] = useState(true);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const areaRef = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setReport({ ...initialState, postId: postId });

    return () => {
      setReport(null);
    };
  }, [postId]);

  const handleOther = (e) => {
    setReport({ ...report, reason: "" });
    if (e.target.checked && e.target.id === "is-other") {
      setIsOther(false);
      setReport({ ...report, reason: areaRef.current.value });
    } else {
      setIsOther(true);
      setReport({ ...report, reason: e.target.value });
    }
  };

  const handleChangeValue = (e) => {
    setReport({ ...report, reason: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Check if user does not log in
    if (!currentUser) {
      dispatch(
        actions.toast.showToast({
          message: "Please Login",
          type: "warning",
        })
      );
      setLoading(false);
      return;
    }
    //Check if reason is empty
    if (!report.reason) {
      dispatch(
        actions.toast.showToast({
          message: "Type your reason",
          type: "warning",
        })
      );
      setLoading(false);
      return;
    }
    try {
      await api.ReportAPI.createNewReport(report)
        .then((res) => {
          dispatch(
            actions.toast.showToast({
              message: res.data.msg,
              type: "success",
            })
          );
          handleEdit(false);
        })
        .catch((err) => {
          dispatch(
            actions.toast.showToast({
              message: err.response.data.msg,
              type: "warning",
            })
          );
        });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <>
      <ModalContainer>
        <ModalTop>
          <ModalTitle>Report</ModalTitle>
          <ButtonCloseModal onClick={() => handleEdit(false)}>
            <ButtonCloseModalWrapper>
              <Icon icon="eva:arrow-back-outline" />
            </ButtonCloseModalWrapper>
          </ButtonCloseModal>
        </ModalTop>
        <ReportContent onChange={handleOther}>
          {reportOptions.map((option) => (
            <ReportOption key={option.id} htmlFor={option.id}>
              <input name="report-option" hidden type="radio" value={option.value} id={option.id} />
              <div className="report__option-radio" />
              <div className="report__option-title">{option.label}</div>
            </ReportOption>
          ))}
          <ReportOption htmlFor="is-other">
            <input name="report-option" hidden type="radio" id="is-other" />
            <div className="report__option-radio" />
            <div className="report__option-title">Others</div>
          </ReportOption>
        </ReportContent>
        <ReasonAreaWrapper>
          <TextField
            ref={areaRef}
            sx={textFieldStyle}
            id="outlined-textarea"
            placeholder="Report here..."
            multiline
            disabled={isOther}
            onChange={handleChangeValue}
            fullWidth
          />
        </ReasonAreaWrapper>
        <ReportBottom>
          <LoadingButton
            sx={containedButtonStyle}
            variant="contained"
            loading={loading}
            onClick={handleSubmit}
            fullWidth
          >
            Submit
          </LoadingButton>
        </ReportBottom>
      </ModalContainer>
    </>
  );
}

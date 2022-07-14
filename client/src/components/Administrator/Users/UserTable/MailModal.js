import React from "react";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { LoadingButton } from "@mui/lab";
import { containedButtonStyle, textButtonStyle, textFieldStyle } from "styles/muiCustom";
import { Icon } from "@iconify/react";
import { AdminAPI } from "api";
import { useDispatch } from "react-redux";
import * as actions from "redux/actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "400px",
  borderRadius: "4px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

const initialData = {
  subject: "",
  content: "",
  emails: "",
};

const MailModal = ({ open, onClose, receivers }) => {
  const [data, setData] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setData({ ...initialData, emails: receivers });
  }, [receivers]);

  const handleChangeContent = (e, editor) => {
    const content = editor.getData();
    setData({ ...data, content });
  };

  const handleChangeSubject = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await AdminAPI.sendMail(data);
      if (res.status === 200) {
        dispatch(
          actions.toast.showToast({
            message: "Send mail successfully",
            type: "success",
          })
        );
        onClose();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography sx={{ mb: 2 }} id="modal-modal-title" variant="h6" component="h2">
          Mail
        </Typography>
        <Stack>
          <Typography sx={{ mb: 0.5 }} variant="subtitle2" component="div">
            Subject
          </Typography>
          <TextField
            name="subject"
            value={data.subject}
            onChange={handleChangeSubject}
            sx={{ ...textFieldStyle, width: "60%" }}
            size="small"
            variant="outlined"
            required
          />
        </Stack>
        <Stack sx={{ mt: 2 }}>
          <Typography sx={{ mb: 0.5 }} variant="subtitle2" component="div">
            Content
          </Typography>
          <CKEditor editor={ClassicEditor} data={data.content} onChange={handleChangeContent} />
        </Stack>
        <Stack sx={{ mt: 2, float: "right", gap: "20px" }} direction="row">
          <Button sx={textButtonStyle} onClick={() => setLoading(!loading)}>
            Cancel
          </Button>

          <LoadingButton
            sx={containedButtonStyle}
            variant="contained"
            startIcon={<Icon icon="ci:mail" />}
            loading={loading}
            onClick={handleSubmit}
          >
            Send mail
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
};

export default MailModal;

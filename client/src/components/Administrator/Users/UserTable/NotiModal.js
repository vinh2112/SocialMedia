import React from "react";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { containedButtonStyle, textFieldStyle } from "styles/muiCustom";
import { LoadingButton } from "@mui/lab";
import * as api from "api";

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

const NotiModal = ({ open, onClose, receivers }) => {
  const [noti, setNoti] = React.useState({
    content: "",
    type: "admin-inform",
  });

  const handleChangeValue = (e) => {
    const { value } = e.target;
    setNoti({ ...noti, content: value });
  };

  const handleSubmit = async () => {
    await api.NotificationAPI.createNotification({ ...noti, receivers }).then((res) => console.log(res));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Noti to users
        </Typography>
        <TextField
          sx={{ ...textFieldStyle, mt: 2 }}
          placeholder="Type here..."
          size="small"
          value={noti.content}
          onChange={handleChangeValue}
          multiline
          minRows={3}
          fullWidth
        />
        <LoadingButton onClick={handleSubmit} sx={{ ...containedButtonStyle, mt: 2 }} variant="contained" fullWidth>
          Send
        </LoadingButton>
      </Box>
    </Modal>
  );
};

export default NotiModal;

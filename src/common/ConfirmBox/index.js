import {
  Button,
  Box,
  Modal,
  Fade,
  Backdrop,
  Grid,
  Container,
  Typography,
} from "@mui/material";
import useTranslation from "../../resources/index";
import CloseIcon from "@mui/icons-material/Close";
import "./confirmationModel.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "#F4F3F3",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ConfirmBox({
  openConfirmBox,
  handleCloseConfirmBox,
  message,
  handleSubmit,
}) {
  const translation = useTranslation();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openConfirmBox}
      onClose={handleCloseConfirmBox}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      hideBackdrop={false}
    >
      <Fade in={openConfirmBox}>
        <Box className="ConfirmationModelContainer">
          <Container className="confirm-modelinner" sx={{ ...style }}>
            <Grid item className="closeBtnWrap">
              <CloseIcon
                onClick={handleCloseConfirmBox}
                color="gray"
                className="close_icon"
              />
            </Grid>
            <Grid item xs={12} align="center">
              {" "}
              <Typography gutterBottom variant="h2" align="left">
                {message}{" "}
              </Typography>{" "}
            </Grid>
            <Grid item xs={12} align="center" className="confirm-btn-wrap">
              <Button
                color="primary"
                variant="outlined"
                onClick={handleSubmit}
                className="companyFormButton"
                size="large"
              >
                {translation.OK}
              </Button>{" "}
              <Button
                color="error"
                variant="outlined"
                className="companyFormButton"
                onClick={handleCloseConfirmBox}
                size="large"
              >
                {translation.CANCEL}
              </Button>
            </Grid>
          </Container>
        </Box>
      </Fade>
    </Modal>
  );
}

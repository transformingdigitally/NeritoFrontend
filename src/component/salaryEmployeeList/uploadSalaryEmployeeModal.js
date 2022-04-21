import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import useTranslation from "../../resources/index";
import UploadCsvReader from "./csvUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import {
  Modal,
  Fade,
  Backdrop,
  Grid,
  Box,
  Container,
  Typography,
  Link,
  Button,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "64%",
  bgcolor: "#F4F3F3",
  boxShadow: 24,
  pt: 2,
  px: 2,
  pb: 3,
};

// Will open the Upload CSV modal onClick of button which is placed on Side Bar.
const UploadSalaryEmployeeModal = ({ open, handleClose }) => {
  const translation = useTranslation();
  const downloadFile = async () => {
    await fetch(
      "https://uzs0qm0012.execute-api.us-west-1.amazonaws.com/dev/s3?key=payroll-nerito-us-west-1/csv-format/payroll-csv-format.csv",
      {
        method: "GET",
      },
    )
      .then((response) => {
        response.blob().then((blob) => {
          var csvData = new Blob([blob], { type: "text/csv;charset=utf-8;" });
          var csvURL = null;
          if (navigator.msSaveBlob) {
            csvURL = navigator.msSaveBlob(csvData, "spei_template.csv");
          } else {
            csvURL = window.URL.createObjectURL(csvData);
          }

          var tempLink = document.createElement("a");
          tempLink.href = csvURL;
          tempLink.setAttribute("download", "spei_template.csv");
          tempLink.click();
        });
      })
      .catch((error) => {});
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      hideBackdrop={false}
    >
      <Fade in={open}>
        <Box className="complistModelContainer">
          <Container className="cl-modelinner" sx={{ ...style }}>
            <Grid item className="closeBtnWrap">
              <Link onClick={handleClose}>
                <CloseIcon color="gray" className="close_icon" />
              </Link>
            </Grid>
            <Typography gutterBottom variant="h2" align="center">
              {translation.INSTRUCTION_LOADING_DATA_ACCOUNT_USER}
            </Typography>
            <Grid className="uploadDataModelContent" container spacing={2}>
              <Grid item xs={6}>
                <Box className="upload-inst-list">
                  <Box className="upload-inst-title">
                    {translation.YOU_CAN_ATTACH_A_CSV_FILE_YOUR_COMPUTER}
                  </Box>
                  <Box
                    className="listrow"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    <div className="steps-txt" style={{ width: "20%" }}>
                      {translation.STEP01}
                    </div>
                    <div
                      className="desc-txt"
                      style={{
                        width: "80%",
                      }}
                    >
                      {
                        translation.DOWNLOAD_THE_FORM_AND_FILL_IT_IN_WITH_YOUR_COMPANY_DATA
                      }
                    </div>
                  </Box>
                  <Box
                    className="listrow"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    <div className="steps-txt" style={{ width: "20%" }}>
                      {translation.STEP02}
                    </div>
                    <div
                      className="desc-txt"
                      style={{
                        width: "80%",
                      }}
                    >
                      {
                        translation.PRESS_THE_BROWSE_BUTTON_TO_IMPORT_THE_FILE_FROM_YOUR_COMPUTER
                      }
                    </div>
                  </Box>
                  <Box
                    className="listrow"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    <div className="steps-txt" style={{ width: "20%" }}>
                      {translation.STEP03}
                    </div>
                    <div
                      className="desc-txt"
                      style={{
                        width: "80%",
                      }}
                    >
                      {translation.CHANGE_THE_NAME_IF_YOU_WANT}
                    </div>
                  </Box>
                  <Box
                    className="listrow"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    <div className="steps-txt" style={{ width: "20%" }}>
                      {translation.STEP04}
                    </div>
                    <div
                      className="desc-txt"
                      style={{
                        width: "80%",
                      }}
                    >
                      {translation.PRESS_ATTACH_FILE_TO_CONTINUE}
                    </div>
                  </Box>
                  <Box
                    className="download-sample-wrapper"
                    style={{ textAlign: "center" }}
                  >
                    <Button
                      color="secondary"
                      borderColor="primary.main"
                      border="2px"
                      sx={{ borderRadius: 2 }}
                      variant="contained"
                      className="download-template-btn"
                      size="large"
                      onClick={downloadFile}
                    >
                      <CloudDownloadIcon />
                      &nbsp; {translation.DOWNLOAD_FORMAT}
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid className="upload-container-outer" item xs={6}>
                <div className="archivo-lbl">Sube tu archivo</div>
                <UploadCsvReader handleClose={handleClose} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UploadSalaryEmployeeModal;

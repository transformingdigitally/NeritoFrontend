import React from "react";
import "../../assets/scss/global-inner-layout.scss";
import { Grid, Typography } from "@mui/material";
import useTranslation from "../../resources/index";
import CustomLogo from "../../assets/images/nerito-payroll-logo.svg";
import { useSelector } from "react-redux";
import ROLES from "../../config/roles";

export default function EmployeeLogo(props) {
  const translation = useTranslation();
  const logo = useSelector((state) => state.employee.config?.Logo);
  const orgName = useSelector((state) => state.employee.orgName);

  return (
    <>
      <Grid
        container
        item
        xs={12}
        sx={{ width: "100%" }}
        className="page-title-wrap"
      >
        <Grid item xs={8} className="companylist-title-wrap" align="left">
          {localStorage.getItem("userRole") === ROLES.PAYROLL_USER && (
            <Typography variant="h4" className="companylist-title">
              {translation.MANAGMENT_ACCOUNT_OPEARATION}
            </Typography>
          )}
          {localStorage.getItem("userRole") === ROLES.ACCOUNT_USER && (
            <Typography variant="h4" className="companylist-title">
              {translation.MANAGMENT_PAYROLL_OPEARATION}
            </Typography>
          )}
        </Grid>
        <Grid item align="right" xs={4} className="payroll-logo">
          <div className="brandLogo">
            <img
              className="logoContainer"
              src={
                logo
                  ? "https://payroll-nerito-storage-us-west-1.s3.us-west-1.amazonaws.com/logo/" +
                    encodeURIComponent(logo)
                  : CustomLogo
              }
              alt="Nerito Logo"
            />
            <div className="orgi">{orgName}</div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

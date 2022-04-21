import React from "react";
import GridView from "../../common/GridView";
import "../../assets/scss/global-inner-layout.scss";
import { Grid, Box } from "@mui/material";
import { useEffect } from "react";
import { useHistory } from "react-router";
import EmployeeLogo from "../../common/employeeLogo";

function ErrorList({ csvList, columns }) {
  const history = useHistory();

  useEffect(() => {
    if (csvList.length === 0) {
      history.push("/app");
    }
  }, [csvList, history]);

  return (
    <>
      <EmployeeLogo />
      <Box className="payroll-tbl-wrap">
        <div className="payroll-tbl-inner">
          <Grid
            container
            className="table-wrapper-outer employee-tbl-outer test"
          >
            <GridView className="" columns={columns} data={csvList} />
          </Grid>
        </div>
      </Box>
    </>
  );
}

export default ErrorList;

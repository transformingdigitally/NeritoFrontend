import React, { useEffect, memo } from "react";
import { useHistory } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import MiniDrawer from "../common/SideBar";
import roles from "../config/roles";

function TopNav(props) {
  const history = useHistory();
  const apiErrorMessage = useSelector((state) => state.login.errorMessage);
  const isLogout = useSelector((state) => state.login.isUserLogin);
  const empLoader = useSelector((state) => state.employee.loader);
  const adminLoader = useSelector(state => state.company.loader)
  useEffect(() => {
    if (!isLogout) {
      history.push("/");
    }
  }, [isLogout, history]);
  
  return (
    <LoadingOverlay active={(localStorage.getItem("userRole") === roles.SUPER_ADMIN) ? adminLoader : empLoader}
      spinner
      text='Loading....'
      style={{ zIndex: '99999' }}
    >
      <div className="nav-outer">
        <div className="nav-inner">
          {apiErrorMessage && (
            <Typography color="error" align="left">
              {apiErrorMessage}
            </Typography>
          )}
          <MiniDrawer>
            {props.children}
          </MiniDrawer>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default memo(TopNav);
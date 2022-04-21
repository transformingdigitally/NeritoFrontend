import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Drawer as MuiDrawer,
  Stack,
  Avatar,
  List,
  Tooltip,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ExpandComponent from "./ExpandComponent";
import HomeIcon from "../../assets/images/home.svg";
import LogoutIcon from "../../assets/images/logout.svg";
import EmployeeList from "../../assets/images/employee-list.svg";
import PaymentIcon from "../../assets/images/payment.svg";
import ErrorIcon from "../../assets/images/collection.svg";
import UploadDocument from "../../assets/images/upload_document.svg";
import NotificationIcon from "../../assets/images/notification.svg";
import { logoutRequest } from "../../actions";
import useTranslation from "../../resources/index";
import ROLES from "../../config/roles";
import UploadEmployeeModal from "../../component/employeeList/uploadEmployeeModal";
import UploadSalaryEmployeeModal from "../../component/salaryEmployeeList/uploadSalaryEmployeeModal";
import "./index.css";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  background: theme.palette.primary.main,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.primary.main,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
  backgroundColor: theme.palette.primary.main,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer(props) {
  const [open, setOpen] = React.useState(false);
  const freezeDone = useSelector((state) => state.employee.freezeDone);
  const freezeDoneSalary = useSelector(
    (state) => state.salaryEmployee.freezeDoneSalary,
  );
  const history = useHistory();
  const orgName = useSelector((state) => state.employee.orgName);
  const dispatch = useDispatch();
  const translation = useTranslation();
  const [openUploadEmployeeForm, setOpenUploadEmployeeForm] =
    React.useState(false);
  const [openUploadSalaryEmployeeForm, setOpenUploadSalaryEmployeeForm] =
    React.useState(false);

  const openUploadEmployeeListModal = () => {
    setOpenUploadEmployeeForm((val) => !val);
  };

  const String = orgName;
  const upperformat = String.match(/\b(\w)/g);

  const openUploadSalaryEmployeeListModal = () => {
    setOpenUploadSalaryEmployeeForm((valsal) => !valsal);
  };

  const handleLogout = async () => {
    dispatch(logoutRequest());
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className="sidepanel-wrap" sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" className="side-drawer" open={open}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className="sidepanel-open-btn"
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <ExpandComponent isExpand />
          </IconButton>
          <DrawerHeader>
            <IconButton
              className="sidepanel-close-btn"
              onClick={handleDrawerClose}
            >
              <ExpandComponent isExpand={false} />
            </IconButton>
          </DrawerHeader>
          <Divider className="divider-sidebar" />
          <List className="sbmenulist">
            {localStorage.getItem("userRole") === ROLES.SUPER_ADMIN && (
              <>
                <ListItem className="sbmenu-item" button key={"Home"}>
                  <ListItemIcon>
                    <Tooltip title={translation.HOME}>
                      <img
                        className="imageContainer"
                        src={HomeIcon}
                        alt="Home"
                      />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary={translation.HOME} />
                </ListItem>
              </>
            )}
            {localStorage.getItem("userRole") === ROLES.PAYROLL_USER && (
              <>
                <ListItem
                  className="sbmenu-item"
                  button
                  key={translation.EMPLOYEE_LIST}
                  onClick={() => history.push("/app")}
                >
                  <ListItemIcon>
                    <Tooltip title={translation.EMPLOYEE_LIST}>
                      <img
                        className="imageContainer"
                        src={EmployeeList}
                        alt={translation.EMPLOYEE_LIST}
                      />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary={translation.EMPLOYEE_LIST} />
                </ListItem>
                {!freezeDone && (
                  <ListItem
                    className="sbmenu-item"
                    button
                    key={translation.UPLOAD_EMPLOYEE_DETAILS}
                    onClick={openUploadEmployeeListModal}
                  >
                    <ListItemIcon>
                      <Tooltip title={translation.UPLOAD_EMPLOYEE_DETAILS}>
                        <img
                          className="imageContainer"
                          src={UploadDocument}
                          alt={translation.UPLOAD_EMPLOYEE_DETAILS}
                        />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary={translation.UPLOAD_EMPLOYEE_DETAILS}
                    />
                  </ListItem>
                )}
              </>
            )}

            {localStorage.getItem("userRole") === ROLES.ACCOUNT_USER && (
              <>
                <ListItem
                  className="sbmenu-item"
                  button
                  key={translation.SALARY_EMPLOYEE_LIST}
                  onClick={() => history.push("/app")}
                >
                  <ListItemIcon>
                    <Tooltip title={translation.SALARY_EMPLOYEE_LIST}>
                      <img
                        className="imageContainer"
                        src={EmployeeList}
                        alt={translation.SALARY_EMPLOYEE_LIST}
                      />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary={translation.SALARY_EMPLOYEE_LIST} />
                </ListItem>
                {!freezeDoneSalary && (
                  <ListItem
                    className="sbmenu-item"
                    button
                    key={translation.UPLOAD_SALARY_EMPLOYEE_DETAILS}
                    onClick={openUploadSalaryEmployeeListModal}
                  >
                    <ListItemIcon>
                      <Tooltip
                        title={translation.UPLOAD_SALARY_EMPLOYEE_DETAILS}
                      >
                        <img
                          className="imageContainer"
                          src={UploadDocument}
                          alt={translation.UPLOAD_SALARY_EMPLOYEE_DETAILS}
                        />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary={translation.UPLOAD_SALARY_EMPLOYEE_DETAILS}
                    />
                  </ListItem>
                )}
              </>
            )}

            {localStorage.getItem("userRole") === ROLES.PAYROLL_USER && (
              <ListItem
                className="sbmenu-item"
                button
                key={translation.SUCCESS_BTN}
                onClick={() => history.push("/app/emp-operation")}
              >
                <ListItemIcon>
                  <Tooltip title={translation.SUCCESS_BTN}>
                    <img
                      className="imageContainer"
                      src={PaymentIcon}
                      alt={translation.SUCCESS_BTN}
                    />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={translation.SUCCESS_BTN} />
              </ListItem>
            )}

            {localStorage.getItem("userRole") === ROLES.PAYROLL_USER && (
              <>
                <ListItem
                  className="sbmenu-item"
                  button
                  key={translation.FAILURE_BTN}
                  onClick={() => history.push("/app/emp-err-operation")}
                >
                  <ListItemIcon>
                    <Tooltip title={translation.FAILURE_BTN}>
                      <img
                        className="imageContainer"
                        src={ErrorIcon}
                        alt={translation.FAILURE_BTN}
                      />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary={translation.FAILURE_BTN} />
                </ListItem>
              </>
            )}

            {localStorage.getItem("userRole") === ROLES.ACCOUNT_USER && (
              <>
                <ListItem
                  className="sbmenu-item"
                  button
                  key={translation.SUCCESS_BTN}
                  onClick={() => history.push("/app/payroll-success-operation")}
                >
                  <ListItemIcon>
                    <Tooltip title={translation.SUCCESS_BTN}>
                      <img
                        className="imageContainer"
                        src={PaymentIcon}
                        alt={translation.SUCCESS_BTN}
                      />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary={translation.SUCCESS_BTN} />
                </ListItem>
              </>
            )}

            {localStorage.getItem("userRole") === ROLES.ACCOUNT_USER && (
              <>
                <ListItem
                  className="sbmenu-item"
                  button
                  key={translation.FAILURE_BTN}
                  onClick={() => history.push("/app/payroll-error-operation")}
                >
                  <ListItemIcon>
                    <Tooltip title={translation.FAILURE_BTN}>
                      <img
                        className="imageContainer"
                        src={ErrorIcon}
                        alt={translation.FAILURE_BTN}
                      />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary={translation.FAILURE_BTN} />
                </ListItem>
              </>
            )}
          </List>

          <Grid item className="sidebar-bottom-wrap">
            <Divider />
            {orgName !== "" &&
              localStorage.getItem("userRole") !== ROLES.SUPER_ADMIN && (
                <ListItem
                  className="sbmenu-noti"
                  alignItems="center"
                  button
                  key={"Notification"}
                >
                  <ListItemIcon className="listicon-noti">
                    <img
                      className="imageContainer"
                      src={NotificationIcon}
                      alt="Notification"
                    />
                  </ListItemIcon>
                </ListItem>
              )}
            <Divider />
            <ListItem
              className="logout-item"
              alignItems="center"
              button
              key={"Logout"}
              onClick={handleLogout}
            >
              <ListItemIcon>
                <Tooltip title={translation.LOGOUT}>
                  <img className="logout-icon" src={LogoutIcon} alt="Logout" />
                </Tooltip>
              </ListItemIcon>
            </ListItem>
            <Divider />
            {orgName !== "" &&
              localStorage.getItem("userRole") !== ROLES.SUPER_ADMIN && (
                <Stack
                  className="avatar-wrapper"
                  justifyContent="center"
                  alignItems="center"
                  direction="row"
                  orientation="vertical"
                >
                  <Tooltip title={orgName}>
                    <Avatar
                      sx={{ bgcolor: deepOrange[500] }}
                      alt="Remy Sharp"
                      src="/broken-image.jpg"
                      className="pointer"
                    >
                      {upperformat}
                    </Avatar>
                  </Tooltip>
                </Stack>
              )}
            {localStorage.getItem("userRole") === ROLES.SUPER_ADMIN && (
              <Stack
                className="avatar-wrapper"
                justifyContent="center"
                alignItems="center"
                direction="row"
                orientation="vertical"
              >
                <Tooltip title={translation.SUPER_ADMIN}>
                  <Avatar
                    sx={{ bgcolor: deepOrange[500] }}
                    alt="Remy Sharp"
                    src="/broken-image.jpg"
                    className="pointer"
                  >
                    SA
                  </Avatar>
                </Tooltip>
              </Stack>
            )}
          </Grid>
        </Drawer>
        <Box
          className="drawer-content-wrapper"
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
        >
          <DrawerHeader />
          {props.children}
        </Box>
      </Box>
      <UploadEmployeeModal
        open={openUploadEmployeeForm}
        handleClose={openUploadEmployeeListModal}
      />
      <UploadSalaryEmployeeModal
        open={openUploadSalaryEmployeeForm}
        handleClose={openUploadSalaryEmployeeListModal}
      />
    </>
  );
}

import React, { useEffect, useState } from "react";
import useTranslation from "../../resources/index";
import NeritoLogo from "../../assets/images/nerito-logo-payroll.svg";
import PropVector from "../../assets/images/prop-vector.png";
import BarAngleIcon from "../../assets/images/bar-angle.svg";
import { loginRequest } from "../../actions";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Link,
  FormControl,
  FormHelperText,
  CircularProgress,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";

import "./login.scss";
// document.body.style.backgroundColor = "#3B9A83"

// Login Page 
export default function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const translation = useTranslation();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [progress, setProgress] = useState(0);
  const apiErrorMessage = useSelector((state) => state.login.errorMessage);
  const isLogin = useSelector((state) => state.login.isUserLogin);
  const isLoader = useSelector((state) => state.login.loader);

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async () => {
    if (email !== "" && values.password !== "")
      dispatch(loginRequest({ email, password: values.password }));
    else setErrorMessage(true);
  };

  useEffect(() => {
    if (isLogin) {
      history.push("/app");
    }
  }, [isLogin, history]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box>
      <Grid item className="loginmaincontainer">
        <Grid container className="loginwrapper">
          <Grid item className="logincolumnleft" xs={6}>
            <Grid item className="needhelpwrap">
              <Link to="/some-url">{translation.NEED_HELP}</Link>
            </Grid>
            <Grid item className="loginboxouter">
              <Grid item className="logininfoblock">
                <Typography gutterBottom variant="h2" align="left">
                  {translation.WELCOME_BACK_HEADING}
                </Typography>
                <Typography gutterBottom variant="h4" align="left">
                  {translation.WELCOME_SUB_HEADING}
                </Typography>
              </Grid>
              <Grid item className="loginformwrap">
                <form className="formCotrol" onSubmit={handleSubmit}>
                  <FormControl fullWidth variant="standard">
                    <Grid item xs={12} className="form-wrap">
                      <Typography gutterBottom align="left">
                        {translation.EMAIL_ADDRESS}
                      </Typography>
                      <TextField
                        id="standard-basic"
                        variant="outlined"
                        value={email}
                        fullWidth
                        type="Introduzca la dirección de correo electrónico"
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-id"
                        required
                        error={errorMessage && email === ""}
                        placeholder={translation.ENTER_EMAIL_HERE}
                      />
                    </Grid>
                    <Grid item className="form-wrap">
                      <Typography gutterBottom align="left">
                        {translation.PASSWORD}
                      </Typography>

                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        className="login-pwd"
                        error={errorMessage && values.password === ""}
                        placeholder={translation.ENTER_PASSWORD_HERE}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Grid>
                    <Grid item className="error-wrap">
                      {apiErrorMessage && (
                        <FormHelperText id="login-helper-text">
                          {translation.LOGIN_HELPER_TEXT}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} className="signin-btn-wrap">
                      <Button
                        color="primary"
                        variant="contained"
                        className="signin-btn"
                        onClick={() => {
                          if (!isLoader) {
                            handleSubmit();
                          }
                        }}
                      >
                        {translation.LOGIN}
                        <div className="login-preloader-wrap">
                          {isLoader && (
                            <CircularProgress
                              className="CircularProgress"
                              size={32}
                              variant="determinate"
                              value={progress}
                            />
                          )}
                        </div>
                      </Button>
                    </Grid>
                  </FormControl>
                </form>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="logincolumnright" xs={6}>
            <Grid item align="left" className="payroll-logo">
              <div className="brandLogo">
                {" "}
                <img
                  className="imageContainer"
                  src={NeritoLogo}
                  alt="Nerito Logo"
                />{" "}
              </div>
            </Grid>
            <Grid item align="left" className="nerito-information-block">
              <Typography className="welcome-msg" variant="h2">
                {" "}
                {translation.LOGIN_INFO_HEADING}{" "}
              </Typography>
              <Typography className="nerito-desc" variant="p">
                {" "}
                {translation.NERITO_DESC}{" "}
              </Typography>
              <Grid item align="left" className="dividing-line">
                {" "}
                <span className="divider"></span>{" "}
              </Grid>
              <Typography className="user-question">
                {" "}
                {translation.USER_QUESTION}{" "}
              </Typography>
              <Grid item className="contact-admin">
                <Link to="/some-url">
                  {translation.CONTACT_US}{" "}
                  <img className="imageContainer" src={BarAngleIcon} alt="" />
                </Link>
              </Grid>
              <Grid item className="dummyimg">
                {" "}
                <img className="imageContainer" src={PropVector} alt="" />{" "}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item align="center" className="brandLogoWrapper"></Grid>
    </Box>
  );
}

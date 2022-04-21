import actions from "../constants/action";
import { API } from "aws-amplify";
import { loginRequestApi, logoutRequestApi } from "../api";
import * as queries from "../graphql/queries";

export const loginRequest = (payload) => {
  return (dispatch) => {
    dispatch({ type: actions.LOGIN_REQUEST });
    loginRequestApi(payload.email, payload.password)
      .then((data) => {
        dispatch({ type: actions.LOGIN_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: actions.LOGIN_FAILURE, payload: err });
      });
  };
};
export const logoutRequest = () => {
  return (dispatch) => {
    dispatch({ type: actions.LOGOUT_REQUEST });
    logoutRequestApi()
      .then((data) => {
        dispatch({ type: actions.LOGOUT_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: actions.LOGOUT_FAILURE, payload: err });
      });
  };
};

export const getUserOrganisation = (userId, flag) => {
  return (dispatch) => {
    if (flag) dispatch({ type: actions.GET_USER_ORGANIZATION });
    API.graphql({
      query: queries.getUserNeritoConfig,
      variables: {
        filter: {
          Id: { eq: userId },
        },
        limit: 300,
      },
    })
      .then((result) => {
        const users = result.data.listUsers.items;
        if (users.length > 0) {
          return users[0].OrganizationId;
        }
        return "";
      })
      .then((data) => {
        if (data !== "") {
          dispatch({ type: actions.SUCCESS_USER_ORGANIZATION, payload: data });
        } else {
          dispatch({ type: actions.NO_COMPANY_ASSIGNED, payload: data });
        }
      })
      .catch((err) => {
        dispatch({ type: actions.FAILURE_USER_ORGANIZATION, payload: err });
      });
  };
};

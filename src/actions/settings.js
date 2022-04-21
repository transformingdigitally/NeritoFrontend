import actions from "../constants/action";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";

export const getConfigData = (payload) => {
  return (dispatch) => {
    API.graphql({
      query: queries.getNeritoConfig,
      variables: {
        limit: 10,
      },
    })
      .then((result) => {
        return result.data.listNeritoConfigs.items;
      })
      .then((data) => {
        dispatch({ type: actions.SUCCESS_CONFIG_DATA, payload: data });
      })
      .catch((err) => {
        dispatch({ type: actions.FAILURE_CONFIG_DATA, payload: err });
      });
  };
};

export const getUserConfigData = () => {
  return (dispatch) => {
    API.graphql({
      query: queries.getUserNeritoConfig,
      variables: {
        limit: 300,
      },
    })
      .then((result) => {
        return result.data.listUsers.items;
      })
      .then((data) => {
        dispatch({ type: actions.SUCCESS_USER_CONFIG_DATA, payload: data });
      })
      .catch((err) => {
        dispatch({ type: actions.FAILURE_USER_CONFIG_DATA, payload: err });
      });
  };
};

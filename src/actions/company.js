import actions from "../constants/action";
import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import { getDropDownList } from "../common/Utility/utility";
const elements = ["PayrollUsers", "AccountUsers", "FileValidation", "Config"];

export const getCompanyList = () => {
  return (dispatch) => {
    dispatch({ type: actions.GET_COMPANY_LIST });
    API.graphql({
      query: queries.listOrganizationsData,
      variables: { Type: "METADATA", limit: 1000 },
    })
      .then((result) => {
        return result.data.listOrganizationsData.items;
      })
      .then((data) => {
        dispatch({ type: actions.COMPANY_LIST_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: actions.COMPANY_LIST_FAILURE, payload: err });
      });
  };
};

export const company = (payload) => {
  return (dispatch) => {
    payload.PayrollUsers = getDropDownList(payload.PayrollUsers);
    payload.AccountUsers = getDropDownList(payload.AccountUsers);
    payload.Id = null;
    payload.SK = null;
    dispatch({ type: actions.CREATE_COMPANY });
    const formData = new FormData();
    formData.append("file", payload.File);
    Object.keys(payload).forEach((element) => {
      if (elements.includes(element)) {
        formData.append(element, JSON.stringify(payload[element]));
      } else {
        formData.append(element, payload[element]);
      }
    });
    saveOrg(formData, dispatch, true);
  };
};

export const companyEdit = (payload, isEdit) => {
  return (dispatch) => {
    const formData = new FormData();
    if (isEdit) {
      payload.PayrollUsers = getDropDownList(payload.PayrollUsers);
      payload.AccountUsers = getDropDownList(payload.AccountUsers);
      formData.append("file", payload.File);
      Object.keys(payload).forEach((element) => {
        if (elements.includes(element)) {
          formData.append(element, JSON.stringify(payload[element]));
        } else if (element !== "File") {
          formData.append(element, payload[element]);
        }
      });

      saveOrg(formData, dispatch, false);
    } else {
      API.graphql({
        query: mutations.updateOrganizations,
        variables: {
          input: { Status: payload.Status, Id: payload.Id, SK: payload.SK },
        },
      })
        .then((data) => {
          return data;
        })
        .then((data) => {
          dispatch({ type: actions.CREATE_COMPANY_SUCCESS, payload: payload });
        })
        .catch((err) => {
          dispatch({ type: actions.CREATE_COMPANY_FAILURE, payload: err });
        });
    }
  };
};

const updateUseOrgId = (payload, dispatch) => {
  API.graphql({
    query: mutations.updateUser,
    variables: {
      input: { Id: payload.Id, Group: payload.Group, OrganizationId: "" },
    },
  }).catch((err) => {
    dispatch({ type: actions.DELETE_COMPANY_FAILURE, payload: err });
  });
};
export const deleteCompany = (payload) => {
  return (dispatch) => {
    dispatch({ type: actions.DELETE_COMPANY });
    API.graphql({
      query: mutations.deleteOrganizations,
      variables: {
        input: { Id: payload.Id, SK: payload.SK },
      },
    })
      .then((data) => {
        return data;
      })
      .then((data) => {
        payload.AccountUsers.map((val) => {
          const userId = val.split("#")[0];
          updateUseOrgId({ Id: userId, Group: "ACCOUNT_USER" }, dispatch);
          return val;
        });
        payload.PayrollUsers.map((val) => {
          const userId = val.split("#")[0];
          updateUseOrgId({ Id: userId, Group: "PAYROLL_USER" }, dispatch);
          return val;
        });
        dispatch({ type: actions.DELETE_COMPANY_SUCCESS, payload });
      })
      .catch((err) => {
        dispatch({ type: actions.DELETE_COMPANY_FAILURE, payload: err });
      });
  };
};

export const resetSnackbarValues = () => ({
  type: actions.RESET_SNACKBAR_VALUES,
});

export const saveOrg = async (formData, dispatch, flag) => {
  const actionName = flag ? "SAVEORG" : "UPDATEORG";

  await fetch(
    "https://lp6hw689md.execute-api.us-west-1.amazonaws.com/dev/file-uploadtest?action=" +
      actionName,
    {
      method: "POST",
      body: formData,
    },
  )
    .then((response) =>
      response.json().then((data) => ({ status: response.status, body: data })),
    )
    .then((response) => {
      if (response.status === 200) {
        if (response.body.Success) {
          dispatch({
            type: actions.CREATE_COMPANY_SUCCESS,
            payload: response.body.Success,
          });
        }
      } else if (response.status === 400) {
        dispatch({
          type: actions.CREATE_COMPANY_VALIDATION_FAILURE,
          payload: response.body.Errors,
        });
      } else {
        dispatch({
          type: actions.CREATE_COMPANY_FAILURE,
          payload: response.Errors,
        });
      }
    })
    .catch((error) => {
      dispatch({ type: actions.CREATE_COMPANY_FAILURE, payload: error });
    });
};

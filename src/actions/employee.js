import actions from "../constants/action";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

export const refreshEmployeeList = (payload) => ({
  type: actions.REFRESHED_EMPLOYEE_LIST,
  payload: payload,
});

export const getEmployeeList = (payload) => {
  return (dispatch) => {
    dispatch({ type: actions.GET_EMPLOYEE_LIST });
    API.graphql({
      query: queries.getListEmployeesByOrganization,
      variables: {
        SK: `${payload.orgId}#${payload.month + 1}-${payload.year}`,
        limit: 3000,
      },
    })
      .then((result) => {
        return result.data.listEmployeesByOrganization.items;
      })
      .then((data) => {
        dispatch({ type: actions.EMPLOYEE_LIST_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: actions.EMPLOYEE_LIST_FAILURE, payload: err });
      });
  };
};

export const employee = (payload) => {
  return (dispatch) => {
    dispatch({ type: actions.CREATE_EMPLOYEE });
    API.graphql({
      query: mutations.createOrganizations,
      variables: { input: { ...payload } },
    })
      .then((data) => {
        return data;
      })
      .then((data) => {
        dispatch({ type: actions.CREATE_EMPLOYEE_SUCCESS, payload: payload });
      })
      .catch((err) => {
        dispatch({ type: actions.CREATE_EMPLOYEE_FAILURE, payload: err });
      });
  };
};

export const employeeEdit = (payload) => {
  return (dispatch) => {
    dispatch({ type: actions.CREATE_EMPLOYEE });
    API.graphql({
      query: mutations.updateEmployees,
      variables: { input: { ...payload } },
    })
      .then((data) => {
        return data;
      })
      .then((data) => {
        dispatch({ type: actions.CREATE_EMPLOYEE_SUCCESS, payload: payload });
      })
      .catch((err) => {
        dispatch({ type: actions.CREATE_EMPLOYEE_FAILURE, payload: err });
      });
  };
};

export const deleteEmployee = (payload) => {
  return (dispatch) => {
    dispatch({ type: actions.DELETE_EMPLOYEE });
    API.graphql({
      query: mutations.deleteEmployees,
      variables: { input: payload },
    })
      .then((data) => {
        return data;
      })
      .then((data) => {
        dispatch({ type: actions.DELETE_EMPLOYEE_SUCCESS, payload });
      })
      .catch((err) => {
        dispatch({ type: actions.DELETE_EMPLOYEE_FAILURE, payload: err });
      });
  };
};

export const resetSnackbarValues = () => ({
  type: actions.RESET_SNACKBAR_VALUES,
});

export const saveCsvList = (payload) => ({
  type: actions.SAVE_CSV_LIST,
  payload: payload,
});

export const freezeEmployeeListForCurrentMonth = (payload) => {
  return (dispatch) => {
    dispatch({ type: actions.FREEZE_EMPLOYEE_LIST });
    API.graphql({
      query: mutations.updateOrganizations,
      variables: {
        input: {
          SK: payload.sk,
          Id: payload.orgId,
          FreezeMonth: new Date().getMonth() + 1,
          FreezeYear: new Date().getFullYear(),
        },
        limit: 300,
      },
    })
      .then((data) => {
        return data;
      })
      .then((data) => {
        dispatch({
          type: actions.UPDATE_FREEZE_EMPLOYEE_LIST,
          payload: payload,
        });
        const formData = new FormData();
        formData.append("orgId", payload.orgId);
        fetch(
          "https://to1f63cg1j.execute-api.us-west-1.amazonaws.com/dev/insertdata?action=FREEZE",
          {
            method: "POST",
            body: JSON.stringify({
              orgId: payload.orgId,
            }),
          },
        ).catch((err) => {
        });
      })
      .catch((err) => {
        dispatch({ type: actions.FAILED_FREEZE_EMPLOYEE_LIST, payload: err });
      });
  };
};

export const unfreezeEmployeeListForCurrentMonth = (payload) => {
  return (dispatch) => {
    dispatch({ type: actions.UNFREEZE_EMPLOYEE_LIST });
    API.graphql({
      query: mutations.updateOrganizations,
      variables: {
        input: {
          SK: payload.sk,
          Id: payload.orgId,
          FreezeMonth: new Date().getMonth(),
          FreezeYear: new Date().getFullYear(),
        },
        limit: 300,
      },
    })
      .then((data) => {
        return data;
      })
      .then((data) => {
        dispatch({
          type: actions.UPDATE_UNFREEZE_EMPLOYEE_LIST,
          payload: payload,
        });
      })
      .catch((err) => {
        dispatch({ type: actions.FAILED_UNFREEZE_EMPLOYEE_LIST, payload: err });
      });
  };
};

export const getCompanyData = (orgId) => {
  return (dispatch) => {
    API.graphql({
      query: queries.getOrganizations,
      variables: {
        SK: "METADATA#",
        Id: orgId,

        limit: 1,
      },
    })
      .then((result) => {
        return result.data.getOrganizationsData.items;
      })
      .then((data) => {
        dispatch({ type: actions.SUCCESS_COMPANY_DATA, payload: data });
      })
      .catch((err) => {
        dispatch({ type: actions.FAILURE_COMPANY_DATA, payload: err });
      });
  };
};

export const resetCsvList = (payload) => ({
  type: actions.RESET_CSV_LIST,
  payload: payload,
});

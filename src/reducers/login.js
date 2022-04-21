import actions from "../constants/action";
import { isLoggedIn } from "../utils";
const INITIAL_STATE = {
  loader: false,
  isUserLogin: isLoggedIn(),
  email: localStorage.getItem('email'),
  role: localStorage.getItem('userRole'),
  errorMessage: "",
  id: localStorage.getItem('id'),
  orgId: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        loader: true,
        errorMessage: "",
      };
    case actions.LOGIN_SUCCESS:
      localStorage.setItem(
        "accessToken",
        action.payload.signInUserSession.accessToken.jwtToken
      );
      localStorage.setItem("userRole", action.payload.signInUserSession.idToken.payload['cognito:groups'][0]);
      localStorage.setItem("email", action.payload.attributes.email);
      localStorage.setItem("id", action.payload.username);
      return {
        ...state,
        loader: false,
        isUserLogin: true,
        errorMessage: "",
        email: action.payload.attributes.email,
        role: action.payload.signInUserSession.idToken.payload['cognito:groups'][0],
        id: action.payload.username,
      };
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        loader: false,
        errorMessage: action.payload.message,
      };
    case actions.LOGOUT_REQUEST:
      return {
        ...state,
        loader: true,
        errorMessage: "",
      };
    case actions.LOGOUT_SUCCESS:
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");
      localStorage.getItem('id')
      return {
        loader: false,
        isUserLogin: false,
        email: '',
        role: '',
        errorMessage: "",
        id: '',
        orgId: '',
      };;
    case actions.LOGOUT_FAILURE:
      return {
        ...state,
        loader: false,
        errorMessage: action.payload.message,
      };
    case actions.SUCCESS_USER_ORGANIZATION:
      return {
        ...state,
        orgId: action.payload,
      }
    default:
      return state;
  }
};

export default loginReducer;

import awsConfig from "../config/aws-exports";
import Amplify, { Auth } from "aws-amplify";

Amplify.configure(awsConfig);

export const loginRequestApi = (email, password) => Auth.signIn(email, password);
export const logoutRequestApi = () => Auth.signOut();

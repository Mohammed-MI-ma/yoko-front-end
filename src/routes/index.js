//Routes
import ForgottenPasswordContainer from "../modules/auth/views/ForgottenPassword";
import LoginContainer from "../modules/auth/views/LoginContainer";
import LoginContainerAdmin from "../modules/auth/views/LoginContainerAdmin";
import RegisterContainer from "../modules/auth/views/RegisterContainer";

const routes = [
  {
    path: "/",
    name: "Login Component",
    component: LoginContainer,
  },
  {
    path: "/auth/login",
    name: "Login Component",
    component: LoginContainer,
  },
  {
    path: "/auth/forgot-password",
    name: "ForgottenPassword Component",
    component: ForgottenPasswordContainer,
    exact: 0,
  },
  {
    path: "/auth/reset-password",
    name: "ResetPassword Component",
    component: LoginContainer,
    exact: 0,
  },
  {
    path: "/auth/sign-up",
    name: "Register Component",
    component: RegisterContainer,
    exact: 0,
  },

  //ADMINS
  {
    path: "/admin/auth/login",
    name: "Administrator Component",
    component: LoginContainerAdmin, // Replace with the actual component for administrators
    exact: true, // Set to true if you want an exact match for this route
  },
];

export default routes;

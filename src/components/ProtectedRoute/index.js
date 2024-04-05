import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ path, element, language }) => {
  return (
    <Route
      path={path}
      element={
        isAdminAuthenticated() ? element : <Navigate to="/" replace /> // Redirect unauthorized users to the home page
      }
    />
  );
};
const isAdminAuthenticated = () => {
  // Implement your authentication logic here
  // For example, check if the user is logged in and is an admin
  const user = JSON.parse(localStorage.getItem("userData"));
  return user && user.role === "admin"; // Assuming role is stored in the user object
};
export default ProtectedRoute;

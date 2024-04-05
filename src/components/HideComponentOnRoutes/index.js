import { useLocation } from "react-router-dom";

const HideComponentOnRoutes = ({ routes, children }) => {
  const location = useLocation();
  console.log("HideComponentOnRoutes", location.pathname, routes);
  // Check if the current location matches any of the specified routes
  const isMatchingRoute = routes.some((route) => location.pathname === route);
  console.log(isMatchingRoute);
  // Render children if the current location does not match any of the specified routes
  return !isMatchingRoute && children;
};
export default HideComponentOnRoutes;

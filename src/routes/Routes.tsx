import React from "react";
import { Route, Routes } from "react-router-dom";
import { HOME_PAGE, ADMIN, SIGNIN } from "../constants";

import SignIn from "../components/signIn/SignIn";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/authSlice";
import Admin from "../components/Admin/Admin";
import Moves from "../components/moves/Moves";

const publicRoutes = [
  {
    path: HOME_PAGE,
    element: <Moves />,
  },
  {
    path: SIGNIN,
    element: <SignIn />,
  },
];

const privateRoutes = [
  {
    path: ADMIN,
    element: <Admin />,
  },
];

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Routes>
      {isAuthenticated
        ? privateRoutes.map(({ path, element }) => {
            return <Route key={path} path={path} element={element} />;
          })
        : publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
    </Routes>
  );
};

export default AppRoutes;

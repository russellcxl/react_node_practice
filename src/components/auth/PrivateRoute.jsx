import React from "react";
import { Route, Redirect } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";
import Home from "../Home";

export default function PrivateRoute({ children, isAuth, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? 
        (
          children
        ) 
        : 
        (
          <Redirect
            to={"/users/login"}
          />
        )
      }
    />
  );
}

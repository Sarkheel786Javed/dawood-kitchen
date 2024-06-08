import React from "react";
import { Outlet, Navigate } from "react-router";

function Private() {
  const IsLogedIn = () => {
    let auth = JSON.parse(localStorage.getItem("auth"));
    if (auth !== null) return true;
    else return false;

  };
  if (IsLogedIn()) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default Private;

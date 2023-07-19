import React from 'react';
import { Outlet } from "react-router"
import { Navigate } from "react-router-dom"

export const UnprotectedRouteLayout = () => {
  const userId = sessionStorage.getItem('userId');
  if (userId) {
    return <Navigate to="/" />
  }
  return <Outlet />
}

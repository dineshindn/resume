import React from 'react';
import { Navigate, Outlet } from "react-router"

export const ProtectedRouteLayout = () => {
  const userId = sessionStorage.getItem('userId');

  if (!userId) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

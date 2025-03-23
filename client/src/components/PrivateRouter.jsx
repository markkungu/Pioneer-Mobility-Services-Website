
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRouter() {
    const {currentUser} = useSelector((state) => state.user);
  return ( 
    currentUser  ? <Outlet /> : <Navigate to="/signin" /> 

  )
}

export function AdminRouter() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to="/adminsignin" />;
}


 
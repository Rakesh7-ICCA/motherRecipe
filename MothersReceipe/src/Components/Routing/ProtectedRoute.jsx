import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Login from '../Login'

const ProtectedRoute = () => {
  const navigate = useNavigate();
  
  const user = localStorage.getItem('ID');

  useEffect(() => {
      if (!user) {
          navigate('/landing');
      }
  }, [user]);


  return (
      <Outlet />
  )
}

export default ProtectedRoute
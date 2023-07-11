import React from 'react'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from '@azure/msal-react'
import { Navigate, Outlet } from 'react-router-dom'
import PATHS from '../../router/routes'

const Private = () => {
  return (
    <>
      <UnauthenticatedTemplate>
        <Navigate to={PATHS.login} />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <Outlet />
      </AuthenticatedTemplate>
    </>
  )
}

export default Private

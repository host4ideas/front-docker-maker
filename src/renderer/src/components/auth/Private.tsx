import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from '@azure/msal-react'
import { Navigate, Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { electronLoggedAccount } from '@renderer/atoms/electronAccountAtom'
import PATHS from '@renderer/router/routes'

const Private = () => {
  const loggedAccount = useRecoilValue(electronLoggedAccount)

  if (window.electron) {
    if (loggedAccount) {
      return <Outlet />
    } else {
      return <Navigate to={PATHS.login} />
    }
  } else {
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
}

export default Private

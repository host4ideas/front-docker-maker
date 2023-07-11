import React from 'react'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from '@azure/msal-react'
import Login from './Login'

const Welcome = () => {
  const { accounts } = useMsal()

  return (
    <>
      <AuthenticatedTemplate>
        <div className="text-gray-900 dark:text-white">
          Welcome: {accounts[0] && accounts[0].name} !
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </>
  )
}

export default Welcome

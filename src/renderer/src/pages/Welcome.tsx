import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from '@azure/msal-react'
import Login from './Login'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { electronLoggedAccount } from '@renderer/atoms/electronAccountAtom'

const Welcome = () => {
  const { accounts } = window.electron ? { accounts: null } : useMsal()
  const [welcomeJsx, setWelcomeJsx] = useState(<Login />)
  const loggedAccount = useRecoilValue(electronLoggedAccount)

  if (window.electron) {
    // If Desktop
    useEffect(() => {
      if (loggedAccount) {
        document.title = 'DockerMaker | ' + loggedAccount.name
        setWelcomeJsx(
          <div className="text-gray-900 dark:text-white">
            Welcome: {loggedAccount.name} !
          </div>
        )
      } else {
        document.title = 'DockerMaker'
        /*
          Check whether welcomeJsx equals Login to avoid unecessary state changes
          in cases where the user is not logged in
         */
        if (welcomeJsx !== <Login />) setWelcomeJsx(<Login />)
      }
    }, [loggedAccount])
  } else {
    // If Web or Mobile
    return (
      <>
        <AuthenticatedTemplate>
          <div className="text-gray-900 dark:text-white">
            Welcome: {accounts ? accounts[0] && accounts[0].name : null} !
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Login />
        </UnauthenticatedTemplate>
      </>
    )
  }

  return welcomeJsx
}

export default Welcome

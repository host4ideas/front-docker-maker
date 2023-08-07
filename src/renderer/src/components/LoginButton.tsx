import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../utils/authConfig'
import { showToastMessage } from '../utils/showToastMessage'
import { Status } from '../utils/types'

export const LoginButton = () => {
  const handleSignIn = async () => {
    if (window.electron) {
      window.renderer.sendLoginMessage()
    } else {
      const { instance } = useMsal()

      // Show InAppBrowser login page
      instance.loginRedirect(loginRequest).catch((e: any) => {
        showToastMessage('Login error: ' + e.message, Status.Error)
      })
    }
  }

  return (
    <>
      <button onClick={handleSignIn} id="navigation_button">
        Login
      </button>
    </>
  )
}

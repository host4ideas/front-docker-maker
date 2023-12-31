import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../utils/authConfig'
import { showToastMessage } from '../utils/showToastMessage'
import { Status } from '../utils/types'

interface Props {
  classes: string
}

/**
 * Renders a button which, when selected, will open a popup or redirect to Microsoft login page
 */
const SignInButton = ({ classes }: Props) => {
  const { instance } = window.electron ? { instance: null } : useMsal()

  const handleLogin = (loginType: string) => {
    if (window.electron) {
      window.renderer.sendLoginMessage()
    } else {
      if (loginType === 'popup' && instance) {
        instance.loginPopup(loginRequest).catch((e: any) => {
          console.error(e)
        })
      } else if (loginType === 'redirect' && instance) {
        // Show InAppBrowser login page
        instance.loginRedirect(loginRequest).catch((e: any) => {
          showToastMessage('Login error: ' + e.message, Status.Error)
        })
      }
    }
  }

  return (
    <>
      {/* <div className={classes} onClick={() => handleLogin('popup')}>
        Sign in using Popup
      </div> */}
      <div className={classes} onClick={() => handleLogin('redirect')}>
        Sign in
      </div>
    </>
  )
}

export default SignInButton

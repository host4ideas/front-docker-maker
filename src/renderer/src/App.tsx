import { useSetRecoilState } from 'recoil'
import Router from './router/Router'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { AccountInfo } from '@azure/msal-browser'
import { electronLoggedAccount } from './atoms/electronAccountAtom'

const App = () => {
  if (window.electron) {
    const setRecoilState = useSetRecoilState(electronLoggedAccount)

    useEffect(() => {
      window.renderer.handleGetAccount(
        (_event, accountResponse: AccountInfo) => {
          setRecoilState(accountResponse)
        }
      )

      window.renderer.requestGetAccount()
    }, [])
  }

  return (
    <>
      <Router />
      <Toaster position="bottom-right" reverseOrder={true} />
    </>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { loginApiRequest, msalConfig } from './utils/authConfig'
import { RecoilRoot } from 'recoil'
import axios, { InternalAxiosRequestConfig } from 'axios'
import CONSTS from './utils/consts'
import { NavigationAuthenticationClient } from './utils/NavigationAuthenticationClient'

const pca = new PublicClientApplication(msalConfig)

pca.setNavigationClient(new NavigationAuthenticationClient(pca))

axios.defaults.baseURL = CONSTS.API_BASE
axios.interceptors.request.use(
  async (request: InternalAxiosRequestConfig) => {
    const account = pca.getAllAccounts()[0]
    const msalResponse = await pca.acquireTokenSilent({
      ...loginApiRequest,
      account
    })
    request.headers.Authorization = `Bearer ${msalResponse.accessToken}`
    return request
  },
  (err) => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.message = 'Unable to reach server'
    } else if (error.response.status === 403) {
      error.response.data =
        "You don't have enough permissions to access this resource"
    } else if (error.response.status === 401) {
      error.response.data = 'Unauthorized'
    }

    throw error
  }
)

// // Default to using the first account if no account is active on page load
// if (
//   !pca.getActiveAccount() &&
//   pca.getAllAccounts().length > 0
// ) {
//   // Account selection logic is app dependent. Adjust as needed for different use cases.
//   pca.setActiveAccount(pca.getAllAccounts()[0])
// }

// // Optional - This will update account state if a user signs in from another tab or window
// pca.enableAccountStorageEvents()

// pca.addEventCallback((event: any) => {
//   if (event.eventType === EventType.LOGIN_SUCCESS && event.payload?.account) {
//     const account = event.payload.account
//     pca.setActiveAccount(account)
//   }
// })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <MsalProvider instance={pca}>
        <App />
      </MsalProvider>
    </RecoilRoot>
  </React.StrictMode>
)

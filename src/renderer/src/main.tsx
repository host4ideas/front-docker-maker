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

if (window.electron) {
  const getApiToken = () => {
    return new Promise((resolve) => {
      window.renderer.handleApiToken((_event, tokenResponse) => {
        resolve(tokenResponse)
      })
      window.renderer.requestApiToken()
    })
  }

  axios.defaults.baseURL = CONSTS.API_BASE
  axios.interceptors.request.use(
    async (request: InternalAxiosRequestConfig) => {
      const accessToken = await getApiToken()

      request.headers.Authorization = `Bearer ${accessToken}`
      return request
    },
    (err) => {
      return Promise.reject(err)
    }
  )

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </React.StrictMode>
  )
} else {
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

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <RecoilRoot>
        <MsalProvider instance={pca}>
          <App />
        </MsalProvider>
      </RecoilRoot>
    </React.StrictMode>
  )
}

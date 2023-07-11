import { Configuration, LogLevel } from '@azure/msal-browser'

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_APP_ID, // Application Client ID
    authority: import.meta.env.VITE_AUTHORITY, // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: import.meta.env.VITE_REDIRECT_URI
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback:
        import.meta.env.MODE === 'development'
          ? (level: any, message: string, containsPii: any) => {
              if (containsPii) {
                return
              }
              switch (level) {
                case LogLevel.Error:
                  console.error(message)
                  return
                case LogLevel.Info:
                  console.info(message)
                  return
                case LogLevel.Verbose:
                  console.debug(message)
                  return
                case LogLevel.Warning:
                  console.warn(message)
                  // eslint-disable-next-line no-useless-return
                  return
              }
            }
          : undefined
    }
  }
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ['User.Read']
}

export const loginApiRequest = {
  scopes: ['api://5a967221-2eb0-4b6c-a3a5-c4ad7305468d/api.scope']
}

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  graphMeEndpoint: import.meta.env.VITE_GRAPH_ENDPOINT
}

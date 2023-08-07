import { LogLevel } from '@azure/msal-node'

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/configuration.md
 */
const msalConfig = {
  auth: {
    clientId: import.meta.env.MAIN_VITE_APP_ID,
    authority: import.meta.env.MAIN_VITE_AUTHORITY
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

const protectedResources = {
  graphMe: {
    endpoint: import.meta.env.MAIN_VITE_GRAPH_ENDPOINT,
    scopes: ['User.Read']
  },
  api: {
    endpoint: import.meta.env.MAIN_VITE_API_ENDPOINT,
    scopes: ['api://5a967221-2eb0-4b6c-a3a5-c4ad7305468d/api.scope']
  }
}

export { msalConfig, protectedResources }

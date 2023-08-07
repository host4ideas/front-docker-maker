import { Client } from '@microsoft/microsoft-graph-client'
import 'isomorphic-fetch'

/**
 * Creating a Graph client instance via options method. For more information, visit:
 * https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/dev/docs/CreatingClientInstance.md#2-create-with-options
 */
const getGraphClient = (accessToken: string) => {
  // Initialize Graph client
  const graphClient = Client.init({
    // Use the provided access token to authenticate requests
    authProvider: (done) => {
      done(null, accessToken)
    }
  })

  return graphClient
}

export default getGraphClient

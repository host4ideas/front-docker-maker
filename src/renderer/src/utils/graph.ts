import axios from 'axios'
import { graphConfig } from './authConfig'
import { GraphData } from './types'

/**
 * Attaches a given access token to a Microsoft Graph API call. Returns information about the user
 */
const callMsGraph = async (accessToken: string): Promise<GraphData> => {
  const response = await axios
    .create()
    .get<GraphData>(graphConfig.graphMeEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

  return response.data
}

export const imageProfileMsGraph = async (
  accessToken: string
): Promise<string> => {
  const response = await axios
    .create()
    .get<string>(graphConfig.graphMeEndpoint + '/photo/$value', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

  return response.data
}

export default callMsGraph

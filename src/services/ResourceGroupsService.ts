import axios from 'axios'
import CONSTS from '../utils/consts'
import { ApiResponse, Status } from '../utils/types'

class ResourceGroupsService {
  getResourceGroups = async (): Promise<ApiResponse> => {
    const request = CONSTS.API_BASE + CONSTS.API_CONTAINERS_RGS

    try {
      const response = await axios.get<string[]>(request)

      return new ApiResponse('', Status.Success, response.data)
    } catch (error: any) {
      return new ApiResponse(error.message, Status.Error)
    }
  }

  createResourceGroup = async (
    rgName: string,
    location: string
  ): Promise<ApiResponse> => {
    const request =
      CONSTS.API_BASE + CONSTS.API_CONTAINERS_RGS + rgName + '/' + location

    try {
      await axios.post(request)

      return new ApiResponse(
        `Resource group ${rgName} created successfully`,
        Status.Success
      )
    } catch (error: any) {
      return new ApiResponse(error.message, Status.Error)
    }
  }

  deleteResourceGroup = async (rgName: string): Promise<ApiResponse> => {
    const request = CONSTS.API_BASE + CONSTS.API_CONTAINERS_RGS + rgName
    try {
      await axios.delete(request)
      return new ApiResponse(
        `Resource group: ${rgName} deleted`,
        Status.Success
      )
    } catch (error: any) {
      return new ApiResponse('Error: ' + error.message, Status.Error)
    }
  }
}

const singletonInstance = new ResourceGroupsService()
Object.freeze(singletonInstance)
export default singletonInstance

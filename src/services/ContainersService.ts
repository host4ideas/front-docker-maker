import axios from 'axios'
import CONSTS from '../utils/consts'
import {
  ApiResponse,
  ContainerGroupView,
  ContainerInstanceView,
  CreateContainerGroup,
  ExecResult,
  InstanceCommandModel,
  Status
} from '../utils/types'

class ContainersService {
  createContainerGroup = async (
    containerGroup: CreateContainerGroup
  ): Promise<ApiResponse<ContainerGroupView>> => {
    const request = CONSTS.API_CONTAINERS

    try {
      const response = await axios.post<ContainerGroupView>(
        request,
        containerGroup
      )
      return new ApiResponse<ContainerGroupView>(
        '',
        Status.Success,
        response.data
      )
    } catch (error: any) {
      return new ApiResponse(error.message, Status.Error)
    }
  }

  getContainerGroups = async (currentRG: string): Promise<ApiResponse> => {
    const request = CONSTS.API_BASE + CONSTS.API_CONTAINERS + currentRG

    try {
      const response = await axios.get<ContainerGroupView[]>(request)
      return new ApiResponse('', Status.Success, response.data)
    } catch (error: any) {
      return new ApiResponse(error.response.data, Status.Error)
    }
  }

  getContainerInstances = async (identifier: string): Promise<ApiResponse> => {
    const request =
      CONSTS.API_BASE + CONSTS.API_CONTAINERS_INSTANCES + '?ci=' + identifier

    try {
      const response = await axios.get<ContainerInstanceView[]>(request)
      return new ApiResponse('', Status.Success, response.data)
    } catch (error: any) {
      return new ApiResponse(error.response.data, Status.Error)
    }
  }

  deleteContainerGroup = async (identifier: string): Promise<ApiResponse> => {
    const request =
      CONSTS.API_BASE + CONSTS.API_CONTAINERS_DELETE_GROUP + '?ci=' + identifier

    try {
      await axios.delete(request)
      return new ApiResponse('Container deleted', Status.Success)
    } catch (error: any) {
      return new ApiResponse(error.response.data, Status.Error)
    }
  }

  startContainerGroup = async (identifier: string): Promise<ApiResponse> => {
    const request =
      CONSTS.API_BASE + CONSTS.API_CONTAINERS_START + '?ci=' + identifier

    try {
      await axios.put(request)
      return new ApiResponse('Container started', Status.Success)
    } catch (error: any) {
      return new ApiResponse(
        'Error: Container already running or not reachable',
        Status.Error
      )
    }
  }

  stopContainerGroup = async (identifier: string): Promise<ApiResponse> => {
    const request =
      CONSTS.API_BASE + CONSTS.API_CONTAINERS_STOP + '?ci=' + identifier

    try {
      await axios.put(request)
      return new ApiResponse('Container stopped', Status.Success)
    } catch (error: any) {
      return new ApiResponse('Error: ' + error.message, Status.Error)
    }
  }

  executeInstanceCommand = async (
    command: InstanceCommandModel
  ): Promise<ApiResponse<ExecResult>> => {
    const request = CONSTS.API_BASE + CONSTS.API_CONTAINERS_EXEC

    try {
      const execResult = await axios.put<ExecResult>(request, command)
      return new ApiResponse('', Status.Success, execResult.data)
    } catch (error: any) {
      return new ApiResponse('Error: ' + error.message, Status.Error)
    }
  }

  executeGroupCommand = async (
    containerIdentifier: string,
    command: string
  ) => {
    const request = CONSTS.API_BASE + CONSTS.API_CONTAINERS_EXEC_ALL
    await axios.put(request, { containerIdentifier, command })
  }
}

const singletonInstance = new ContainersService()
Object.freeze(singletonInstance)
export default singletonInstance

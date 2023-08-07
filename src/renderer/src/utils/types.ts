/* eslint-disable no-unused-vars */

export enum ContainerNetworkProtocol {
  UDP = 'UDP',
  TCP = 'TCP'
}

export enum ContainerInstanceOperatingSystemType {
  Linux = 'Linux',
  Windows = 'Windows'
}

export enum Status {
  Error = 1,
  Loading = 2,
  Success = 3
}

export enum ContainerGroupSku {
  Standard = 'Standard',
  Dedicated = 'Dedicated',
  Confidential = 'Confidential'
}

export interface GraphData {
  mail: string
  givenName: string
  surname: string
  userPrincipalName: string
  displayName: string
  id: string
}

export interface Port {
  protocol: ContainerNetworkProtocol
  port: number
}

export interface ContainerInstanceView {
  name: string
  image: string
  command: string[]
  ports: Port[]
  environmentVariables: {
    name: string
    value: string
    secureValue: string
  }
}

export interface ContainerGroupView {
  identifier: string
  name: string
  state: string
  provisioningState: string
  resourceTypes: string
  containerInstances: ContainerInstanceView[]
}

export interface RGModel {
  name: string
  createdOn: Date
  identifier: string
  provisionState: string
  createdBy: string
  tags: Record<string, string>
}

export interface RegistryView {
  id: string
  name: string
  loginUrl: string
}

export class ApiResponse<T = any> {
  message = ''
  status: Status = Status.Error
  data?: T

  // eslint-disable-next-line space-before-function-paren
  constructor(message: string, status: Status, data?: T) {
    this.message = message
    this.status = status
    this.data = data
  }
}

export interface InstanceCommandModel {
  containerIdentifier: string
  instanceName: string
  command: string
}

export interface ExecResult {
  password: string
  webSocketUri: URL
}

export interface ContainerPort {
  port: number
  protocol: ContainerNetworkProtocol
}

export interface CreateContainerInstance {
  image: string
  name: string
  memoryInGB: number
  cpu: number
  ports: ContainerPort[]
  removeInstance: () => void
}

export interface CreateContainerGroup {
  name: string
  resourceGroupName: string
  location: string
  sku: ContainerGroupSku
  osType: ContainerInstanceOperatingSystemType
  containers?: CreateContainerInstance[]
}

export interface RepoImage {
  name: string
  url: string
}

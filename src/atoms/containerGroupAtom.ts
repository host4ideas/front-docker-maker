import { atom } from 'recoil'
import { ContainerGroupView } from '../utils/types'

/**
 * Recoil state of the actual clicked Resource Group
 */
export const currentContainerGroup = atom<ContainerGroupView>({
  key: 'currentContainerGroup',
  default: undefined
})

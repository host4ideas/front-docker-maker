import { atom } from 'recoil'
import { GraphData } from '../utils/types'

/**
 * Recoil state of the actual clicked Resource Group
 */
export const loggeUserState = atom<GraphData | null>({
  key: 'loggeUserState',
  default: null
})

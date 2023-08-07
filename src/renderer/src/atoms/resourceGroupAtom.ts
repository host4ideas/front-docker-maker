import { atom } from 'recoil'

/**
 * Recoil state of the actual clicked Resource Group
 */
export const currentRGState = atom({
  key: 'currentRGState',
  default: ''
})

import { AccountInfo } from '@azure/msal-browser'
import { atom } from 'recoil'

/**
 * Recoil state of the actual clicked Resource Group
 */
export const electronLoggedAccount = atom<AccountInfo>({
  key: 'electronLoggedAccount',
  default: undefined
})

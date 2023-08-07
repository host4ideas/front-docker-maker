export declare interface CustomAPI {
  sendLoginMessage: () => void
  sendSignoutMessage: () => void
  requestProfileData: () => void
  handleProfileData: (func: (event: any, response: any) => void) => void
  handleProfileImage: (func: (event: any, response: any) => void) => void
  requestApiToken: () => void
  handleApiToken: (func) => (func: (event: any, response: any) => any) => any
  requestGetAccount: () => void
  handleGetAccount: (func: (event: any, response: any) => void) => void
}

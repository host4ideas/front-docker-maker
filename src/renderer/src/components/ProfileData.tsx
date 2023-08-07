import { Fragment, useState } from 'react'
import { GraphData, Status } from '../utils/types'
import { Menu, Transition } from '@headlessui/react'
import { useMsal } from '@azure/msal-react'
import SignOutButton from './SignOutButton'
import SignInButton from './SignInButton'
import { UserIcon } from '@heroicons/react/24/outline'
import { loginRequest } from '../utils/authConfig'
import callMsGraph, { imageProfileMsGraph } from '../utils/graph'
import { showToastMessage } from '../utils/showToastMessage'
import { Spinner } from 'flowbite-react'
import { useRecoilValue } from 'recoil'
import { electronLoggedAccount } from '@renderer/atoms/electronAccountAtom'

/**
 * Renders information about the user obtained from Microsoft Graph
 */
const ProfileData = () => {
  const [loading, setLoading] = useState(false)
  const { instance, accounts } = window.electron
    ? { instance: null, accounts: null }
    : useMsal()
  const [graphData, setGraphData] = useState<GraphData | null>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const electronIsAuth = useRecoilValue(electronLoggedAccount)

  const name = accounts && accounts[0] && accounts[0].name

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  const requestProfileDataData = () => {
    setLoading(true)

    if (window.electron) {
      if (!electronIsAuth) {
        // Force login if not authenticated, needed for Welcome Component
        window.renderer.sendLoginMessage()
      }

      window.renderer.handleProfileData((_event, graphResponse: GraphData) => {
        if (!graphResponse) return
        setGraphData(graphResponse)
      })

      window.renderer.handleProfileImage((_event, imageUrl: string) => {
        if (!imageUrl) return
        setProfileImage(imageUrl)
      })

      window.renderer.requestProfileData()
    } else if (accounts && instance) {
      const request = {
        ...loginRequest,
        account: accounts[0]
      }

      let accessToken: string

      // Silently acquires an access token which is then attached to a request for Microsoft Graph data
      instance
        .acquireTokenSilent(request)
        .then((response: any) => {
          accessToken = response.accessToken
          callMsGraph(response.accessToken).then((response) => {
            setGraphData(response)
          })
        })
        .catch(() => {
          instance.acquireTokenRedirect(request).then((response: any) => {
            accessToken = response.accessToken
            callMsGraph(response.accessToken)
              .then((response) => {
                setGraphData(response)
              })
              .catch((e: any) => {
                showToastMessage(
                  'Unable to fetch user data: ' + e.message,
                  Status.Error
                )
              })
          })
        })
        .finally(() => {
          if (accessToken) {
            imageProfileMsGraph(accessToken)
              .then((response) => {
                setProfileImage(response)
              })
              .catch((e: any) => {
                console.warn('Unable to get profile image: ' + e.message)
              })
          }
        })
    }

    setLoading(false)
  }

  return (
    <Menu as="div">
      <div>
        <Menu.Button
          onClick={requestProfileDataData}
          disabled={loading}
          className="flex rounded-full bg-gray-400 dark:bg-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-offset-gray-50"
        >
          <span className="sr-only">{name}</span>
          {loading ? (
            <Spinner
              className="h-8 w-8"
              color="failure"
              aria-label="Loading..."
            />
          ) : profileImage !== null ? (
            <img className="h-8 w-8 rounded-full" src={profileImage} />
          ) : (
            <UserIcon className="h-8 w-8 rounded-full" />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item disabled={true}>
            <div className="block px-4 py-2 text-sm text-gray-700">
              <div className="overflow-x-auto">
                <strong>ID: </strong>
                {graphData?.id}
              </div>
            </div>
          </Menu.Item>
          {graphData?.displayName && (
            <Menu.Item disabled={true}>
              <div className="block px-4 py-2 text-sm text-gray-700">
                <div className="overflow-x-auto">
                  <strong>Username: </strong>
                  {graphData.displayName}
                </div>
              </div>
            </Menu.Item>
          )}
          {graphData?.givenName && (
            <Menu.Item disabled={true}>
              <div className="block px-4 py-2 text-sm text-gray-700">
                <div className="overflow-x-auto">
                  <strong>Name: </strong>
                  {graphData.givenName}
                </div>
              </div>
            </Menu.Item>
          )}
          {graphData?.surname && (
            <Menu.Item disabled={true}>
              <div className="block px-4 py-2 text-sm text-gray-700">
                <div className="overflow-x-auto">
                  <strong>Last Name: </strong>
                  {graphData.surname}
                </div>
              </div>
            </Menu.Item>
          )}
          {graphData?.mail && (
            <Menu.Item disabled={true}>
              <div className="block px-4 py-2 text-sm text-gray-700">
                <div className="overflow-x-auto">
                  <strong>Email: </strong>
                  {graphData.mail}
                </div>
              </div>
            </Menu.Item>
          )}
          {graphData?.userPrincipalName && (
            <Menu.Item disabled={true}>
              <div className="block px-4 py-2 text-sm text-gray-700">
                <div className="overflow-x-auto">
                  <strong>User principal: </strong>
                  {graphData.userPrincipalName}
                </div>
              </div>
            </Menu.Item>
          )}
          <Menu.Item>
            {({ active }) =>
              graphData ? (
                <SignOutButton
                  classes={classNames(
                    active ? 'bg-gray-100 hover:cursor-pointer' : '',
                    'block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer'
                  )}
                />
              ) : (
                <SignInButton
                  classes={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer hover:bg-gray-300'
                  )}
                />
              )
            }
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ProfileData

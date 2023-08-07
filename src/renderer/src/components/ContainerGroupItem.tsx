import {
  ArchiveBoxIcon,
  MagnifyingGlassCircleIcon,
  PauseIcon,
  PlayIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import PATHS from '../router/routes'
import { ContainerGroupView, Status } from '../utils/types'
import ContainerService from '../services/ContainersService'
import { showToastMessage } from '../utils/showToastMessage'
import { toast } from 'react-hot-toast'
import { useSetRecoilState } from 'recoil'
import { currentContainerGroup } from '../atoms/containerGroupAtom'

interface IProps {
  containerGroup: ContainerGroupView
  refreshContainers: () => void
}

export const ContainerGroupItem = ({
  containerGroup,
  refreshContainers
}: IProps) => {
  const setCurrentGroup = useSetRecoilState(currentContainerGroup)

  const handleStartContainer = async () => {
    const loadingToast = showToastMessage(
      `Starting container ${containerGroup.name}...`,
      Status.Loading
    )

    const apiResponse = await ContainerService.startContainerGroup(
      containerGroup.identifier
    )

    toast.dismiss(loadingToast)
    showToastMessage(apiResponse.message, apiResponse.status)
    if (apiResponse.status === Status.Success) {
      refreshContainers()
    }
  }

  const handleStopContainer = async () => {
    const loadingToast = showToastMessage(
      `Stopping container ${containerGroup.name}...`,
      Status.Loading
    )

    const apiResponse = await ContainerService.stopContainerGroup(
      containerGroup.identifier
    )

    toast.dismiss(loadingToast)
    showToastMessage(apiResponse.message, apiResponse.status)
    if (apiResponse.status === Status.Success) {
      refreshContainers()
    }
  }

  const handleDeleteContainer = async () => {
    const loadingToast = showToastMessage(
      `Deleting container ${containerGroup.name}...`,
      Status.Loading
    )

    const apiResponse = await ContainerService.deleteContainerGroup(
      containerGroup.identifier
    )

    toast.dismiss(loadingToast)
    showToastMessage(apiResponse.message, apiResponse.status)
    if (apiResponse.status === Status.Success) {
      refreshContainers()
    }
  }

  const containerDetailsBtn = () => {
    setCurrentGroup(containerGroup)
  }

  return (
    <li className="pb-3 sm:pb-4 max-w-4xl dark:text-white">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <ArchiveBoxIcon width={'30px'} className="pt-3" />
          </div>
          <div className="flex-1 min-w-0 mt-4">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {containerGroup.name +
                ' | ' +
                containerGroup.provisioningState +
                ' | ' +
                containerGroup.state}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {containerGroup.resourceTypes}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            onClick={containerDetailsBtn}
            to={PATHS.containerDetails}
            className="text-gray-900 dark:text-white"
          >
            <MagnifyingGlassCircleIcon
              width={'30px'}
              className="m-1 hover:bg-gray-600 cursor-pointer rounded-full"
            />
          </Link>
          <a className="text-gray-900 dark:text-white">
            {containerGroup.state.toLowerCase() === 'stopped' ||
            containerGroup.state.toLowerCase() === 'terminated' ||
            containerGroup.state.toLowerCase() === 'succeeded' ? (
              <PlayIcon
                onClick={handleStartContainer}
                width={'30px'}
                className="m-1 hover:bg-gray-600 cursor-pointer rounded-full"
              />
            ) : (
              <PauseIcon
                onClick={handleStopContainer}
                width={'30px'}
                className="m-1 hover:bg-gray-600 cursor-pointer rounded-full"
              />
            )}
          </a>
          <div>
            <TrashIcon
              onClick={handleDeleteContainer}
              width={'35px'}
              className="m-1 p-1 hover:bg-gray-600 cursor-pointer rounded-full"
            />
          </div>
        </div>
      </div>
    </li>
  )
}

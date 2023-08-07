import ContainersService from '../services/ContainersService'
import { Link, Navigate } from 'react-router-dom'
import { ContainerInstanceView, Status } from '../utils/types'
import ContainerInstanceItem from '../components/ContainerInstanceItem'
import PATHS from '../router/routes'
import { BackwardIcon } from '@heroicons/react/24/outline'
import { showToastMessage } from '../utils/showToastMessage'
import { useRecoilState } from 'recoil'
import { currentContainerGroup } from '../atoms/containerGroupAtom'
import { RefreshButton } from '../components/RefreshButton'

const ContainerGroupDetails = () => {
  const [currentGroup, setCurrentGroup] = useRecoilState(currentContainerGroup)

  const refreshInstances = async () => {
    let instances: ContainerInstanceView[] = []
    // ci = containerIdentifier
    const ci = currentGroup?.identifier

    if (ci !== undefined && ci !== null && ci !== '') {
      const response = await ContainersService.getContainerInstances(ci)

      if (response.status === Status.Error) {
        showToastMessage(response.message, response.status)
      } else {
        instances = response.data
      }
    } else {
      // If no continerIdentifier provided
      return <Navigate to={PATHS.containerGroups} />
    }

    currentGroup.containerInstances = instances
    setCurrentGroup(currentGroup)
    return null
  }

  if (currentGroup === undefined) {
    return <Navigate to={PATHS.containerGroups} />
  }

  return (
    <div className="px-2 sm:px-6 lg:px-8 dark:text-white">
      <div className="flex items-center">
        <Link className="mr-4" to={PATHS.containerGroups}>
          <BackwardIcon width={'30px'} />
        </Link>
        <RefreshButton
          delay={3000}
          callback={refreshInstances}
          className="ml-4"
          width={30}
        />
      </div>
      <h1 className="text text-4xl font-extrabold my-8">
        Container instances:
        <div className="overflow-x-auto overflow-y-hidden pb-2">
          {currentGroup.name}
        </div>
      </h1>
      <ul className="w-full divide-y divide-gray-100 dark:divide-gray-700 rounded">
        {currentGroup?.containerInstances.map((value, index) => (
          <ContainerInstanceItem
            key={index}
            containerGroup={currentGroup}
            instanceView={value}
          />
        ))}
      </ul>
    </div>
  )
}

export default ContainerGroupDetails

import React, { useState, useEffect } from 'react'
import { Spinner } from 'flowbite-react/lib/esm/components'
import ContainersService from '../services/ContainersService'
import { ContainerGroupItem } from '../components/ContainerGroupItem'
import { DropdownRGS } from '../components/DropdownRGS'
import { currentRGState } from '../atoms/resourceGroupAtom'
import { useRecoilState } from 'recoil'
import { CreateRGModal } from '../components/CreateRGModal'
import { CreateContainerModal } from '../components/CreateContainerModal'
import { RefreshButton } from '../components/RefreshButton'
import { ContainerGroupView, Status } from '../utils/types'
import { showToastMessage } from '../utils/showToastMessage'

const ContainerGroups = () => {
  const [loading, setLoading] = useState(true)
  const [loadedGroups, setLoadedGroups] = useState<ContainerGroupView[]>()
  const [currentRG, setCurrentRG] = useRecoilState(currentRGState)
  let previousClickedRG = ''

  const refreshContainers = () => {
    if (currentRG !== null && currentRG !== undefined) {
      setLoading(true)
      setLoadedGroups([])
      previousClickedRG = currentRG
      loadContainerGroups(currentRG)
    }
  }

  const loadContainerGroups = async (currentRG: string) => {
    const response = await ContainersService.getContainerGroups(currentRG)

    if (response.status === Status.Error) {
      showToastMessage(response.message, Status.Error)
      setLoadedGroups([])
    } else {
      setLoadedGroups(response.data)
    }

    setLoading(false)
  }

  const rgClicked = (rgName: string) => {
    setCurrentRG(rgName)
  }

  useEffect(() => {
    if (
      currentRG !== null &&
      currentRG !== undefined &&
      currentRG !== previousClickedRG
    ) {
      setLoading(true)
      setLoadedGroups([])
      previousClickedRG = currentRG
      loadContainerGroups(currentRG)
    }
  }, [currentRG])

  return (
    <div className="px-2 sm:px-6 lg:px-8 dark:text-white">
      <RefreshButton delay={3000} callback={refreshContainers} width={30} />
      <h1 className="text-4xl font-extrabold my-8">
        Containers
        {currentRG !== '' && ': ' + currentRG}
      </h1>
      <div className="mb-5 flex justify-between items-center flex-wrap gap-4">
        <CreateContainerModal />
        <div className="flex gap-4 flex-wrap">
          <DropdownRGS clickHandler={rgClicked} />
          <CreateRGModal callback={loadContainerGroups} />
        </div>
      </div>
      <ul className="w-full divide-y divide-gray-100 dark:divide-gray-700 rounded">
        {currentRG !== '' && loading && (
          <Spinner aria-label="Loading..." size="xl" />
        )}
        {loadedGroups?.map((value, index) => (
          <ContainerGroupItem
            key={index}
            containerGroup={value}
            refreshContainers={refreshContainers}
          />
        ))}
      </ul>
    </div>
  )
}

export default ContainerGroups

import React, { useEffect, useState } from 'react'
import ResourceGroupsService from '../services/ResourceGroupsService'
import { Spinner } from 'flowbite-react'
import { CreateRGModal } from '../components/CreateRGModal'
import { ResourceGroupItem } from '../components/ResourceGroupItem'
import { RefreshButton } from '../components/RefreshButton'
import { toast } from 'react-hot-toast'
import { showToastMessage } from '../utils/showToastMessage'
import { Status } from '../utils/types'

export const ResourceGroups = () => {
  const [rgs, setRgs] = useState<string[]>()
  const [loading, setLoading] = useState(true)

  const loadRGs = async () => {
    setRgs([])
    setLoading(true)
    const response = await ResourceGroupsService.getResourceGroups()

    if (response.status === Status.Error) {
      showToastMessage(
        'Error getting resource groups: ' + response.message,
        Status.Error
      )
    } else {
      setRgs(response.data)
    }

    setLoading(false)
  }

  const btnDeleteHandler = async (rgName: string) => {
    const loadingToast = showToastMessage(
      'Deleting resource group...',
      Status.Loading
    )
    const apiResponse = await ResourceGroupsService.deleteResourceGroup(rgName)
    toast.dismiss(loadingToast)
    showToastMessage(apiResponse.message, apiResponse.status)
    if (apiResponse.status === Status.Success) {
      loadRGs()
    }
  }

  useEffect(() => {
    loadRGs()
  }, [])

  return (
    <div className="px-2 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold dark:text-white my-8">
        <>
          Resource Groups
          <RefreshButton
            delay={3000}
            callback={loadRGs}
            className="ml-4"
            width={30}
          />
        </>
      </h1>
      <div className="mb-5 flex justify-between items-center flex-wrap gap-4">
        <CreateRGModal callback={loadRGs} />
      </div>
      <ul className="w-full divide-y divide-gray-100 dark:divide-gray-700 rounded">
        {loading && <Spinner aria-label="Loading..." size="xl" />}
        {rgs?.map((value, index) => (
          <ResourceGroupItem
            key={index}
            value={value}
            btnDeleteHandler={btnDeleteHandler}
          />
        ))}
      </ul>
    </div>
  )
}

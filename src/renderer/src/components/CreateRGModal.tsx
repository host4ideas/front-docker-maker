import { useRef, useState } from 'react'
import { Button, Modal, Label, TextInput } from 'flowbite-react'
import ResourceGroupsService from '../services/ResourceGroupsService'
import { DropdownAzureLocations } from './DropdownAzureLocations'
import { PlusIcon } from '@heroicons/react/24/outline'
import { showToastMessage } from '../utils/showToastMessage'
import { Status } from '../utils/types'
import { toast } from 'react-hot-toast'

interface IProps {
  callback?: Function
}

export const CreateRGModal = ({ callback }: IProps) => {
  const [modal, setModal] = useState(false)
  const [location, setLocation] = useState<string>('')
  const refRgName = useRef('')

  const modalToggle = () => {
    setModal(!modal)
  }

  const azureLocationClick = (location: string) => {
    setLocation(location)
  }

  const btnCreate = async () => {
    setModal(false)
    const loadingToast = showToastMessage(
      'Creating resource group...',
      Status.Loading
    )
    const apiResponse = await ResourceGroupsService.createResourceGroup(
      refRgName.current,
      location
    )
    toast.dismiss(loadingToast)
    showToastMessage(apiResponse.message, apiResponse.status)
    if (apiResponse.status === Status.Success && callback !== undefined) {
      callback()
    }
  }

  return (
    <>
      <Button onClick={modalToggle} color="success">
        <PlusIcon width={20} />
      </Button>
      <Modal show={modal} size="md" popup={true} onClose={modalToggle}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create a new Resource Group
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="rgName" value="Resource group name" />
              </div>
              <TextInput
                onChange={(e) => (refRgName.current = e.target.value)}
                id="rgName"
                required={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="location"
                  value={'Select RG location: ' + location}
                />
              </div>
              <DropdownAzureLocations clickHandler={azureLocationClick} />
            </div>
            <div className="w-full">
              <Button onClick={btnCreate}>Create resource group</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

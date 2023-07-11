import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Label,
  ListGroup,
  Modal,
  Select,
  TextInput
} from 'flowbite-react'
import ContainersService from '../services/ContainersService'
import {
  ContainerGroupSku,
  ContainerGroupView,
  ContainerInstanceOperatingSystemType,
  CreateContainerGroup,
  CreateContainerInstance,
  Status
} from '../utils/types'
import { useNavigate } from 'react-router-dom'
import { showToastMessage } from '../utils/showToastMessage'
import { toast } from 'react-hot-toast'
import { ContainerModalInstances } from './ContainerModalInstances'
import { DropdownAzureLocations } from './DropdownAzureLocations'
import PATHS from '../router/routes'
import { useSetRecoilState } from 'recoil'
import { currentContainerGroup } from '../atoms/containerGroupAtom'
import { DropdownRGS } from './DropdownRGS'
import { enumFromStringValue } from '../utils/helpers'
import { TrashIcon } from '@heroicons/react/24/outline'

export const CreateContainerModal = () => {
  const [modal, setModal] = useState(false)
  const [containerInstances, setContainerInstances] = useState<
    CreateContainerInstance[]
  >([])
  const setCurrentContainerGroup = useSetRecoilState(currentContainerGroup)
  const [sku, setSku] = useState<ContainerGroupSku>()
  const [name, setName] = useState<string>('')
  const [osType, setOsType] = useState<ContainerInstanceOperatingSystemType>()
  const [resourceGroupName, setResourceGroupName] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [validateInputs, setValidateInputs] = useState(false)
  const navigate = useNavigate()

  const modalToggle = () => {
    setModal(!modal)
  }

  const handleAzureLocation = (azureLocation: string) => {
    setLocation(azureLocation)
  }

  const handleResourceGroup = (rg: string) => {
    setResourceGroupName(rg)
  }

  const checkInputs = () => {
    let validated = false

    if (
      sku !== undefined &&
      name !== undefined &&
      name !== '' &&
      osType !== undefined &&
      resourceGroupName !== undefined &&
      location !== undefined &&
      containerInstances !== null &&
      containerInstances.length > 0
    ) {
      validated = true
    }

    setValidateInputs(validated)
  }

  useEffect(() => {
    checkInputs()
  }, [sku, name, osType, resourceGroupName, location, containerInstances])

  const handleSubmit = async () => {
    if (
      location === '' ||
      resourceGroupName === '' ||
      name === '' ||
      location === undefined ||
      resourceGroupName === undefined ||
      name === undefined ||
      osType === undefined ||
      sku === undefined ||
      containerInstances === null ||
      containerInstances.length === 0
    ) {
      showToastMessage('Invalid property/ies', Status.Error)
      return
    }

    const loadingToastId = showToastMessage(
      'Creating container group...',
      Status.Loading
    )

    const containerGroup: CreateContainerGroup = {
      sku,
      location,
      containers: containerInstances, // Cannot be empty
      name,
      osType,
      resourceGroupName
    }

    const response = await ContainersService.createContainerGroup(
      containerGroup
    )

    toast.dismiss(loadingToastId)

    if (response.status === Status.Error) {
      showToastMessage(response.message, Status.Error)
    } else {
      if (response.data !== undefined) {
        const createdContainer: ContainerGroupView = response.data
        setCurrentContainerGroup(createdContainer)
        navigate(PATHS.containerDetails)
      }
    }
  }

  return (
    <>
      <Button onClick={modalToggle} color="success">
        New container group
      </Button>
      <Modal
        className="overflow-y-hidden"
        show={modal}
        size="4xl"
        popup={true}
        onClose={modalToggle}
      >
        <Modal.Header>
          <p className="m-2 text-xl font-medium text-gray-900 dark:text-white">
            Create a new container group
          </p>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: '460px' }} className="px-4 overflow-y-auto">
            <div className="flex flex-wrap gap-10 justify-center">
              <div style={{ width: '300px' }}>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  Container group details
                </h4>
                <div className="my-3">
                  <div className="mb-2 block">
                    <Label htmlFor="container-name" value="Container name" />
                  </div>
                  <TextInput
                    id="container-name"
                    required={true}
                    onInput={(event) => setName(event.currentTarget.value)}
                  />
                </div>
                <div className="my-3">
                  <div className="mb-2 block">
                    <Label htmlFor="sku" value="SKU" />
                  </div>
                  <Select
                    id="sku"
                    required={true}
                    onInput={(event) =>
                      setSku(
                        enumFromStringValue(
                          ContainerGroupSku,
                          event.currentTarget.value
                        )
                      )
                    }
                  >
                    <option>Select a SKU</option>
                    <option value={ContainerGroupSku.Standard}>Standard</option>
                    <option value={ContainerGroupSku.Dedicated}>
                      Dedicated
                    </option>
                    <option value={ContainerGroupSku.Confidential}>
                      Confidential
                    </option>
                  </Select>
                </div>
                <div className="my-3">
                  <div className="mb-2 block">
                    <Label htmlFor="osType" value="OS Type" />
                  </div>
                  <Select
                    id="osType"
                    required={true}
                    onInput={(event) =>
                      setOsType(
                        enumFromStringValue(
                          ContainerInstanceOperatingSystemType,
                          event.currentTarget.value
                        )
                      )
                    }
                  >
                    <option>Select an OS</option>
                    <option value={ContainerInstanceOperatingSystemType.Linux}>
                      {ContainerInstanceOperatingSystemType.Linux}
                    </option>
                    <option
                      value={ContainerInstanceOperatingSystemType.Windows}
                    >
                      {ContainerInstanceOperatingSystemType.Windows}
                    </option>
                  </Select>
                </div>
                <div className="my-3">
                  <div className="mb-2 block">
                    <Label value={'Resource group: ' + resourceGroupName} />
                  </div>
                  <DropdownRGS clickHandler={handleResourceGroup} />
                </div>
                <div className="my-3">
                  <div className="mb-2 block">
                    <Label value={'Availability-zone: ' + location} />
                  </div>
                  <DropdownAzureLocations clickHandler={handleAzureLocation} />
                </div>
                <div className="my-3">
                  <div className="mb-2 block">
                    <Label
                      value="Container instances:"
                      style={{ fontWeight: 600 }}
                    />
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {containerInstances?.map((instance, index) => (
                      <Card key={index} className="max-w-xs mr-3">
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          <p>Instance: {instance.name}</p>
                        </h5>
                        <div className="font-normal text-gray-700 dark:text-gray-400">
                          <p>Image: {instance.image}</p>
                          <p>CPU: {instance.cpu}</p>
                          <p>Memory (GB): {instance.memoryInGB}</p>
                          <p>Ports:</p>
                          <ListGroup>
                            {instance.ports.map((port, index) => (
                              <li
                                className="flex justify-between items-center px-2 py-1"
                                key={index}
                              >
                                <p>Port: {port.port}</p>
                                <p>Protocol: {port.protocol}</p>
                              </li>
                            ))}
                          </ListGroup>
                        </div>
                        <Button
                          color="light"
                          onClick={() => instance.removeInstance()}
                        >
                          <TrashIcon color="red" width={'20px'} />
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ width: '300px' }}>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  Add container instances (required)
                </h4>
                <div className="my-3">
                  <ContainerModalInstances
                    setContainerInstances={setContainerInstances}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <div className="flex justify-center items-center pb-4">
          <Button
            style={{
              visibility: validateInputs === true ? 'visible' : 'hidden'
            }}
            disabled={!validateInputs}
            onClick={handleSubmit}
          >
            Create container group
          </Button>
        </div>
      </Modal>
    </>
  )
}

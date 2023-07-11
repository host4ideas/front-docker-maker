import React, { useEffect, useRef, useState } from 'react'
import { CreateModalRegistriesSelect } from './CreateModalRegistriesSelect'
import { CreateModalReposSelect } from './CreateModalReposSelect'
import { ContainerPort, CreateContainerInstance } from '../utils/types'
import { Button, Label, Select, TextInput } from 'flowbite-react'
import { ContainerInstancePorts } from './ContainerInstancePorts'
import { removeArrayItem } from '../utils/helpers'
import RegistriesService from '../services/RegistriesService'

interface IProps {
  setContainerInstances: React.Dispatch<
    React.SetStateAction<CreateContainerInstance[]>
  >
}

export const ContainerModalInstances = ({ setContainerInstances }: IProps) => {
  const [loginUrl, setLoginUrl] = useState<string>()
  const [selectedRepoUrl, setSelectedRepoUrl] = useState<string>()
  const [repoTags, setRepoTags] = useState<string[]>()
  const [selectedRepoTag, setSelectedRepoTag] = useState<string>()
  const [instancePorts, setInstancePorts] = useState<ContainerPort[]>([])
  const [instanceName, setInstanceName] = useState<string>()
  const [cpuCount, setCpuCount] = useState<number>(0)
  const [memoryCount, setMemoryCount] = useState<number>(0)
  const [validInputs, setValidInputs] = useState(false)
  const [localContainerInstances, setLocalContainerInstances] = useState<
    CreateContainerInstance[]
  >([])
  const repoTagUrl = useRef('')

  const validateInputs = () => {
    let validations = false

    // If any is undefined
    if (
      ![
        loginUrl,
        selectedRepoUrl,
        instanceName,
        cpuCount,
        memoryCount,
        selectedRepoTag
      ].includes(undefined)
    ) {
      validations = true
      // If all are valid
    } else if (
      cpuCount !== undefined &&
      memoryCount !== undefined &&
      !isNaN(cpuCount) &&
      !isNaN(cpuCount) &&
      cpuCount > 0 &&
      memoryCount > 0 &&
      loginUrl !== '' &&
      instanceName !== '' &&
      instanceName !== undefined
    ) {
      validations = true
    }

    setValidInputs(validations)
  }

  const loadRepoTags = async () => {
    if (
      selectedRepoUrl !== undefined &&
      selectedRepoUrl !== '' &&
      loginUrl !== undefined &&
      loginUrl !== ''
    ) {
      setRepoTags(
        await RegistriesService.getRegistryRepoVersion(selectedRepoUrl)
      )
    }
  }

  useEffect(() => {
    validateInputs()
  }, [loginUrl, selectedRepoUrl, instanceName, cpuCount, memoryCount])

  useEffect(() => {
    if (selectedRepoUrl !== undefined && selectedRepoUrl !== '') {
      repoTagUrl.current = selectedRepoUrl + ':' + 'latest'
      loadRepoTags()
    }
  }, [selectedRepoUrl])

  useEffect(() => {
    if (
      selectedRepoUrl !== undefined &&
      selectedRepoUrl !== '' &&
      selectedRepoTag !== undefined &&
      selectedRepoTag !== ''
    ) {
      repoTagUrl.current = selectedRepoUrl + ':' + selectedRepoTag
    }
  }, [selectedRepoTag])

  /**
   * If inputs are valid add the instance to the list of instances
   * for this container group
   */
  const addContainerInstance = () => {
    validateInputs()

    // Type safe check
    if (
      validInputs === true &&
      selectedRepoUrl !== undefined &&
      instanceName !== undefined
    ) {
      const newContainerInstance: CreateContainerInstance = {
        image: selectedRepoUrl,
        cpu: cpuCount,
        memoryInGB: memoryCount,
        name: instanceName,
        ports: instancePorts,
        removeInstance: () => removeContainerInstance(newContainerInstance)
      }

      // Duplicates check function
      const checkInstance = (obj: CreateContainerInstance) =>
        obj.image === newContainerInstance.image &&
        obj.cpu === newContainerInstance.cpu &&
        obj.memoryInGB === newContainerInstance.memoryInGB &&
        obj.name === newContainerInstance.name

      // Check duplicates
      if (!localContainerInstances.some(checkInstance)) {
        const newArr = [...localContainerInstances, newContainerInstance]
        setContainerInstances([...newArr])
        setLocalContainerInstances([...newArr])
      }
    }
  }

  const removeContainerInstance = (instance: CreateContainerInstance) => {
    const sliced = removeArrayItem<CreateContainerInstance>(
      localContainerInstances,
      instance
    )
    setContainerInstances([...sliced])
    setLocalContainerInstances([...sliced])
  }

  return (
    <>
      <CreateModalRegistriesSelect setLoginUrl={setLoginUrl} />
      {loginUrl !== undefined ? (
        <>
          <div className="my-3">
            <div className="mb-2 block">
              <Label value="Repositories (container images)" />
            </div>
            <CreateModalReposSelect
              setSelectedRepoUrl={setSelectedRepoUrl}
              loginUrl={loginUrl}
            />
            {selectedRepoUrl && (
              <Select
                required={true}
                onInput={(event) =>
                  setSelectedRepoTag(event.currentTarget.value)
                }
              >
                <option>Select a Tag (default latest)</option>
                {repoTags?.map((tag, index) => (
                  <option key={index} value={index}>
                    {tag}
                  </option>
                ))}
              </Select>
            )}
          </div>
          {selectedRepoUrl !== undefined ? (
            <div className="my-3">
              <div className="mb-2 block">
                <Label htmlFor="instance-name" value="Instance name" />
              </div>
              <TextInput
                id="instance-name"
                required={true}
                onInput={(event) => setInstanceName(event.currentTarget.value)}
              />
              <div className="my-2 block">
                <Label htmlFor="cpu-count" value="CPU Count" />
              </div>
              <TextInput
                id="cpu-count"
                required={true}
                onInput={(event) =>
                  setCpuCount(parseInt(event.currentTarget.value))
                }
              />
              <div className="my-2 block">
                <Label htmlFor="memory-count" value="Memory (GB)" />
              </div>
              <TextInput
                id="memory-count"
                required={true}
                onInput={(event) =>
                  setMemoryCount(parseFloat(event.currentTarget.value))
                }
              />
              <ContainerInstancePorts setInstancePorts={setInstancePorts} />
            </div>
          ) : (
            <p className="text-lg font-normal text-gray-700 dark:text-gray-400">
              Select a repository first
            </p>
          )}
          {validInputs && (
            <Button
              color="success"
              className="m-auto"
              disabled={!validInputs}
              onClick={addContainerInstance}
            >
              Add container
            </Button>
          )}
        </>
      ) : (
        <p className="text-lg font-normal text-gray-700 dark:text-gray-400">
          Select a registry first
        </p>
      )}
    </>
  )
}

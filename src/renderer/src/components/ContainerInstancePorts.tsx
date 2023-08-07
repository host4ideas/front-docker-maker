import { Button, Label, ListGroup, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { ContainerNetworkProtocol, ContainerPort } from '../utils/types'
import { enumFromStringValue, removeArrayItem } from '../utils/helpers'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

interface IProps {
  setInstancePorts: React.Dispatch<React.SetStateAction<ContainerPort[]>>
}

export const ContainerInstancePorts = ({ setInstancePorts }: IProps) => {
  const [port, setPort] = useState<number>()
  const [protocol, setProtocol] = useState<ContainerNetworkProtocol>()
  const [validInputs, setValidInputs] = useState(false)
  const [localPorts, setLocalPorts] = useState<ContainerPort[]>([])

  const removePort = (port: ContainerPort) => {
    const sliced = removeArrayItem<ContainerPort>(localPorts, port)
    setLocalPorts([...sliced])
    setInstancePorts([...sliced])
  }

  const validateInputs = () => {
    let validated = false

    if (
      protocol !== undefined &&
      port !== undefined &&
      !isNaN(port) &&
      port > 0
    ) {
      validated = true
    }

    setValidInputs(validated)
  }

  useEffect(() => {
    validateInputs()
  }, [port, protocol])

  const addPort = () => {
    validateInputs()

    if (validInputs === true && port !== undefined && protocol !== undefined) {
      const newPort: ContainerPort = {
        port,
        protocol
      }

      // Duplicates check function
      const checkPort = (obj: ContainerPort) =>
        obj.port === newPort.port && obj.protocol === newPort.protocol

      // Check duplicates
      if (!localPorts.some(checkPort)) {
        setLocalPorts([...localPorts, newPort])
        setInstancePorts([...localPorts, newPort])
      }
    }
  }

  return (
    <div className="my-3">
      <Label style={{ fontWeight: 600 }} value="Port mapping (optional)" />
      <div className="my-2 block">
        <Label htmlFor="port" value="Port" />
      </div>
      <TextInput
        id="port"
        required={true}
        onInput={(event) => setPort(parseInt(event.currentTarget.value))}
      />
      <div className="my-2 block">
        <Label htmlFor="protocol" value="Protocol" />
      </div>
      <Select
        id="protocol"
        required={true}
        onInput={(event) => {
          setProtocol(
            enumFromStringValue(
              ContainerNetworkProtocol,
              event.currentTarget.value
            )
          )
        }}
      >
        <option>Select a port</option>
        <option value={ContainerNetworkProtocol.TCP}>TCP</option>
        <option value={ContainerNetworkProtocol.UDP}>UDP</option>
      </Select>
      {validInputs && (
        <Button
          color="success"
          className="my-2 m-auto"
          disabled={!validInputs}
          onClick={addPort}
        >
          <PlusIcon width={'20px'} />
        </Button>
      )}
      <Label style={{ fontWeight: 600 }} value="Added ports" />
      {
        <ListGroup className="my-2">
          {localPorts?.map((port, index) => (
            <li
              className="flex justify-between items-center px-2 py-1"
              key={index}
            >
              <p>Port: {port.port}</p>
              <p>Protocol: {port.protocol}</p>
              <Button color="light" onClick={() => removePort(port)}>
                <TrashIcon color="red" width={'20px'} />
              </Button>
            </li>
          ))}
        </ListGroup>
      }
    </div>
  )
}

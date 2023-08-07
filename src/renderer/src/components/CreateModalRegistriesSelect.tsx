import React, { useEffect, useState } from 'react'
import { Label, Select, Spinner } from 'flowbite-react'
import RegistriesService from '../services/RegistriesService'
import { RegistryView } from '../utils/types'

interface IProps {
  setLoginUrl: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const CreateModalRegistriesSelect = ({ setLoginUrl }: IProps) => {
  const [registries, setRegistries] = useState<RegistryView[]>()

  const loadRegistries = async () => {
    setRegistries(await RegistriesService.getRegistries())
  }

  useEffect(() => {
    loadRegistries()
  }, [])

  if (registries === undefined) {
    return <Spinner />
  } else {
    return (
      <div className="my-3">
        <div className="mb-2 block">
          <Label value="Registries" />
        </div>
        <Select
          required={true}
          onInput={(event) => {
            const checkUsername = (registry: RegistryView) =>
              registry.loginUrl === event.currentTarget.value

            if (registries.some(checkUsername)) {
              setLoginUrl(event.currentTarget.value)
            }
          }}
        >
          <option>Select a registry</option>
          {registries?.map((registry, index) => (
            <option key={index} value={registry.loginUrl}>
              {registry.name}
            </option>
          ))}
        </Select>
      </div>
    )
  }
}

import React, { useEffect, useState } from 'react'
import RegistriesService from '../services/RegistriesService'
import { RegistryView } from '../utils/types'
import { Spinner } from 'flowbite-react'
import { RegistryItem } from '../components/RegistryItem'
import { RefreshButton } from '../components/RefreshButton'

export const ContainerRegistries = () => {
  const [loading, setLoading] = useState(true)
  const [registries, setRegistries] = useState<RegistryView[]>()

  const getContainerRegistries = async () => {
    setRegistries([])
    setLoading(true)
    console.error(await RegistriesService.getRegistries())
    setRegistries(await RegistriesService.getRegistries())
    setLoading(false)
  }

  useEffect(() => {
    getContainerRegistries()
  }, [])

  return (
    <div className="px-2 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold dark:text-white my-8">
        Azure Container Registries
        <RefreshButton
          delay={3000}
          callback={getContainerRegistries}
          className="ml-4"
          width={30}
        />
      </h1>
      <ul className="w-full divide-y divide-gray-100 dark:divide-gray-700 rounded">
        {loading === true ? (
          <Spinner aria-label="Loading..." size="xl" />
        ) : (
          registries?.map((registry, index) => (
            <RegistryItem key={index} registry={registry} />
          ))
        )}
      </ul>
    </div>
  )
}

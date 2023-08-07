import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import RegistriesService from '../services/RegistriesService'
import { Spinner } from 'flowbite-react'
import { RepositoryItem } from '../components/RepositoryItem'
import { RepoImage } from '../utils/types'

export const RegistryRepos = () => {
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const [repositories, setRepositories] = useState<RepoImage[]>()

  const loginUrl = useRef(searchParams.get('lu'))
  const registryName = useRef(searchParams.get('rn'))

  const getRegistryRepos = async () => {
    setLoading(true)
    if (loginUrl.current !== null) {
      setRepositories(
        await RegistriesService.getRegistryRepos(loginUrl.current)
      )
    }
    setLoading(false)
  }

  useEffect(() => {
    getRegistryRepos()
  }, [])

  return (
    <div className="px-2 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold dark:text-white my-8">
        Registry {registryName.current} Repositories
      </h1>
      <ul className="w-full divide-y divide-gray-100 dark:divide-gray-700 rounded">
        {loading && <Spinner aria-label="Loading..." size="xl" />}
        {repositories?.map((repository, index) => (
          <RepositoryItem
            key={index}
            repoName={repository.name}
            loginUrl={loginUrl.current ?? ''}
          />
        ))}
      </ul>
    </div>
  )
}

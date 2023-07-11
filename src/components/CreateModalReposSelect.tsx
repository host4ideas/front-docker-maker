import { Select, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import RegistriesService from '../services/RegistriesService'
import { RepoImage } from '../utils/types'

interface IProps {
  loginUrl: string
  setSelectedRepoUrl: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const CreateModalReposSelect = ({
  setSelectedRepoUrl,
  loginUrl
}: IProps) => {
  const [repos, setRepos] = useState<RepoImage[]>()

  const loadRegistryRepos = async () => {
    const reposData = await RegistriesService.getRegistryRepos(loginUrl)
    setRepos(reposData)
  }

  useEffect(() => {
    loadRegistryRepos()
  }, [])

  if (repos === undefined) {
    return <Spinner />
  } else {
    return (
      <Select
        required={true}
        onInput={(event) => {
          setSelectedRepoUrl(event.currentTarget.value)
        }}
      >
        <option>Select a repository</option>
        {repos?.map((repo, index) => (
          <option key={index} value={repo.url}>
            {repo.name}
          </option>
        ))}
      </Select>
    )
  }
}

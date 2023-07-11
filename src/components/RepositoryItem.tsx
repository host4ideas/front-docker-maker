import React from 'react'
import { ArchiveBoxIcon, TrashIcon } from '@heroicons/react/24/outline'
import RegistriesService from '../services/RegistriesService'

interface IProps {
  repoName: string
  loginUrl: string
}

export const RepositoryItem = ({ repoName, loginUrl }: IProps) => {
  return (
    <li className="pb-3 sm:pb-4 max-w-4xl text-gray-900 dark:text-white">
      <div className="flex items-center flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <ArchiveBoxIcon width={'30px'} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {repoName}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <TrashIcon
              onClick={() => {
                RegistriesService.deleteRegistryRepo(loginUrl, repoName)
              }}
              width={'35px'}
              className="m-1 p-1 hover:bg-gray-600 cursor-pointer rounded-full"
            />
          </div>
        </div>
      </div>
    </li>
  )
}

import React from 'react'
import {
  ArchiveBoxIcon,
  MagnifyingGlassCircleIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import PATHS from '../router/routes'
import { RegistryView } from '../utils/types'

interface IProps {
  registry: RegistryView
}

export const RegistryItem = ({ registry }: IProps) => {
  return (
    <li className="pb-3 sm:pb-4 max-w-4xl text-gray-900 dark:text-white">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <ArchiveBoxIcon width={30} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{registry.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to={
              PATHS.registryRepos +
              '/?lu=' +
              registry.loginUrl +
              '&rn=' +
              registry.name
            }
            className="text-gray-900 dark:text-white"
          >
            <MagnifyingGlassCircleIcon
              width={'30px'}
              className="m-1 hover:bg-gray-600 cursor-pointer rounded-full"
            />
          </Link>
        </div>
      </div>
    </li>
  )
}

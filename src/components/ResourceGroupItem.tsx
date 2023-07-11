import React from 'react'
import {
  ArchiveBoxIcon,
  MagnifyingGlassCircleIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { useSetRecoilState } from 'recoil'
import { currentRGState } from '../atoms/resourceGroupAtom'
import { useNavigate } from 'react-router-dom'
import PATHS from '../router/routes'

interface IProps {
  value: string
  btnDeleteHandler(value: string): void
}

export const ResourceGroupItem = ({ value, btnDeleteHandler }: IProps) => {
  const setCurrentRG = useSetRecoilState(currentRGState)
  const navigate = useNavigate()

  const handleClickRG = (rgName: string) => {
    setCurrentRG(rgName)
    return navigate(PATHS.containerGroups)
  }

  return (
    <li className="pb-3 sm:pb-4 max-w-4xl text-gray-900 dark:text-white">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-4">
          <ArchiveBoxIcon width={'30px'} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div
            onClick={() => handleClickRG(value)}
            className="text-gray-900 dark:text-white cursor-pointer"
          >
            <MagnifyingGlassCircleIcon
              width={'30px'}
              className="m-1 hover:bg-gray-600 cursor-pointer rounded-full"
            />
          </div>
          <div>
            <TrashIcon
              onClick={() => btnDeleteHandler(value)}
              width={'35px'}
              className="m-1 p-1 hover:bg-gray-600 cursor-pointer rounded-full"
            />
          </div>
        </div>
      </div>
    </li>
  )
}

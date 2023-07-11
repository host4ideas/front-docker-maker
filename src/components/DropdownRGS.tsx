import React, { useEffect, useState } from 'react'
import { Dropdown, Spinner } from 'flowbite-react'
import ResourceGroupsService from '../services/ResourceGroupsService'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Status } from '../utils/types'
import { showToastMessage } from '../utils/showToastMessage'

interface IProps {
  clickHandler(rgName: string): void
}

export const DropdownRGS = ({ clickHandler }: IProps) => {
  const [rgs, setRgs] = useState<string[]>()
  const [loading, setLoading] = useState(true)
  const [disabledRefresh, setDisabledRefresh] = useState(false)

  const handleRefreshRGs = (event: any) => {
    event.preventDefault()
    event.stopPropagation()

    if (!disabledRefresh) {
      setDisabledRefresh(true)
      loadRGs()
      setTimeout(() => {
        setDisabledRefresh(false)
      }, 3000)
    }
  }

  const loadRGs = async () => {
    setLoading(true)
    const response = await ResourceGroupsService.getResourceGroups()

    if (response.status === Status.Error) {
      showToastMessage(response.message, Status.Error)
    } else {
      setRgs(response.data)
    }

    setLoading(false)
  }

  useEffect(() => {
    loadRGs()
  }, [])

  return (
    <div className="flex items-center gap-4">
      <Dropdown
        className="max-h-60 overflow-y-auto"
        onClick={(event) => {
          if (disabledRefresh) event.preventDefault()
        }}
        label={
          loading ? (
            <Spinner color="failure" aria-label="Loading..." />
          ) : (
            'Resource groups'
          )
        }
        size="sm"
      >
        <Dropdown.Item className="flex justify-between">
          <div
            title="Refresh resource groups"
            className={
              'flex justify-between w-full ' +
              (disabledRefresh && 'cursor-progress')
            }
            onClick={handleRefreshRGs}
          >
            <span>Refresh</span> <ArrowPathIcon width={20} className="inline" />
          </div>
        </Dropdown.Item>
        <Dropdown.Divider />
        {rgs?.map((rgName, index) => (
          <Dropdown.Item
            onClick={() => {
              if (rgs.includes(rgName)) {
                clickHandler(rgName)
              }
            }}
            key={index}
          >
            {rgName}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  )
}

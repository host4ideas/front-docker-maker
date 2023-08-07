
import { Dropdown } from 'flowbite-react'
import CONSTS from '../utils/consts'

interface IProps {
  clickHandler(region: string): void
}

export const DropdownAzureLocations = ({ clickHandler }: IProps) => {
  return (
    <div className="flex items-center gap-4">
      <Dropdown
        className="overflow-y-auto max-h-64"
        label={'Availability zones'}
        size="sm"
      >
        {CONSTS.AVAILABLE_REGIONS?.map((region, index) => (
          <Dropdown.Item
            onClick={() => {
              if (CONSTS.AVAILABLE_REGIONS.includes(region)) {
                clickHandler(region)
              }
            }}
            key={index}
          >
            {region}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  )
}

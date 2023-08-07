import { ContainerGroupView, ContainerInstanceView } from '../utils/types'
import { InstanceCommand } from './InstanceCommand'

interface IProps {
  instanceView: ContainerInstanceView
  containerGroup: ContainerGroupView
}

const ContainerInstanceItem = ({ instanceView, containerGroup }: IProps) => {
  return (
    <li className="pb-3 sm:pb-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width={'30px'}
            className="pt-3"
          >
            <path d="M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2z" />
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 7.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zM7 11a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0 mt-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {instanceView.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {instanceView.image}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {containerGroup.state.toLowerCase() !== 'terminated' &&
              containerGroup.state.toLowerCase() !== 'stopped' && (
                <InstanceCommand
                  containerIdentifier={containerGroup.identifier}
                  instanceName={instanceView.name}
                />
              )}
          </p>
        </div>
        <div className="flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
      </div>
    </li>
  )
}

export default ContainerInstanceItem

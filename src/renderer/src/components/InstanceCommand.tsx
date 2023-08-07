import { useRef, useState } from 'react'
import { Button, Label, Modal, Spinner, Textarea } from 'flowbite-react'
import ContainersService from '../services/ContainersService'
import {
  ApiResponse,
  ExecResult,
  InstanceCommandModel,
  Status
} from '../utils/types'
import { showToastMessage } from '../utils/showToastMessage'
import { toast } from 'react-hot-toast'

interface IProps {
  containerIdentifier: string
  instanceName: string
}

export const InstanceCommand = ({
  containerIdentifier,
  instanceName
}: IProps) => {
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const command = useRef<string>()

  const modalToggle = () => {
    setModal(!modal)
  }

  const submitCommand = async () => {
    setLoading(true)
    let response: ApiResponse | null = null

    // Check inputs
    if (command.current !== undefined && command.current !== '') {
      const model: InstanceCommandModel = {
        containerIdentifier,
        instanceName,
        command: command.current!
      }
      // Show loading toast
      const loadingToast = showToastMessage(
        'Executing command...',
        Status.Loading
      )
      // Execute command
      response = await ContainersService.executeInstanceCommand(model)
      // Dismiss loading toast
      toast.dismiss(loadingToast)
      // Erorr handling
      if (response.status === Status.Error) {
        showToastMessage(response.message, Status.Error)
        setError(response.message)
      }
    } else {
      setError('Undefined command')
    }

    if (response !== null && response.data !== undefined) {
      showToastMessage('Command executed', Status.Success)

      const execResult: ExecResult = response.data
      const webSocket = new WebSocket(execResult.webSocketUri)

      webSocket.onmessage = (event) => {
        console.log(event.data)
      }

      console.log(response.data)
    }

    setLoading(false)
  }

  return (
    <>
      <button
        type="button"
        className="m-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={modalToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </button>
      <Modal show={modal} size="6xl" popup={true} onClose={modalToggle}>
        <Modal.Header />
        <Modal.Body>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Execute command
          </h3>
          <div className="mt-5 mb-2 block">
            <Label htmlFor="command" value="Command to execute" />
          </div>
          <code lang="bash">
            <Textarea
              id="command"
              required={true}
              rows={4}
              className="border-2 dark:border-purple-200"
              onInput={(event) => {
                command.current = event.currentTarget.value
                setError(undefined)
              }}
            />
          </code>
        </Modal.Body>
        <Modal.Footer className="flex-col">
          {error !== undefined && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error!</span> {error}
            </div>
          )}
          <Button
            disabled={loading}
            onClick={submitCommand}
            outline={true}
            gradientDuoTone="purpleToBlue"
          >
            {loading ? <Spinner size={'s'} /> : 'Execute command'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

import { useState } from 'react'
import { Capacitor } from '@capacitor/core'
import { Button, Modal } from 'flowbite-react'
import {
  ArrowDownTrayIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export const InstallApp = () => {
  const [openModal, setOpenModal] = useState<string | undefined>()

  return (
    <>
      <Button onClick={() => setOpenModal('pop-up')} color="light">
        <ArrowDownTrayIcon width={20} />
      </Button>
      <Modal
        show={openModal === 'pop-up'}
        size="md"
        popup
        dismissible
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <ArrowDownTrayIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="my-4 text-lg font-normal text-gray-500 dark:text-gray-400">
              Download the
              {!window.electron && ' Android '}
              {!window.electron && !Capacitor.isNativePlatform() && ' or '}
              {!Capacitor.isNativePlatform() && ' Windows '}
              App
            </h3>
            <div className="flex justify-center gap-4">
              {!Capacitor.isNativePlatform() && (
                <Link to="https://dockermakerapps.blob.core.windows.net/dockermaker-android/app-debug.apk">
                  <Button
                    color="success"
                    onClick={() => setOpenModal(undefined)}
                  >
                    <DevicePhoneMobileIcon className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-200" />
                  </Button>
                </Link>
              )}
              {!window.electron && (
                <Link to="https://dockermakerapps.blob.core.windows.net/dockermaker-win/dockermaker-1.0.0-setup.exe">
                  <Button
                    color="success"
                    onClick={() => setOpenModal(undefined)}
                  >
                    <ComputerDesktopIcon className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-200" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <small className="text-gray-400">
            * Android: You&apos;ll need to allow unknown sources
          </small>
        </Modal.Footer>
      </Modal>
    </>
  )
}

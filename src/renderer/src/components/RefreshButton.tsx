import { useState } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

interface IProps {
  callback: Function
  delay: number
  className?: string
  width: number
}

export const RefreshButton = ({
  callback,
  delay,
  className,
  width
}: IProps) => {
  const [disabledRefresh, setDisabledRefresh] = useState(false)

  const delayedCallback = () => {
    if (!disabledRefresh) {
      setDisabledRefresh(true)
      callback()
      setTimeout(() => {
        setDisabledRefresh(false)
      }, delay)
    }
  }

  return (
    <ArrowPathIcon
      width={width}
      aria-disabled={disabledRefresh}
      className={
        className +
        ' inline ' +
        (disabledRefresh === true ? 'cursor-progress' : 'cursor-pointer')
      }
      onClick={delayedCallback}
    />
  )
}

import { Status } from './types'
import { toast } from 'react-hot-toast'

export const showToastMessage = (
  message: string,
  type: Status,
  duration?: number
): string | undefined => {
  switch (type) {
    case Status.Success:
      return toast.success(message, {
        duration: duration ?? 3000
      })

    case Status.Loading:
      return toast.loading(message)

    case Status.Error:
      return toast.error(message, {
        duration: duration ?? 3000
      })
  }
}

import { toast } from "sonner"

interface NotificationProps {
  message: string
  description?: string
}

export const useThemedNotification = () => {
  const notifySuccess = ({ message, description }: NotificationProps) => {
    toast.success(description ? `${message}\n${description}` : message)
  }

  const notifyError = ({ message, description }: NotificationProps) => {
    toast.error(description ? `${message}\n${description}` : message)
  }

  return {
    notifySuccess,
    notifyError,
  }
}

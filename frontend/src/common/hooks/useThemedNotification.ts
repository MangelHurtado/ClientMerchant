"use client"

import { notification } from "antd"
import type { NotificationArgsProps } from "antd"
import { useTheme } from "@/common/context/ThemeContext"

type NotificationConfig = Omit<NotificationArgsProps, "className"> & {
  message: string
  description?: string
}

export const useThemedNotification = () => {
  const { darkMode } = useTheme()

  const getNotificationConfig = (
    config: NotificationConfig
  ): NotificationArgsProps => ({
    ...config,
    className: darkMode ? "dark-notification" : undefined,
    placement: "top",
    duration: 3,
  })

  const notifySuccess = (config: NotificationConfig) => {
    notification.success(getNotificationConfig(config))
  }

  const notifyError = (config: NotificationConfig) => {
    notification.error(getNotificationConfig(config))
  }

  return {
    notifySuccess,
    notifyError,
  }
}

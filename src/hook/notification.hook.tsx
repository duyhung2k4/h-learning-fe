import { notifications } from "@mantine/notifications";
import React from "react";

export const useNotification = () => {
  return {
    success: (message: string | React.ReactNode) => notifications.show({
      title: "Thành công!",
      message: message,
      color: "green",
      position: "top-right",
    }),
    error: (message: string | React.ReactNode) => notifications.show({
      title: "Lỗi!",
      message: message,
      color: "red",
      position: "top-right",
    }),
    warning: (message: string | React.ReactNode) => notifications.show({
      title: "Cảnh báo!",
      message: message,
      color: "yellow",
      position: "top-right",
    }),
  }
}
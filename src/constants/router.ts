import {
  Icon,
  IconBrandDatabricks,
  IconHome,
  IconProps,
  IconSearch,
  IconUser,
} from "@tabler/icons-react"

export type ObjectRouter = {
  href: string
  name?: string
  type: "public" | "protected"
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
}

export type FieldRouter =
  | "LOGIN"
  | "REGISTER"
  | "ACCEPT_CODE"
  | "HOME"
  | "MY_COURSE"
  | "DETAIL_COURSE"
  | "COURSE_LEARNING"
  | "LESSION_LEARNING"
  | "FILTER_COURSE"
  | "ACCOUNT"
export const ROUTER: Record<FieldRouter, ObjectRouter> = {
  LOGIN: {
    href: "/login",
    type: "public",
    name: "Đăng nhập",
  },
  REGISTER: {
    href: "/register",
    type: "public",
    name: "Đăng kí",
  },
  ACCEPT_CODE: {
    href: "/accept-code",
    type: "public",
    name: "Xác nhận otp",
  },
  HOME: {
    href: "/",
    type: "public",
    name: "Trang chủ",
    icon: IconHome
  },
  MY_COURSE: {
    href: "/my-course",
    type: "public",
    name: "Khóa học",
    icon: IconBrandDatabricks,
  },
  DETAIL_COURSE: {
    href: "/detail-course",
    type: "public",
    name: "Chi tiết khóa học",
  },
  COURSE_LEARNING: {
    href: "/course-learning",
    type: "public",
    name: "Chi tiết khóa học",
  },
  LESSION_LEARNING: {
    href: "/lession-learning",
    type: "public",
    name: "Chi tiết bài học",
  },
  FILTER_COURSE: {
    href: "/filter-course",
    type: "protected",
    name: "Tìm kiếm",
    icon: IconSearch,
  },
  ACCOUNT: {
    href: "/account",
    type: "protected",
    name: "Tài khoản",
    icon: IconUser,
  }
}
import { 
    Icon,
    IconProps,
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
        href: "/home",
        type: "public",
        name: "Trang chủ",
    }
}
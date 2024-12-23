

export type AuthResponse = {
    accessToken: string
    refreshToken: string
    profile: any
}

export type RegisterResponse = {
    token: string
}

export type SendFileAuthResponse = {
    data: string
}
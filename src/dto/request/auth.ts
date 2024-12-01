export type LoginRequest = {
    username: string
    password: string
}

export type RegisterRequest = {
    profileId: number
}

export type SendFileAuthRequest = {
    data: string
    profileId: number
    uuid: string
}

export type FaceLoginRequest = {
    data: string
}

export type SaveProcessRequest = {
    profileId: number
}
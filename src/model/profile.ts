import { BaseModel } from "./base";
import { RoomModel } from "./room";

export type ProfileModel = BaseModel & {
    firstName: string
    lastName: string
    phone: string
    email: string
    address: string
    gender?: "male" | "female"
    username: string
    password: string
    role: "admin" | "user" | "clin" | "spec"
    active: boolean
    avatar: number[][]
    roomId?: number

    room?: RoomModel

    // Faces []Face `json:"faces" gorm:"foreignKey:ProfileId"`
}
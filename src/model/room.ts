import { BaseModel } from "./base";
import { DepartmentModel } from "./department";
import { ProfileModel } from "./profile";

export type RoomModel = BaseModel & {
    name: string
    code: string
    roomType?: "room-clin" | "room-spec"

    departmentId: number
    department?: DepartmentModel
    profile?: ProfileModel
}
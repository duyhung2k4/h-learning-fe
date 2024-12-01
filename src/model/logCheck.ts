import { BaseModel } from "./base";
import { ProfileModel } from "./profile";

export type LogCheckModel = BaseModel & {
    profileId: number
    accuracy: number
    url: string

    Profile?: ProfileModel
}
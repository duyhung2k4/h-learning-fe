import { BaseModel } from "./base";
import { FieldModel } from "./field";
import { RoomModel } from "./room";

export type DepartmentModel = BaseModel & {
    name: string
    code: string

    rooms: RoomModel[]
    fields: FieldModel[]
}
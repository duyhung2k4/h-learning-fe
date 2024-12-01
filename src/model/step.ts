import { BaseModel } from "./base";
import { DepartmentModel } from "./department";
import { RoomModel } from "./room";
import { ScheduleModel } from "./schedule";

export type StepModel = BaseModel & {
    index: number
    result: string
    status: "pending" | "wating" | "examining" | "done"

    scheduleId: number
    departmentId: number
    roomId?: number
    specId?: number
    schedule?: ScheduleModel
    department?: DepartmentModel
    room: RoomModel
}
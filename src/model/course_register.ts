import { BaseModel } from "./base";
import { CourseModel } from "./course";
import { ProfileModel } from "./profile";

export type CourseRegisterModel = BaseModel & {
  profileId: number
  courseId: number
  profile?: ProfileModel
  course?: CourseModel
}
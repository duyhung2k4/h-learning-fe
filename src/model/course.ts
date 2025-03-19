import { BaseModel } from "./base";
import { ChapterModel } from "./chapter";
import { ProfileModel } from "./profile";

export type CourseModel = BaseModel & {
  name: string
  code: string
  introduce: string
  description: string
  multiLogin: boolean
  value: number
  active: boolean
  createId: number
  thumnail: string

  Create?: ProfileModel
  chapters: ChapterModel[]
}
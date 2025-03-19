import { BaseModel } from "./base";
import { ChapterModel } from "./chapter";
import { CourseModel } from "./course";
import { VideoLessionModel } from "./video_lession";

export type LessionModel = BaseModel & {
  name: string
  description: string
  order: number
  chapterId: number
  courseId: number

  chapter?: ChapterModel
  course?: CourseModel
  videoLession?: VideoLessionModel
}
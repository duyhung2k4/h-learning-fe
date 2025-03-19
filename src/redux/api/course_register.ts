import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { CreateCourseRegister } from "@/dto/request/course_register";
import { CourseRegisterModel } from "@/model/course_register";

export const courseRegisterApi = createApi({
  reducerPath: "courseRegisterApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    createCourseRegister: builder.mutation<QueryReturnType<CourseRegisterModel>, CreateCourseRegister>({
      query: (payload) => ({
        ...endPoint.courseRegister.create(),
        data: payload,
      }),
    }),
    detailCourseRegister: builder.query<QueryReturnType<CourseRegisterModel>, number>({
      query: (payload) => ({
        ...endPoint.courseRegister.detail(),
        params: {
          id: payload
        }
      }),
    }),
    allCourseRegister: builder.query<QueryReturnType<CourseRegisterModel[]>, null>({
      query: () => ({
        ...endPoint.courseRegister.all(),
      }),
    }),
  })
});

export const {
  useCreateCourseRegisterMutation,
  useDetailCourseRegisterQuery,
  useAllCourseRegisterQuery,
} = courseRegisterApi;
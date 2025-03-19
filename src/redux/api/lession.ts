import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { LessionModel } from "@/model/lession";

export const lessionApi = createApi({
  reducerPath: "lessionApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    detailLession: builder.query<QueryReturnType<LessionModel>, number>({
      query: (payload) => ({
        ...endPoint.lession.detail(),
        params: {
          id: payload
        }
      }),
    }),
  })
});

export const {
  useDetailLessionQuery,
} = lessionApi;
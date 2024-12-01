import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { ScheduleModel } from "@/model/schedule";
import { TransitReq } from "@/dto/request/schedule";



export const scheduleApi = createApi({
    reducerPath: "scheduleApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        callMedicalFile: builder.query<QueryReturnType<ScheduleModel>, null>({
            query: () => ({
                ...endPoint.schedule.callMedicalFile(),
            }),
        }),
        pullMedicalFile: builder.mutation<QueryReturnType<ScheduleModel>, null>({
            query: () => ({
                ...endPoint.schedule.pullMedicalFile(),
            }),
        }),
        transit: builder.mutation<QueryReturnType<null>, TransitReq>({
            query: (payload) => ({
                ...endPoint.schedule.transit(),
                data: payload,
            }),
        }),
    })
});

export const {
    useCallMedicalFileQuery,
    usePullMedicalFileMutation,
    useTransitMutation,
} = scheduleApi;
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { AddAccountForRoomReq, SaveStepReq } from "@/dto/request/room";
import { RoomModel } from "@/model/room";
import { StepModel } from "@/model/step";



export const roomApi = createApi({
    reducerPath: "roomApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        addAccountForRoom: builder.mutation<QueryReturnType<RoomModel>, AddAccountForRoomReq>({
            query: (payload) => ({
                ...endPoint.room.addAccount(),
                data: payload,
            }),
        }),
        callStep: builder.query<QueryReturnType<StepModel>, null>({
            query: () => ({
                ...endPoint.room.callStep(),
            }),
        }),
        pullStep: builder.mutation<QueryReturnType<StepModel>, null>({
            query: () => ({
                ...endPoint.room.pullStep(),
            }),
        }),
        saveStep: builder.mutation<QueryReturnType<StepModel>, SaveStepReq>({
            query: (payload) => ({
                ...endPoint.room.saveStep(),
                data: payload
            }),
        }),
    })
});

export const {
    useAddAccountForRoomMutation,
    useCallStepQuery,
    usePullStepMutation,
    useSaveStepMutation,
} = roomApi;
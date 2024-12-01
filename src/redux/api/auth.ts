import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { ROLE_APP } from "@/model/variable";
import { QueryReturnType } from "@/dto/base";
import { AuthResponse, RegisterResponse } from "@/dto/response/auth";
import { FaceLoginRequest, LoginRequest, RegisterRequest, SaveProcessRequest, SendFileAuthRequest } from "@/dto/request/auth";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation<QueryReturnType<AuthResponse>, LoginRequest>({
            query: (payload) => ({
                ...endPoint.auth.loginGoogle(),
                data: {
                    ...payload,
                    role: ROLE_APP,
                },
            }),
        }),
        refreshToken: builder.mutation<QueryReturnType<AuthResponse>, null>({
            query: (payload) => ({
                ...endPoint.auth.refreshToken(),
                data: payload,
            }),
        }),

        register: builder.mutation<QueryReturnType<RegisterResponse>, RegisterRequest>({
            query: (payload) => ({
                ...endPoint.auth.register(),
                data: payload,
            }),
        }),
        sendFileAuth: builder.mutation<QueryReturnType<null>, SendFileAuthRequest>({
            query: (payload) => ({
                ...endPoint.auth.sendFileAuth(),
                data: payload,
            }),
        }),
        faceLogin: builder.mutation<QueryReturnType<null>, FaceLoginRequest>({
            query: (payload) => ({
                ...endPoint.auth.faceLogin(),
                data: payload,
            }),
        }),
        createSocketAuthFace: builder.mutation<QueryReturnType<string>, null>({
            query: (payload) => ({
                ...endPoint.auth.createSocketAuthFace(),
                data: payload,
            }),
        }),
        acceptCode: builder.mutation<QueryReturnType<null>, string>({
            query: (payload) => ({
                ...endPoint.auth.acceptCode(),
                data: { code: payload },
            }),
        }),
        saveProcess: builder.mutation<QueryReturnType<null>, SaveProcessRequest>({
            query: (payload) => ({
                ...endPoint.auth.saveProcess(),
                data: payload,
            }),
        }),
    })
});

export const {
    useLoginMutation,
    useRefreshTokenMutation,
    useRegisterMutation,
    useSendFileAuthMutation,
    useFaceLoginMutation,
    useCreateSocketAuthFaceMutation,
    useAcceptCodeMutation,
    useSaveProcessMutation,
} = authApi;
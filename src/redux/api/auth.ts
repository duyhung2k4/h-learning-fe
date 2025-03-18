import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { AuthResponse, RegisterResponse } from "@/dto/response/auth";
import { AcceptCodeRequest, LoginRequest, RegisterRequest, UpdateProfileRequest } from "@/dto/request/auth";
import { ProfileModel } from "@/model/profile";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<QueryReturnType<AuthResponse>, LoginRequest>({
      query: (payload) => ({
        ...endPoint.auth.loginGoogle(),
        data: {
          ...payload,
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
    acceptCode: builder.mutation<QueryReturnType<null>, AcceptCodeRequest>({
      query: (payload) => ({
        ...endPoint.auth.acceptCode(),
        data: payload,
      }),
    }),
    updateProfile: builder.mutation<QueryReturnType<ProfileModel>, UpdateProfileRequest>({
      query: (payload) => ({
        ...endPoint.auth.updateProfile(),
        data: payload,
      }),
    }),
  })
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
  useAcceptCodeMutation,
  useUpdateProfileMutation,
} = authApi;
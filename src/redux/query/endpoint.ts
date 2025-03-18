import Cookies from "js-cookie";

import { TOKEN_TYPE } from "@/model/variable";



export const HEADER = {
  defaultHeader: () => ({
    accept: 'application/json',
  }),
  refreshTokenHeader: () => {
    const token = Cookies.get(TOKEN_TYPE.REFRESH_TOKEN);
    return {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    }
  },
  protectedHeader: () => {
    const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
    return {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    }
  },
  protectedMutipartHeader: () => {
    const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
    return {
      accept: 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    }
  },
  codeHeader: () => {
    const token = Cookies.get(TOKEN_TYPE.CODE_TOKEN);
    return {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }
}

export const endPoint = {
  auth: {
    loginGoogle: () => ({
      url: "api/v1/auth/login",
      method: "POST",
      headers: HEADER.defaultHeader(),
    }),
    refreshToken: () => ({
      url: "api/v1/auth/refresh-token",
      method: "POST",
      headers: HEADER.refreshTokenHeader(),
    }),
    register: () => ({
      url: "api/v1/auth/register",
      method: "POST",
      headers: HEADER.defaultHeader(),
    }),
    acceptCode: () => ({
      url: "api/v1/auth/accept-code",
      method: "POST",
      headers: HEADER.codeHeader(),
    }),
    updateProfile: () => ({
      url: "api/v1/auth/update-profile",
      method: "PUT",
      headers: HEADER.protectedHeader(),
    })
  },
  query: {
    query: (model: string) => ({
      url: `api/v1/protected/query/${model}`,
      method: "POST",
      headers: HEADER.protectedHeader(),
    }),
  },
  course: {
    getAll: () => ({
      url: `api/v1/course/all-public`,
      method: "GET",
      headers: HEADER.protectedHeader(),
    }),
    detail: () => ({
      url: `api/v1/course/detail-public`,
      method: "GET",
      headers: HEADER.protectedHeader(),
    }),
    create: () => ({
      url: `api/v1/course/create`,
      method: "POST",
      headers: HEADER.protectedMutipartHeader(),
    }),
    update: () => ({
      url: `api/v1/course/update`,
      method: "PUT",
      headers: HEADER.protectedMutipartHeader(),
    })
  },
  courseRegister: {
    create: () => ({
      url: `api/v1/course-register/create`,
      method: "POST",
      headers: HEADER.protectedHeader(),
    }),
    detail: () => ({
      url: `api/v1/course-register/detail`,
      method: "GET",
      headers: HEADER.protectedHeader(),
    }),
  }
}
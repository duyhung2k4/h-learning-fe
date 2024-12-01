import { lazy } from "react";

// auth
export const PageLogin = lazy(() => import("@/pages/login"));

// page
export const PageHome = lazy(() => import("@/pages/home"));
export const PageDepartment = lazy(() => import("@/pages/department"));
export const PageSchedule = lazy(() => import("@/pages/schedule"));
export const PageScheduleDetail = lazy(() => import("@/pages/schedule_detail"));
export const PageRoomSpec = lazy(() => import("@/pages/room_spec"));
export const PageRoomClin = lazy(() => import("@/pages/room_clin"));
export const PageField = lazy(() => import("@/pages/field"));
export const PageFieldDetail = lazy(() => import("@/pages/field_detail"));
export const PageClinical = lazy(() => import("@/pages/clinical"));
export const PageSpec = lazy(() => import("@/pages/spec"));
export const PageResult = lazy(() => import("@/pages/result"));
export const PageDetailResult = lazy(() => import("@/pages/detail_result"));
export const PageAccountDoctor = lazy(() => import("@/pages/account_doctor"));
export const PageFaceAuth = lazy(() => import("@/pages/face_auth"));
export const PageFaceLogin = lazy(() => import("@/pages/face_login"));
export const PageSaveProcess = lazy(() => import("@/pages/save_process"));
export const PageLogCheck = lazy(() => import("@/pages/log_check"));

// other
export const PageNotFound = lazy(() => import("@/pages/not_found"));
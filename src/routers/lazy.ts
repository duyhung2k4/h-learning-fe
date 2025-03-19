import { lazy } from "react";

// auth
export const PageRegister = lazy(() => import("@/pages/register"));
export const PageLogin = lazy(() => import("@/pages/login"));
export const PageAcceptCode = lazy(() => import("@/pages/accept_code"));

// student-pages
export const PageHome = lazy(() => import("@/pages/home"));
export const PageMyCourse = lazy(() => import("@/pages/my_course"));
export const PageFilterCourse = lazy(() => import("@/pages/filter_course"));
export const PageAccount = lazy(() => import("@/pages/account"));
export const PageDetailCourse = lazy(() => import("@/pages/detail_course"))
export const PageCourseLearning = lazy(() => import("@/pages/course_learning"));
export const PageLessionLearning = lazy(() => import("@/pages/lession_learning"));
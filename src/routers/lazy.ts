import { lazy } from "react";

// auth
export const PageRegister = lazy(() => import("@/pages/register"));
export const PageLogin = lazy(() => import("@/pages/login"));
export const PageAcceptCode = lazy(() => import("@/pages/accept_code"));

// student-pages
export const PageHome = lazy(() => import("@/pages/home"));
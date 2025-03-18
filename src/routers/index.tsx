import React from "react";
import AppshellLayout from "@/layouts/appShell";
import ProtectedLayout from "@/layouts/protected";
import AuthLayout from "@/layouts/auth";

import { Routes, Route } from "react-router-dom";
import {
  PageAcceptCode,
  PageAccount,
  PageMyCourse,
  PageHome,
  PageLogin,
  PageFilterCourse,
  PageRegister,
  PageDetailCourse,
} from "./lazy";
import { ROUTER } from "@/constants/router";



const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTER.REGISTER.href} element={<PageRegister />} />
          <Route path={ROUTER.ACCEPT_CODE.href} element={<PageAcceptCode />} />
          <Route path={ROUTER.LOGIN.href} element={<PageLogin />} />
        </Route>
        <Route element={<AppshellLayout />}>
          <Route path={ROUTER.HOME.href} element={<PageHome />} />
          <Route path={ROUTER.MY_COURSE.href} element={<PageMyCourse />} />
          <Route path={ROUTER.FILTER_COURSE.href} element={<PageFilterCourse />} />
          <Route path={ROUTER.ACCOUNT.href} element={<PageAccount />} />
        </Route>
        <Route path={`${ROUTER.DETAIL_COURSE.href}/:id`} element={<PageDetailCourse/>}/>
      </Route>
    </Routes>
  )
}

export default AppRouter;
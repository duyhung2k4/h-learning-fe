import React, { useEffect } from "react";
import AppshellLayout from "@/layouts/appShell";
import ProtectedLayout from "@/layouts/protected";

import { Routes, Route } from "react-router-dom";
import {
    PageAccountDoctor,
    PageClinical,
    PageDepartment,
    PageDetailResult,
    PageFaceAuth,
    PageFaceLogin,
    PageField,
    PageFieldDetail,
    PageHome,
    PageLogCheck,
    PageLogin,
    PageNotFound,
    PageResult,
    PageRoomClin,
    PageRoomSpec,
    PageSaveProcess,
    PageSchedule,
    PageScheduleDetail,
    PageSpec,
} from "./lazy";
import { ROUTER } from "@/constants/router";
import { useAppSelector } from "@/redux/hook";
import { useRefreshTokenMutation } from "@/redux/api/auth";
import { LoadingOverlay } from "@mantine/core";



const AppRouter: React.FC = () => {
    const role = useAppSelector(state => state.authSlice.role);

    const [refresh, { isLoading }] = useRefreshTokenMutation();
    
    useEffect(() => {
        refresh(null);
    }, []);

    if(isLoading) {
        return <LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />
    }

    return (
        <Routes>
            <Route path={ROUTER.LOGIN.href} element={<PageLogin />} />

            <Route element={<ProtectedLayout />}>
                <Route element={<AppshellLayout />}>
                    <Route path={ROUTER.HOME.href} element={<PageHome />} />
                    <Route path={`${ROUTER.HOME.href}/:id`} element={<PageScheduleDetail />} />
                    {
                        role === "admin" &&
                        <>
                            <Route path={ROUTER.DEPARTMENT.href} element={<PageDepartment />} />
                            <Route path={ROUTER.SCHEDULE.href} element={<PageSchedule />} />
                            <Route path={`${ROUTER.SCHEDULE.href}/:id`} element={<PageScheduleDetail />} />
                            <Route path={ROUTER.ROOM_CLIN.href} element={<PageRoomClin />} />
                            <Route path={ROUTER.ROOM_SPEC.href} element={<PageRoomSpec />} />
                            <Route path={ROUTER.FIELD.href} element={<PageField />} />
                            <Route path={ROUTER.FIELD_DETAIL.href} element={<PageFieldDetail />} />
                            <Route path={ROUTER.ACCOUNT_DOCTOR.href} element={<PageAccountDoctor />} />
                            <Route path={ROUTER.LOG_CHECK.href} element={<PageLogCheck />} />
                        </>
                    }

                    {
                        role === "room-clin" &&
                        <>
                            <Route path={ROUTER.CLINICAL.href} element={<PageClinical />} />
                            <Route path={ROUTER.RESULT.href} element={<PageResult />} />
                        </>
                    }

                    {
                        role === "room-spec" &&
                        <>
                            <Route path={ROUTER.SPEC.href} element={<PageSpec />} />
                        </>

                    }

                    <Route path={`${ROUTER.RESULT.href}/:id`} element={<PageDetailResult />} />
                </Route>

                {
                    role === "admin" &&
                    <>
                        <Route path={`${ROUTER.FACE_AUTH.href}/:id`} element={<PageFaceAuth />} />
                        <Route path={`${ROUTER.FACE_LOGIN.href}`} element={<PageFaceLogin />} />
                        <Route path={`${ROUTER.SAVE_PROCESS.href}/:id`} element={<PageSaveProcess />} />
                    </>
                }
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default AppRouter;
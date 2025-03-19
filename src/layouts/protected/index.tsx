import Cookies from "js-cookie";
import React, { Suspense, useEffect } from "react";

// import { ROUTER } from "@/constants/router";
import { TOKEN_TYPE } from "@/model/variable";
import { useNavigate, useOutlet } from "react-router";
import { LoadingOverlay } from "@mantine/core";
import { ROUTER } from "@/constants/router";
import { useRefreshTokenMutation } from "@/redux/api/auth";



const ProtectedLayout: React.FC = () => {
  const outlet = useOutlet();
  const navigation = useNavigate();

  const accessToken = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);

  const [refresh, { isLoading: loadingRefreshToken }] = useRefreshTokenMutation();

  useEffect(() => {
    if (accessToken) return;
    const path = window.location.pathname;
    if (path === ROUTER.LOGIN.href || path === ROUTER.REGISTER.href || path === ROUTER.ACCEPT_CODE.href) return;

    navigation(ROUTER.LOGIN.href);
  }, [accessToken, window.location.pathname]);

  useEffect(() => {
    refresh(null);
  }, []);



  if (loadingRefreshToken) {
    return (
      <LoadingOverlay />
    )
  }

  return (
    <Suspense fallback={<LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />}>
      {outlet}
    </Suspense>
  )
}

export default ProtectedLayout;
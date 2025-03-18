import React, { Suspense, useMemo } from "react";
// import Cookies from "js-cookie";

import { useNavigate, useOutlet } from "react-router";
import { Box, Flex, Group, LoadingOverlay, Stack, Text } from '@mantine/core';
import { ObjectRouter, ROUTER } from "@/constants/router";
// import { TOKEN_TYPE } from "@/model/variable";

import classes from "./styles.module.css";



const AppshellLayout: React.FC = () => {
  const links: ObjectRouter[] = useMemo(() => {
    let list: ObjectRouter[] = [
      ROUTER.HOME,
      ROUTER.FILTER_COURSE,
      ROUTER.MY_COURSE,
      ROUTER.ACCOUNT,
    ];

    return list;
  }, []);

  const outlet = useOutlet();
  const navigation = useNavigate();

  const pathname = window.location.pathname;

  const handleNavigation = (href: string) => {
    navigation(href);
  }

  // const handleLogout = () => {
  //     Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
  //     Cookies.remove(TOKEN_TYPE.REFRESH_TOKEN);

  //     navigation(ROUTER.HOME.href);
  // }



  return (
    <Suspense fallback={<LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />}>
      <Stack w={"100%"} h={"100vh"} gap={0}>
        {/* Phần chứa nội dung chính (outlet) */}
        <Stack w={"100%"} flex={1} style={{ overflow: "hidden" }}>
          <Stack
            w={"100%"}
            h={"100%"}
            style={{
              flex: 1,
              overflowY: "auto", // Cuộn khi nội dung lớn hơn
            }}
          >
            {outlet}
          </Stack>
        </Stack>

        {/* Thanh điều hướng giữ nguyên khi cuộn */}
        <Flex
          w={"100%"}
          justify={"space-around"}
          style={{
            borderTop: "1px solid #FFF",
            position: "sticky",
            bottom: 0,
            background: "#000", // Giữ màu nền để không bị trong suốt
            zIndex: 10,
          }}
        >
          {links.map((l, i) => {
            const Icon = l.icon;
            return (
              <Group
                key={i}
                className={`${classes.link_root} ${pathname === l.href ? classes.active_link : null
                  }`}
                onClick={() => handleNavigation(l.href)}
                gap={0}
              >
                <Stack gap={8} className={classes.link} align="center">
                  {Icon && <Icon className={classes.icon} />}
                  <Text style={{ fontSize: "2.5vw" }}>{l.name}</Text>
                </Stack>
                <Box className={classes.line_link}></Box>
              </Group>
            );
          })}
        </Flex>
      </Stack>
    </Suspense>
  )
}

export default AppshellLayout;
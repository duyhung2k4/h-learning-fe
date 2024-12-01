import React, { Suspense, useMemo } from "react";
import Cookies from "js-cookie";

import { useNavigate, useOutlet } from "react-router";
import { AppShell, Burger, Group, LoadingOverlay, Text, Stack, Avatar, Menu, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ObjectRouter, ROUTER } from "@/constants/router";
import { useAppSelector } from "@/redux/hook";
import { IconLogout } from "@tabler/icons-react";
import { TOKEN_TYPE } from "@/model/variable";

import classes from "./styles.module.css";



const AppshellLayout: React.FC = () => {
    const { 
        profile,
        role,
    } = useAppSelector(state => {
        return ({
            profile: state.authSlice.profile,
            role: state.authSlice.role,
        })
    });

    const links: ObjectRouter[] = useMemo(() => {
        let list: ObjectRouter[] = [ROUTER.HOME];

        if (role === "admin") {
            list.push(
                ROUTER.DEPARTMENT,
                ROUTER.ROOM_CLIN,
                ROUTER.ROOM_SPEC,
                ROUTER.ACCOUNT_DOCTOR,
                ROUTER.SCHEDULE,
                ROUTER.FIELD,
                ROUTER.LOG_CHECK,
            )
        }

        if (role === "room-clin") {
            list.push(...[
                ROUTER.CLINICAL,
                ROUTER.RESULT,
            ])
        }

        if (role === "room-spec") {
            list.push(ROUTER.SPEC,)
        }

        return list;
    }, [role]);

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const outlet = useOutlet();
    const navigation = useNavigate();

    const pathname = window.location.pathname;

    const handleLogout = () => {
        Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
        Cookies.remove(TOKEN_TYPE.REFRESH_TOKEN);

        navigation(ROUTER.HOME.href);
    }



    return (
        <Suspense fallback={<LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />}>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: "md",
                    collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                }}
                padding="md"
                withBorder={false}
            >
                <AppShell.Header>
                    <Group h="100%" px="md" justify="space-between">
                        <Group>
                            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                            <Text>HOSPITAL</Text>
                        </Group>

                        <Menu>
                            <Menu.Target>
                                <Group style={{ cursor: "pointer" }}>
                                    <Text>{profile?.username}</Text>
                                    <Avatar />
                                </Group>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item onClick={handleLogout} leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
                                    Đăng xuất
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>

                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p={0}>
                    <Stack gap={8} pt={30}>
                        {links.map((l, index) => {
                            const active = pathname === ROUTER.HOME.href && l.href === ROUTER.HOME.href ? true : pathname.includes(l.href) && l.href !== ROUTER.HOME.href;
                            const Icon = l.icon
                            return (
                                <Group
                                    key={index}
                                    gap={16}
                                    align="center"
                                    className={classes.link_root}
                                    onClick={() => navigation(l.href)}
                                >
                                    <div
                                        style={{
                                            width: 4,
                                            borderTopRightRadius: 100,
                                            borderBottomRightRadius: 100,
                                            height: "100%"
                                        }}
                                        className={`${classes.link} ${active && classes.active}`}
                                    ></div>
                                    <Group
                                        gap={8}
                                        align="center"
                                        w={280 - 16 - 5}
                                        style={{
                                            padding: "10px 8px",
                                            borderRadius: 16,
                                        }}
                                        className={`${classes.link} ${active && classes.active}`}
                                    >
                                        {Icon && <Icon />}
                                        <span>{l.name}</span>
                                    </Group>
                                </Group>
                            )
                        })}
                    </Stack>
                </AppShell.Navbar>
                <AppShell.Main
                    pb={0}
                >
                    <Group
                        style={{
                            height: "calc(100vh - 76px)",
                            width: "100%",
                            justifyContent: "start",
                            alignItems: "start",
                            borderTopRightRadius: 16,
                            borderTopLeftRadius: 16,
                            padding: 16,
                            backgroundColor: "#E8F2FC",
                            overflowY: "scroll"
                        }}
                    >
                        {outlet}
                    </Group>
                </AppShell.Main>
            </AppShell>
        </Suspense>
    )
}

export default AppshellLayout;
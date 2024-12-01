import React, { useEffect, useState } from "react";

import { Grid, Group, Stack, Text } from "@mantine/core";
import { DEFAULT_QUERY_DATA, useQueryMutation } from "@/redux/api/query";
import { RoomModel } from "@/model/room";
import { ScheduleModel } from "@/model/schedule";
import { IconBed, IconHeartbeat, IconLicense, IconVaccine } from "@tabler/icons-react";
import { DepartmentModel } from "@/model/department";
import { mapStatus } from "../schedule";

import classes from "./style.module.css";
import TableCRUD from "@/components/table_crud";
import dayjs from "dayjs";



const Home: React.FC = () => {
    const [post] = useQueryMutation();
    const [rooms, setRooms] = useState<RoomModel[]>([]);
    const [schedules, setSchedules] = useState<ScheduleModel[]>([]);
    const [departments, setDepartments] = useState<DepartmentModel[]>([]);

    const handleGetRoom = async () => {
        const result = await post({
            model: "room",
            data: {
                ...DEFAULT_QUERY_DATA,
                condition: "",
                args: [],
                preload: [],
                omit: {},
                method: "get_all",
            }
        });

        if ("error" in result) return;
        const data = result.data.data as RoomModel[] || []
        setRooms(data);
    }

    const handleGetDepartment = async () => {
        const result = await post({
            model: "department",
            data: {
                ...DEFAULT_QUERY_DATA,
                condition: "",
                args: [],
                preload: [],
                omit: {},
                method: "get_all",
            }
        });

        if ("error" in result) return;
        const data = result.data.data as DepartmentModel[] || []
        setDepartments(data);
    }

    const handleGetSchedule = async () => {
        const result = await post({
            model: "schedule",
            data: {
                ...DEFAULT_QUERY_DATA,
                condition: "status = ?",
                args: ["done"],
                preload: [],
                omit: {},
                method: "get_all",
            }
        });

        if ("error" in result) return;
        const data = result.data.data as ScheduleModel[] || []
        setSchedules(data);
    }

    useEffect(() => {
        handleGetRoom();
        handleGetSchedule();
        handleGetDepartment();
    }, []);



    return (
        <Stack gap={0} w={"100%"}>
            <Text style={{ fontSize: 24, fontWeight: 600 }}>Thống kê</Text>
            <Grid w={"100%"} mt={24}>
                <Grid.Col span={3}>
                    <Group className={classes.card}>
                        <Group justify="space-between">
                            <IconLicense size={60} color="green" />
                            <Stack justify="start" gap={4}>
                                <Text fw={600}>Hồ sơ bệnh án</Text>
                                <Text>{schedules.length}</Text>
                            </Stack>
                        </Group>
                    </Group>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Group className={classes.card}>
                        <Group justify="space-between">
                            <IconHeartbeat size={60} color="red" />
                            <Stack justify="start" gap={4}>
                                <Text fw={600}>Tổng số khoa</Text>
                                <Text>{departments.length}</Text>
                            </Stack>
                        </Group>
                    </Group>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Group className={classes.card}>
                        <Group justify="space-between">
                            <IconBed size={60} color="#000" />
                            <Stack justify="start" gap={4}>
                                <Text fw={600}>Phòng lâm sàng</Text>
                                <Text>{rooms.filter(r => r.roomType === "room-clin").length}</Text>
                            </Stack>
                        </Group>
                    </Group>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Group className={classes.card}>
                        <Group justify="space-between">
                            <IconVaccine size={60} color="blue" />
                            <Stack justify="start" gap={4}>
                                <Text fw={600}>Phòng chuyên khoa</Text>
                                <Text>{rooms.filter(r => r.roomType === "room-spec").length}</Text>
                            </Stack>
                        </Group>
                    </Group>
                </Grid.Col>
            </Grid>

            <Stack className={classes.info} mt={36}>
                <Text fw={600}>Hồ sơ bệnh án</Text>
                <TableCRUD
                    model="schedule"
                    cells={{
                        dob: (values) => {
                            const schedule = values as ScheduleModel
                            return <>{dayjs(schedule.dob).format("DD/MM/YYYY")}</>
                        },
                        status: (values) => {
                            const schedule = values as ScheduleModel
                            return (
                                <Group>{mapStatus[schedule.status]}</Group>
                            )
                        }
                    }}
                    isAction={false}
                    isOption={false}
                    fields={[
                        {
                            type: "text",
                            size: 6,
                            name: "name",
                            data: { label: "Họ tên" }
                        },
                        {
                            type: "date",
                            size: 6,
                            name: "dob",
                            data: { label: "Ngày sinh" }
                        },
                        {
                            type: "text",
                            size: 6,
                            name: "address",
                            data: { label: "Địa chỉ" }
                        },
                        {
                            type: "select",
                            size: 6,
                            name: "gender",
                            data: {
                                label: "Giới tính",
                                data: ["Nam", "Nữ"]
                            }
                        },
                        {
                            type: "text",
                            size: 6,
                            name: "phone",
                            data: { label: "Liên hệ" }
                        },
                        {
                            type: "text",
                            size: 6,
                            name: "status",
                            isField: false,
                            data: { label: "Trạng thái" }
                        },
                    ]}
                />
            </Stack>
            <Stack className={classes.info} mt={36}>
                <Text fw={600}>Danh sách phòng khám lâm sàng</Text>
                <TableCRUD
                    model="room"
                    cells={{}}
                    condition="room_type = ?"
                    args={["room-clin"]}
                    isOption={false}
                    isAction={false}
                    fields={[
                        {
                            type: "text",
                            size: 6,
                            name: "name",
                            data: { label: "Tên phòng", placeholder: "Ví dụ: Phòng chụp chiếu" }
                        },
                        {
                            type: "text",
                            size: 6,
                            name: "code",
                            data: { label: "Mã phòng", placeholder: "Ví dụ: p1-101" }
                        },
                    ]}
                />
            </Stack>
            <Stack className={classes.info} mt={36}>
                <Text fw={600}>Danh sách các khoa</Text>
                <TableCRUD
                    model="department"
                    cells={{}}
                    isAction={false}
                    isOption={false}
                    fields={[
                        {
                            type: "text",
                            size: 6,
                            name: "name",
                            data: { label: "Tên khoa", placeholder: "Ví dụ: Khoa tim mạch" }
                        },
                        {
                            type: "text",
                            size: 6,
                            name: "code",
                            data: { label: "Mã khoa", placeholder: "Ví dụ: ktm" }
                        },
                    ]}
                />
            </Stack>
            <Stack className={classes.info} mt={36}>
                <Text fw={600}>Danh sách phòng khám chuyên khoa</Text>
                <TableCRUD
                    model="room"
                    cells={{}}
                    condition="room_type = ?"
                    args={["room-spec"]}
                    isOption={false}
                    isAction={false}
                    fields={[
                        {
                            type: "text",
                            size: 6,
                            name: "name",
                            data: { label: "Tên phòng", placeholder: "Ví dụ: Phòng chụp chiếu" }
                        },
                        {
                            type: "text",
                            size: 6,
                            name: "code",
                            data: { label: "Mã phòng", placeholder: "Ví dụ: p1-101" }
                        },
                    ]}
                />
            </Stack>
        </Stack>
    )
}

export default Home;
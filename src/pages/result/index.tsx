import { ROUTER } from "@/constants/router";
import { ScheduleModel } from "@/model/schedule";
import { DEFAULT_QUERY_DATA, useQueryMutation } from "@/redux/api/query";
import { useAppSelector } from "@/redux/hook";
import { Grid, Group, Stack, Text, TextInput, Tooltip } from "@mantine/core";
import { IconExternalLink, IconSearch } from "@tabler/icons-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";



const Result: React.FC = () => {
    const profile = useAppSelector(state => state.authSlice.profile);
    const [search, setSearch] = useState<string>("");
    const [schedules, setSchedules] = useState<ScheduleModel[]>([]);

    const [query, { }] = useQueryMutation();
    const navigation = useNavigate();

    const listAfterFilter: ScheduleModel[] = useMemo(() => {
        return schedules.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
    }, [schedules, search]);



    const handleGetDepartment = async () => {
        if(!profile?.roomId) return;

        const result = await query({
            model: "schedule",
            data: {
                ...DEFAULT_QUERY_DATA,
                condition: "room_id = ? AND status = ?",
                args: [profile.roomId, "finished"],
                method: "get_all",
            }
        });

        if ("error" in result) return;
        const data = result.data.data as ScheduleModel[] || [];
        setSchedules(data);
    }

    useEffect(() => {
        handleGetDepartment();
    }, []);



    return (
        <Stack
            style={{
                minHeight: "100%",
                width: "100%",
                backgroundColor: "#FFF",
                borderRadius: 16,
                padding: 16,
            }}
        >
            <Group w={"100%"} justify="space-between">
                <Text fw={500}>Danh hồ sơ chờ kết luận</Text>
                <TextInput
                    leftSection={<IconSearch />}
                    placeholder="Tìm kiếm"
                    miw={300}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </Group>

            <Grid>
                {
                    listAfterFilter.map(d =>
                        <Grid.Col key={d.ID}>
                            <Group
                                w={"100%"}
                                h={50}
                                justify="space-between"
                                style={{
                                    backgroundColor: "#177AE3",
                                    color: "#FFF",
                                    padding: 8,
                                    borderRadius: 16
                                }}
                            >
                                <span><span style={{ fontWeight: 600 }}>Mã hồ sơ:</span> {d.code}</span>
                                <Tooltip label="Đi tới">
                                    <IconExternalLink
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        onClick={() => navigation(`${ROUTER.RESULT.href}/${d.ID}`)}
                                    />
                                </Tooltip>
                            </Group>
                        </Grid.Col>
                    )
                }
            </Grid>
        </Stack>
    )
}

export default Result;
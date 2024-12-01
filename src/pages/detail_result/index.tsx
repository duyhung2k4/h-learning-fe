import React, { useEffect, useMemo, useState } from "react";
import FormCustom, { FormCustomField } from "@/components/form";
import EditorCustom from "@/components/editor";
import dayjs from "dayjs";

import { Avatar, Button, Grid, Group, Loader, Stack, Text } from "@mantine/core";
import { IconMapPin, IconPhone } from "@tabler/icons-react";
import { DepartmentModel } from "@/model/department";
import { DEFAULT_QUERY_DATA, useQueryMutation } from "@/redux/api/query";
import { useNavigate, useParams } from "react-router";
import { ScheduleModel } from "@/model/schedule";
import { ConvertHTML } from "@/components/convertHTML";
import { ROUTER } from "@/constants/router";

import classes from "./style.module.css";



const DetailResult: React.FC = () => {
    const { id } = useParams();

    const navigation = useNavigate();


    const [schedule, setSchedule] = useState<ScheduleModel | null>(null);
    const [departments, setDepartments] = useState<DepartmentModel[]>([]);
    const [resultEdittor, setResultEditor] = useState<string>("");

    const [query, { isLoading: loadingQuery }] = useQueryMutation();



    // const schedule = useMemo(() => {
    //     return medicalFileData?.data
    // }, [medicalFileData]);

    const { fields } = useMemo(() => {
        const fields: FormCustomField[] = [
            {
                type: "text",
                name: "code",
                size: 12,
                data: {
                    label: "Mã hồ sơ",
                    readOnly: true,
                    value: schedule?.code || "",
                    defaultValue: schedule?.code || ""
                }
            },
        ]

        return { fields }
    }, [departments, schedule]);

    const handleGetSchedule = async () => {
        if (!id) return;

        const result = await query({
            model: "schedule",
            data: {
                ...DEFAULT_QUERY_DATA,
                condition: "id = ?",
                args: [id],
                preload: ["Steps", "Steps.Department", "Steps.Department.Fields"]
            }
        });

        if ("error" in result) return;
        const data = result.data.data as ScheduleModel
        setSchedule(data || null);
    }

    const handleGetDepartments = async () => {
        const result = await query({
            model: "department",
            data: {
                ...DEFAULT_QUERY_DATA,
                method: "get_all",
                preload: ["Rooms"],
            }
        });

        if ("error" in result) return;
        const data = result.data.data as DepartmentModel[] | [];
        setDepartments(data);
    }

    const handleSubmit = async () => {
        if (!schedule) return;
        const payload = {
            result: resultEdittor,
            status: "done",
        }

        const result = await query({
            model: "schedule",
            data: {
                ...DEFAULT_QUERY_DATA,
                method: "update",
                condition: "id = ?",
                args: [schedule.ID],
                data: payload,
            }
        });
        if ("error" in result) return;
        navigation(ROUTER.RESULT.href);
    }

    useEffect(() => {
        handleGetSchedule();
        handleGetDepartments();
    }, []);



    if (!schedule && !loadingQuery) {
        return (
            <Stack h={"100%"} w={"100%"} justify="center" align="center">
                <Loader />
            </Stack>
        )
    }

    return (
        <Stack
            w={"100%"}
        >
            <Grid>
                <Grid.Col span={4}>
                    <Stack className={classes.info}>
                        <Group>
                            <Avatar radius="xl" size={80} />
                            <Text style={{ fontSize: 20 }}>{schedule?.name}</Text>
                        </Group>
                        <Stack>
                            <Text fw={800} style={{ fontSize: 18 }}>Thông tin liên hệ </Text>
                            <Group>
                                <IconPhone />
                                <Text>{schedule?.phone}</Text>
                            </Group>
                            <Group>
                                <IconMapPin />
                                <Text>{schedule?.address}</Text>
                            </Group>
                        </Stack>
                    </Stack>

                    <Stack className={classes.detail} mt={20}>
                        <Text fw={800} style={{ fontSize: 18 }}>Thông tin chi tiết</Text>
                        <Stack gap={4}>
                            <Group>
                                <Text>Ngày sinh:</Text> <Text>{dayjs(schedule?.dob).format("DD/MM/YYYY")}</Text>
                            </Group>
                            <Group>
                                <Text>Giới tính:</Text> <Text>{schedule?.gender}</Text>
                            </Group>
                        </Stack>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={8}>
                    <Stack className={classes.medical_file}>
                        <Text fw={800} style={{ fontSize: 18 }}>Hồ sơ bệnh án</Text>
                        <FormCustom
                            id="clinical"
                            fields={fields}
                            cbSubmit={handleSubmit}
                            clear={false}
                        />
                        <Stack gap={4} mt={36}>
                            <Text fw={800}>Mô tả</Text>
                            <ConvertHTML
                                defaultContent={schedule?.description || ""}
                            />
                        </Stack>
                    </Stack>
                </Grid.Col>
            </Grid>

            {
                (schedule?.steps || []).map(s => {
                    const defaultValue = s.result.length === 0 ? {} : JSON.parse(s.result);

                    const fields: FormCustomField[] = (s.department?.fields || []).map(f => ({
                        type: f.type,
                        size: 12,
                        name: f.name,
                        noClear: true,
                        data: {
                            label: f.label,
                            placeholder: f.placeholder,
                            data: f.defaultValues || [],
                            readOnly: true,
                            defaultValue: defaultValue[f.name]
                        }
                    }));

                    return (
                        <Stack key={s.ID} className={classes.form}>
                            <Text fw={800}>{s.department?.name}</Text>
                            <FormCustom
                                fields={fields}
                                id=""
                                cbSubmit={() => { }}
                            />
                        </Stack>)
                }
                )
            }

            <Stack className={classes.result}>
                <Text fw={800}>Kết luận</Text>
                <EditorCustom
                    onChange={e => setResultEditor(e)}
                />
            </Stack>


            <Group className={classes.option} justify="end">
                <Button
                    color="green"
                    onClick={handleSubmit}
                >Hoàn thành</Button>
            </Group>
        </Stack>
    )
}

export default DetailResult;
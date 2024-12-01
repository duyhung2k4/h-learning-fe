import React, { useEffect, useMemo, useState } from "react";
import FormCustom, { FormCustomField } from "@/components/form";
import EditorCustom from "@/components/editor";
import dayjs from "dayjs";

import { Avatar, Button, Grid, Group, Loader, Stack, Text } from "@mantine/core";
import { IconMapPin, IconPhone } from "@tabler/icons-react";
import { DepartmentModel } from "@/model/department";
import { DEFAULT_QUERY_DATA, useQueryMutation } from "@/redux/api/query";
import { useCallMedicalFileQuery, usePullMedicalFileMutation, useTransitMutation } from "@/redux/api/schedule";
import { TransitReq } from "@/dto/request/schedule";

import classes from "./style.module.css";
import ModalFaceAuth from "./modal";



const Clinical: React.FC = () => {
    const [departments, setDepartments] = useState<DepartmentModel[]>([]);
    const [form, setForm] = useState<Record<string, any>>({});
    const [modal, setModal] = useState<boolean>(false);
    const [resultEdittor, setResultEditor] = useState<string>("");



    const [query, { isLoading: loadingQuery }] = useQueryMutation();
    const [create, { isLoading: loadingTransit }] = useTransitMutation();

    const {
        data: medicalFileData,
        refetch: medicalFileRefetch,
    } = useCallMedicalFileQuery(null);

    const [pull, { isLoading: loadingPull }] = usePullMedicalFileMutation();



    const schedule = useMemo(() => {
        return medicalFileData?.data
    }, [medicalFileData]);

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
            {
                type: "multi_select",
                name: "departments",
                size: 12,
                data: {
                    label: "Danh sách khoa cần khám",
                    data: departments.filter(d => d.rooms.length > 0).map(d => ({ label: d.name, value: `${d.ID}` }))
                }
            }
        ]

        return { fields }
    }, [departments, schedule]);

    const handleGetDepartments = async () => {
        const result = await query({
            model: "department",
            data: {
                ...DEFAULT_QUERY_DATA,
                method: "get_all",
                preload: ["Rooms"],
            }
        });

        if("error" in result) return;
        const data = result.data.data as DepartmentModel[] | [];
        setDepartments(data);
    }

    const handleFaceAuth = async (values: Record<string, any>) => {
        setForm(values);
        setModal(true);
    }

    const handleSubmit = async (values: Record<string, any>, profileId: number) => {
        if(!schedule) return;
        const payload: TransitReq = {
            clinId: profileId,
            description: resultEdittor,
            departmentIds: (values?.departments as string[] || []).map(id => Number(id)),
            scheduleId: schedule.ID,
        }

        const result = await create(payload);
        if("error" in result) return;
        medicalFileRefetch();
        setModal(false);
    }

    const handlePull = async () => {
        const result = await pull(null);
        if("error" in result) return;
        medicalFileRefetch();
    }

    useEffect(() => {
        medicalFileRefetch();
        handleGetDepartments();
    }, []);

    if(loadingQuery || loadingPull) {
        return (
            <Stack h={"100%"} w={"100%"} justify="center" align="center">
                <Loader/>
            </Stack>
        )
    }

    if(!schedule && !loadingQuery) {
        return (
            <Stack h={"100%"} w={"100%"} justify="center" align="center">
                <Button onClick={handlePull}>Lấy hồ sơ</Button>
            </Stack>
        )
    }

    return (
        <>
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
                                <Text fw={500} style={{ fontSize: 18 }}>Thông tin liên hệ </Text>
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
                            <Text fw={500} style={{ fontSize: 18 }}>Thông tin chi tiết</Text>
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
                            <Text fw={500} style={{ fontSize: 18 }}>Hồ sơ bệnh án</Text>
                            <FormCustom
                                id="clinical"
                                fields={fields}
                                cbSubmit={handleFaceAuth}
                                clear={false}
                            />
                            <Stack gap={4} mt={36}>
                                <Text fw={500}>Mô tả</Text>
                                <EditorCustom
                                    onChange={e => setResultEditor(e)}
                                />
                            </Stack>
                        </Stack>
                    </Grid.Col>
                </Grid>

                <Group className={classes.option} justify="end">
                    <Button
                        color="green"
                        type="submit"
                        form="clinical"
                        loading={loadingTransit}
                    >Hoàn thành</Button>
                </Group>
            </Stack>

            <ModalFaceAuth
                open={modal}
                cb={(profileId) => {
                    handleSubmit(form, profileId);
                }}
                onClose={() => {
                    setModal(false);
                    setForm({});
                }}
            />
        </>
    )
}

export default Clinical;
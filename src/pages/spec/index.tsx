import React, { useEffect, useMemo, useState } from "react";
import FormCustom, { FormCustomField } from "@/components/form";
import dayjs from "dayjs";

import { useCallStepQuery, usePullStepMutation, useSaveStepMutation } from "@/redux/api/room";
import { Avatar, Button, Grid, Group, Stack, Text } from "@mantine/core";
import { IconMapPin, IconPhone } from "@tabler/icons-react";
import { ConvertHTML } from "@/components/convertHTML";

import classes from "./style.module.css";
import ModalFaceAuth from "./modal";



const Spec: React.FC = () => {
    const [form, setForm] = useState<Record<string, any>>({});
    const [modal, setModal] = useState<boolean>(false);

    const {
        data,
        refetch,
    } = useCallStepQuery(null);
    const [pull] = usePullStepMutation();
    const [save] = useSaveStepMutation();



    const {
        step,
        fields,
        schedule,
    } = useMemo(() => {
        if (!data?.data) return {
            step: null,
            fields: [],
            schedule: null
        };

        const step = data.data;
        const fields: FormCustomField[] = (step.department?.fields || []).map(f => ({
            type: f.type,
            size: 12,
            name: f.name,
            noClear: true,
            data: {
                label: f.label,
                placeholder: f.placeholder,
                data: f.defaultValues || [],
            }
        }));

        return {
            step: step,
            fields: fields,
            schedule: step.schedule
        };
    }, [data]);

    const handleFaceAuth = async (values: Record<string, any>) => {
        setForm(values);
        setModal(true);
    }

    const handleSubmit = async (values: Record<string, any>, profileId: number) => {
        if (!schedule || !step.roomId) return;

        const resultStep = JSON.stringify(values);

        const result = await save({
            result: resultStep,
            scheduleId: schedule.ID,
            roomId: step.roomId,
            specId: profileId,
        })

        if ("error" in result) return;
        refetch();
    }

    const handlePullStep = async () => {
        const result = await pull(null);
        if ("error" in result) return;
        refetch();
    }

    useEffect(() => {
        refetch();
    }, []);



    if (!step) {
        return (
            <Stack h={"100%"} w={"100%"} justify="center" align="center">
                <Button onClick={handlePullStep}>Lấy hồ sơ</Button>
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

                        <Stack className={classes.medical_file} mt={20}>
                            <Text fw={500} style={{ fontSize: 18 }}>Hồ sơ bệnh án</Text>
                            <Group>
                                <Text>Mã hồ sơ:</Text> <Text>{schedule?.code}</Text>
                            </Group>
                            <Stack gap={4} mt={36}>
                                <Group>
                                    <Text>Mô tả:</Text>
                                    <Stack w={"100%"}>
                                        <ConvertHTML
                                            defaultContent={schedule?.description || ""}
                                        />
                                    </Stack>
                                </Group>
                            </Stack>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Stack className={classes.form}>
                            <Text fw={500} style={{ fontSize: 18 }}>Thông số khám bệnh</Text>
                            <FormCustom
                                id="update-step"
                                fields={fields}
                                cbSubmit={handleFaceAuth}
                                clear={false}
                            />
                        </Stack>
                    </Grid.Col>
                </Grid>

                <Group className={classes.option} justify="end">
                    <Button
                        color="green"
                        type="submit"
                        form="update-step"
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

export default Spec;
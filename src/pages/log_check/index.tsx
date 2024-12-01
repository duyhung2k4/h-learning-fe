import React, { useState } from "react";
import TableCRUD from "@/components/table_crud";

import { LogCheckModel } from "@/model/logCheck";
import { Group, Image, Modal, Stack, Text, Tooltip } from "@mantine/core";
import { IconInfoOctagon } from "@tabler/icons-react";



const LogCheck: React.FC = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [logcheck, setLogcheck] = useState<LogCheckModel | null>(null);



    return (
        <>
            <Stack w={"100%"}>
                <TableCRUD
                    model="logcheck"
                    cells={{}}
                    options={[
                        (values) => {
                            const logcheck = values as LogCheckModel

                            return (
                                <>
                                    {

                                        <Tooltip label="Chi tiết">
                                            <IconInfoOctagon 
                                                color="green" 
                                                onClick={() => {
                                                    setModal(true)
                                                    setLogcheck(logcheck);
                                                }}
                                            />
                                        </Tooltip>
                                    }
                                </>
                            )
                        }
                    ]}
                    omit={{
                        Profile: ["Password", "Username"],
                    }}
                    defaultAction={false}
                    preload={["Profile"]}
                    fields={[
                        {
                            type: "text",
                            size: 6,
                            name: "profileId",
                            data: { label: "Label" }
                        },
                        {
                            type: "text",
                            size: 6,
                            name: "accuracy",
                            data: { label: "Độ chính xác" }
                        },
                    ]}
                />
            </Stack>

            <Modal 
                opened={modal} 
                onClose={() => {
                    setModal(false);
                    setLogcheck(null);
                }}
            >
                <Image src={`${import.meta.env.VITE_API}/api/v1/${logcheck?.url}`}/>
                <Stack mt={20} gap={4}>
                    <Group>
                        <Text fw={600}>Tên bác sĩ:</Text>
                        <Text>{logcheck?.Profile?.firstName} {logcheck?.Profile?.lastName}</Text>
                    </Group>
                    <Group>
                        <Text fw={600}>Label:</Text>
                        <Text>{logcheck?.profileId}</Text>
                    </Group>
                    <Group>
                        <Text fw={600}>Độ chính xác:</Text>
                        <Text>{logcheck?.accuracy}</Text>
                    </Group>
                </Stack>
            </Modal>
        </>
    )
}

export default LogCheck;
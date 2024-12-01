import React from "react";
import dayjs from "dayjs";
import TableCRUD from "@/components/table_crud";

import { ScheduleModel } from "@/model/schedule";
import { Badge, Stack, Tooltip } from "@mantine/core";
import { IconFileDescription } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";


export const mapStatus: Record<string, any> = {
    "done": <Badge color="green">Khám xong</Badge>,
    "pending": <Badge color="yellow">Đang chờ</Badge>,
    "transited": <Badge color="orange">Chuyển tuyến</Badge>,
    "finished": <Badge color="cyan">Chờ kết luận</Badge>,
    "examining": <Badge color="indigo">Đang khám</Badge>,
}

const Schedule: React.FC = () => {
    const navigation = useNavigate();



    return (
        <Stack w={"100%"}>
            <TableCRUD
                model="schedule"
                cells={{
                    dob: (values) => {
                        const schedule = values as ScheduleModel
                        return <>{dayjs(schedule.dob).format("DD/MM/YYYY")}</>
                    },
                    status: (values) => {
                        const schedule = values as ScheduleModel
                        return <>{mapStatus[schedule.status]}</>
                    }
                }}
                options={[
                    (values) => {
                        const schedule = values as ScheduleModel

                        return (
                            <>
                                <Tooltip label="Chi tiết hồ sơ">
                                    <IconFileDescription onClick={() => navigation(`${ROUTER.SCHEDULE.href}/${schedule.ID}`)} color="green" />
                                </Tooltip>
                            </>
                        )
                    }
                ]}
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
    )
}

export default Schedule;
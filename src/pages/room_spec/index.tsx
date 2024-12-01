import React, { useEffect, useMemo, useRef, useState } from "react";
import TableCRUD, { TableCRUDCellProps } from "@/components/table_crud";

import { Badge, Group, Stack, Tooltip } from "@mantine/core";
import { DEFAULT_QUERY_DATA, useQueryMutation } from "@/redux/api/query";
import { DepartmentModel } from "@/model/department";
import { RoomModel } from "@/model/room";
import { IconUser } from "@tabler/icons-react";
import { OpenModalAction } from "@/utils/modal";
import { useAddAccountForRoomMutation } from "@/redux/api/room";
import { AddAccountForRoomReq } from "@/dto/request/room";
import { FormCustomField } from "@/components/form";



const RoomSpec: React.FC = () => {
    const tableRef = useRef<any>(null);



    const [departments, setDepartments] = useState<DepartmentModel[]>([]);

    const [query, { isLoading }] = useQueryMutation();
    const [addAccount, { isLoading: loadingAddAccount }] = useAddAccountForRoomMutation();

    const { fields, cells } = useMemo(() => {
        const fields: FormCustomField[] = [
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
            {
                type: "select",
                size: 6,
                name: "roomType",
                noClear: true,
                data: { 
                    label: "Loại phòng khám",
                    value: "room-spec",
                    defaultValue: "room-spec",
                    data: [
                        { label: "Lâm sàng", value: "room-clin" },
                        { label: "Chuyên khoa", value: "room-spec" },
                    ],
                    readOnly: true,
                },
                isCol: false
            },
            {
                type: "select",
                valueType: "number",
                size: 6,
                name: "departmentId",
                data: {
                    label: "Khoa quản lí",
                    data: departments.map(d => ({ label: d.name, value: `${d.ID}` }))
                }
            },
            {
                type: "text",
                size: 12,
                name: "statusAccount",
                data: {
                    label: "Tài khoản"
                },
                isField: false,
            }
        ]

        const cells: TableCRUDCellProps = {
            "departmentId": (values) => {
                const room = values as RoomModel;
                const department = departments.find(d => d.ID === room.departmentId);
                return <>{department && department.name}</>
            },
            "statusAccount": (values) => {
                const room = values as RoomModel;
                return (
                    <Group style={{ cursor: "pointer" }}>
                        {
                            room.profile?.ID ?
                                <Badge color="green">Đã có</Badge> :
                                <Badge color="red">Chưa có</Badge>
                        }
                    </Group>
                )
            },
        }

        return { fields, cells }
    }, [departments]);



    const handleGetDepartment = async () => {
        const result = await query({
            model: "department",
            data: {
                ...DEFAULT_QUERY_DATA,
                method: "get_all",
            }
        });

        if ("error" in result) return;
        const data = result.data.data as DepartmentModel[] || [];
        setDepartments(data);
    }

    const handleAddAccount = async (values: Record<string, any>, room: RoomModel) => {
        if (
            !room.ID ||
            !values?.email ||
            !values?.password ||
            !tableRef?.current
        ) return;
        const payload: AddAccountForRoomReq = {
            roomId: room.ID,
            emailAccept: values.email,
            password: values.password,
        };

        const result = await addAccount(payload);
        if ("error" in result) return;
        const newRoom = result.data.data as RoomModel;
        tableRef.current.changeData(newRoom);
    }

    const modalAddAccount = (values: Record<string, any>) => {
        const room = values as RoomModel
        OpenModalAction({
            title: "Gán tài khoản",
            fields: [
                {
                    type: "text",
                    name: "email",
                    size: 6,
                    data: {
                        label: "Email nhận"
                    }
                },
                {
                    type: "text",
                    name: "password",
                    size: 6,
                    data: {
                        label: "Mật khẩu",
                    }
                }
            ],
            idForm: "add-account",
            cb: (values) => handleAddAccount(values, room),
        });
    }

    useEffect(() => {
        handleGetDepartment();
    }, []);



    return (
        <Stack w={"100%"}>
            <TableCRUD
                ref={tableRef}
                isLoading={isLoading || loadingAddAccount}
                model="room"
                cells={cells}
                condition="room_type = ?"
                args={["room-spec"]}
                preload={["Profile"]}
                omit={{
                    Profile: ["Password", "Username"],
                }}
                options={[
                    (values) => (
                        <>
                            <Tooltip label="Gán tài khoản">
                                <IconUser onClick={() => modalAddAccount(values)} color="green" />
                            </Tooltip>
                        </>
                    )
                ]}
                fields={fields}
            />
        </Stack>
    )
}

export default RoomSpec;
import React, { useRef } from "react";
import TableCRUD from "@/components/table_crud";

import { Badge, Group, Stack, Tooltip } from "@mantine/core";
import { RoomModel } from "@/model/room";
import { IconUser } from "@tabler/icons-react";
import { OpenModalAction } from "@/utils/modal";
import { useAddAccountForRoomMutation } from "@/redux/api/room";
import { AddAccountForRoomReq } from "@/dto/request/room";



const RoomClin: React.FC = () => {
    const tableRef = useRef<any>(null);

    const [addAccount, { isLoading: loadingAddAccount }] = useAddAccountForRoomMutation();



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



    return (
        <Stack w={"100%"}>
            <TableCRUD
                ref={tableRef}
                isLoading={loadingAddAccount}
                model="room"
                cells={{
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
                    }
                }}
                condition="room_type = ?"
                args={["room-clin"]}
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
                    {
                        type: "select",
                        size: 12,
                        name: "roomType",
                        noClear: true,
                        data: { 
                            label: "Loại phòng khám",
                            value: "room-clin",
                            defaultValue: "room-clin",
                            data: [
                                { label: "Lâm sàng", value: "room-clin" },
                                { label: "Chuyên khoa", value: "room-spec" },
                            ],
                            readOnly: true,
                        },
                        isCol: false
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
                ]}
            />
        </Stack>
    )
}

export default RoomClin;
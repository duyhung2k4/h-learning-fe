import React from "react";
import TableCRUD from "@/components/table_crud";
import Cookies from "js-cookie";

import { Badge, Stack, Tooltip } from "@mantine/core";
import { useNavigate } from "react-router";
import { ProfileModel } from "@/model/profile";
import { ROUTER } from "@/constants/router";
import { IconUserPlus } from "@tabler/icons-react";
import { useRegisterMutation } from "@/redux/api/auth";
import { TOKEN_TYPE } from "@/model/variable";

export const mapStatus: Record<string, any> = {
    "active": <Badge color="green">Đã xác nhận</Badge>,
    "none_active": <Badge color="yellow">Chưa xác nhận</Badge>,
}



const AccountDoctor: React.FC = () => {
    const navigation = useNavigate();
    const [post, { isLoading }] = useRegisterMutation();

    const handleAccept = async (profile: ProfileModel) => {
        if (!profile) return;

        const result = await post({
            profileId: profile.ID
        });

        if ("error" in result) {
            console.log(result);
            return;
        }

        const uuid = result.data.data;
        if (!uuid) {
            return;
        }

        Cookies.set(TOKEN_TYPE.PROFILE_UUID_PENDING, uuid, { expires: 24 * 60 * (1 / (24 * 3600)) * 60 });
        navigation(`${ROUTER.FACE_AUTH.href}/${profile.ID}`);
    }



    return (
        <Stack w={"100%"}>
            <TableCRUD
                isLoading={isLoading}
                model="profile"
                cells={{
                    active: (values) => {
                        const profile = values as ProfileModel
                        return <>{profile.active ? mapStatus.active : mapStatus.none_active}</>
                    },
                    role: (values) => {
                        const profile = values as ProfileModel
                        return <>{profile.role === "clin" ? "Lâm sàng" : "Chuyên khoa"}</>
                    },
                }}
                options={[
                    (values) => {
                        const profile = values as ProfileModel

                        return (
                            <>
                                {
                                    profile.active ? <></> :
                                        <Tooltip label="Xác nhận thông tin">
                                            <IconUserPlus onClick={() => handleAccept(profile)} color="green" />
                                        </Tooltip>
                                }
                            </>
                        )
                    }
                ]}
                condition="role IN (?, ?)"
                args={["clin", "spec"]}
                fields={[
                    {
                        type: "text",
                        size: 6,
                        name: "firstName",
                        data: { label: "Họ, tên đệm" }
                    },
                    {
                        type: "text",
                        size: 6,
                        name: "lastName",
                        data: { label: "Tên" }
                    },
                    {
                        type: "text",
                        size: 6,
                        name: "username",
                        data: { label: "Nickname" }
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
                        type: "select",
                        size: 6,
                        name: "role",
                        data: {
                            label: "Vai trò",
                            data: [
                                { label: "Bác sĩ lâm sàng", value: "clin" },
                                { label: "Bác sĩ chuyên khoa", value: "spec" },
                            ]
                        }
                    },
                    {
                        type: "text",
                        size: 6,
                        name: "active",
                        isField: false,
                        data: { label: "Trạng thái" }
                    },
                ]}
            />
        </Stack>
    )
}

export default AccountDoctor;
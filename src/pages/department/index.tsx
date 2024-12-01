import React from "react";
import TableCRUD from "@/components/table_crud";

import { Stack } from "@mantine/core";



const Department: React.FC = () => {



    return (
        <Stack w={"100%"}>
            <TableCRUD
                model="department"
                cells={{}}
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
    )
}

export default Department;
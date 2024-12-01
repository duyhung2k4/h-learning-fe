import React, { useEffect, useMemo, useState } from "react";
import TableCRUD, { TableCRUDCellProps } from "@/components/table_crud";

import { Stack } from "@mantine/core";
import { useParams } from "react-router";
import { DepartmentModel } from "@/model/department";
import { DEFAULT_QUERY_DATA, useQueryMutation } from "@/redux/api/query";
import { FormCustomField } from "@/components/form";



const FieldDetail: React.FC = () => {
    const [department, setDepartment] = useState<DepartmentModel | null>(null);
    const [query, { }] = useQueryMutation();
    const { id } = useParams();


    const { fields, cells } = useMemo(() => {
        const fields: FormCustomField[] = [
            {
                type: "select",
                size: 6,
                name: "departmentId",
                noClear: true,
                valueType: "number",
                data: {
                    label: "Khoa quản lí",
                    value: `${department?.ID}`,
                    defaultValue: `${department?.ID}`,
                    data: [
                        { label: department?.name || "", value: `${department?.ID}` }
                    ],
                    readOnly: true,
                }
            },
            {
                type: "text",
                size: 6,
                name: "name",
                data: { label: "Tên trường dữ liệu", placeholder: "Viết liền ko dấu" }
            },
            {
                type: "text",
                size: 6,
                name: "label",
                data: { label: "Label" }
            },
            {
                type: "text",
                size: 6,
                name: "placeholder",
                data: { label: "Placeholder" }
            },
            {
                type: "select",
                size: 6,
                name: "type",
                data: {
                    label: "Kiểu dữ liệu",
                    data: [
                        { label: "number", value: "number" },
                        { label: "text", value: "text" },
                        { label: "area", value: "area" },
                        { label: "select", value: "select" },
                    ]
                }
            },
            {
                type: "tag",
                size: 6,
                name: "defaultValues",
                data: {
                    label: "Tag select (Chỉ khả dụng cho kiểu select)",
                }
            },
        ]

        const cells: TableCRUDCellProps = {
            departmentId: () => {
                return <>{department && department.name}</>
            }
        }

        return { fields, cells }
    }, [department]);


    const handleGetDepartment = async () => {
        if (!id) return
        const result = await query({
            model: "department",
            data: {
                ...DEFAULT_QUERY_DATA,
                method: "get",
                condition: "id = ?",
                args: [Number(id)],
            }
        });

        if ("error" in result) return
        const data = result.data.data as DepartmentModel || null;
        setDepartment(data);
    }

    useEffect(() => {
        handleGetDepartment();
    }, [id]);



    return (
        <Stack w={"100%"}>
            <TableCRUD
                model="field"
                condition="department_id = ?"
                args={[Number(id || 0)]}
                cells={cells}
                hide={["defaultValues"]}
                fields={fields}
            />
        </Stack>
    )
}

export default FieldDetail;
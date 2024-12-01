import React, { useEffect, useMemo, useState } from "react";

import { DepartmentModel } from "@/model/department";
import { DEFAULT_QUERY_DATA, useQueryMutation } from "@/redux/api/query";
import { Grid, Group, Stack, Text, TextInput, Tooltip } from "@mantine/core";
import { IconExternalLink, IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";



const Field: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [departments, setDepartments] = useState<DepartmentModel[]>([]);

    const [query, { }] = useQueryMutation();
    const navigation = useNavigate();

    const listAfterFilter: DepartmentModel[] = useMemo(() => {
        return departments.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
    }, [departments, search]);



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

    useEffect(() => {
        handleGetDepartment();
    }, []);



    return (
        <Stack
            style={{
                minHeight: "100%",
                width: "100%",
                backgroundColor: "#FFF",
                borderRadius: 16,
                padding: 16,
            }}
        >
            <Group w={"100%"} justify="space-between">
                <Text fw={500}>Danh sách khoa</Text>
                <TextInput
                    leftSection={<IconSearch />}
                    placeholder="Tìm kiếm"
                    miw={300}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </Group>
            <Grid>
                {
                    listAfterFilter.map(d =>
                        <Grid.Col key={d.ID}>
                            <Group
                                w={"100%"}
                                h={50}
                                justify="space-between"
                                style={{
                                    backgroundColor: "#177AE3",
                                    color: "#FFF",
                                    padding: 8,
                                    borderRadius: 16
                                }}
                            >
                                <span>{d.name}</span>
                                <Tooltip label="Đi tới">
                                    <IconExternalLink
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        onClick={() => navigation(`${ROUTER.FIELD.href}/${d.ID}`)}
                                    />
                                </Tooltip>
                            </Group>
                        </Grid.Col>
                    )
                }
            </Grid>
        </Stack>
    )
}

export default Field;
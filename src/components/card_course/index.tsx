import React from "react";

import { Button, Card, Group, Image, Stack, Text } from "@mantine/core";
import { CourseModel } from "@/model/course";
import { useNavigate } from "react-router";

import classes from "./style.module.css";
import textClasses from "@/styles/text.module.css";
import { ROUTER } from "@/constants/router";



const CardCourse: React.FC<CourseModel> = (props) => {
  const navigation = useNavigate();

  const urlThumnail = `${import.meta.env.VITE_API}/api/v1/file/thumbnail_course/${props.thumnail}`;

  const gotoDetail = () => {
    navigation(`${ROUTER.DETAIL_COURSE.href}/${props.ID}`);
  }



  return (
    <Card
      shadow="sm"
      bg={"#0C0C0C"}
      padding={16}
      radius="md"
      h={"100%"}
    >
      <Card.Section>
        <Image
          src={urlThumnail}
          style={{
            width: "100%",
            aspectRatio: "6/3",
          }}
          fit="contain"
          alt="Norway"
        />
      </Card.Section>

      <Stack h={"100%"} justify="space-between" gap={4}>
        <Stack gap={0}>
          <Group justify="space-between">
            <Text
              className={textClasses.limit_1_line}
              fw={600}
              c={"#FFF"}
            >{props.name === "" ? "null" : props.name}</Text>
          </Group>

          <Text
            size="sm"
            c="dimmed"
            className={classes.introduce_course_card}
          >
            {props.introduce === "" ? "null" : props.introduce}
          </Text>
        </Stack>

        <Button
          fullWidth
          mt="md"
          onClick={gotoDetail}
        >
          Chi tiết
        </Button>
      </Stack>
    </Card>
  )
}

export default CardCourse;
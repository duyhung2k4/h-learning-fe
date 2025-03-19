import React, { useEffect, useMemo } from "react";

import { ConvertHTML } from "@/components/convertHTML";
import { useDetailCourseQuery } from "@/redux/api/course";
import { Box, Button, Flex, Group, Image, LoadingOverlay, Stack, Text, useMantineTheme } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { IconArrowLeft } from "@tabler/icons-react";
import { ROUTER } from "@/constants/router";

import textClasses from "@/styles/text.module.css";
import { useCreateCourseRegisterMutation, useDetailCourseRegisterQuery } from "@/redux/api/course_register";



const DetailCourse: React.FC = () => {
  const { id } = useParams();
  const theme = useMantineTheme();
  const navigation = useNavigate();

  const courseId = useMemo(() => {
    return Number(id || 0);
  }, [id]);

  const {
    data: dataDetailCourseRes,
    refetch: refetchDetailCourse,
    isLoading: loadingDetailCourse,
  } = useDetailCourseQuery(courseId);
  const detailCourse = useMemo(() => {
    return dataDetailCourseRes?.data;
  }, [dataDetailCourseRes]);

  const {
    data: dataDetailCourseRegisterRes,
    refetch: refetchDetailCourseRegister,
    isLoading: loadingDetailCourseRegister,
  } = useDetailCourseRegisterQuery(courseId);
  const detailCourseRegister = useMemo(() => {
    return dataDetailCourseRegisterRes?.data
  }, [dataDetailCourseRegisterRes]);

  const [registerCourse, { isLoading: loadingCreateCourse }] = useCreateCourseRegisterMutation();

  const loading = useMemo(() => {
    return (
      loadingDetailCourse ||
      loadingDetailCourseRegister
    )
  }, [
    loadingDetailCourse,
    loadingDetailCourseRegister,
  ]);


  const handleBack = () => {
    if (window.history.length > 1) {
      navigation(-1);
    } else {
      navigation(ROUTER.HOME.href);
    }
  }

  const handleRegisterCourse = async () => {
    try {
      if (!detailCourse || courseId === 0) throw "Course null";
      const result = await registerCourse({ courseId });

      if ("error" in result) throw "Create failed";

      console.log(result);
      refetchDetailCourse();
      refetchDetailCourseRegister();
    } catch (error) {
      console.log(error);
    }
  }

  const gotoCourse = async () => {
    navigation(`${ROUTER.COURSE_LEARNING.href}/${courseId}`);
  }

  useEffect(() => {
    refetchDetailCourse();
    refetchDetailCourseRegister();
  }, [courseId]);



  if (loading) {
    return <LoadingOverlay />
  }

  if (!detailCourse) {
    return (
      <></>
    )
  }

  return (
    <Stack w={"100%"} gap={0}>
      <Box pos={"relative"}>
        <Image
          src={`${import.meta.env.VITE_API}/api/v1/file/thumbnail_course/${detailCourse.thumnail}`}
          style={{
            width: "100%",
            objectFit: "contain",
            aspectRatio: "6/3",
            borderBottom: `2px solid ${theme.colors.violet[0]}`
          }}
        />
        <Group
          style={{
            position: "absolute",
            zIndex: 2,
            top: 8,
            left: 8,
            padding: 4,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255, 0.2)",
            cursor: "pointer",
          }}
          onClick={handleBack}
        >
          <IconArrowLeft size={24} />
        </Group>
      </Box>
      <Stack p={12}>
        <Text className={textClasses.title_page}>{detailCourse.name}</Text>
        <Stack>
          <Text className={textClasses.text_size_md} style={{ width: "100%", textAlign: "center" }}>Giới thiệu</Text>
          <Text style={{ width: "100%", textAlign: "justify" }}>{detailCourse.introduce}</Text>
        </Stack>
        <Stack>
          <Text className={textClasses.text_size_md} style={{ width: "100%", textAlign: "center" }}>Mô tả</Text>
          <ConvertHTML defaultContent={detailCourse.description} />
        </Stack>
      </Stack>

      <Flex p={12}>
        <Button
          loading={loadingCreateCourse}
          w={"100%"}
          onClick={!detailCourseRegister ? handleRegisterCourse : gotoCourse}
        >{detailCourseRegister ? "Đi tới bài học" : "Đăng kí"}</Button>
      </Flex>
    </Stack>
  )
}

export default DetailCourse;
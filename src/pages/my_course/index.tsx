import React, { useEffect, useMemo } from "react";
import {
  Stack,
  Grid,
  Image,
  Text,
  Title,
  Skeleton,
  Alert,
  rem,
  Paper,
  AspectRatio,
  Button,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useAllCourseRegisterQuery } from "@/redux/api/course_register";
import { CourseModel } from "@/model/course";
import { CourseRegisterModel } from "@/model/course_register";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";



const MyCourse: React.FC = () => {
  const { data: dataCourseRes, refetch, isLoading, isError } = useAllCourseRegisterQuery(null);
  const courses = useMemo(() => {
    return dataCourseRes?.data || [];
  }, [dataCourseRes]);

  const navigation = useNavigate();



  const gotoDetail = (courseId: number) => {
    navigation(`${ROUTER.COURSE_LEARNING.href}/${courseId}`);
  }



  useEffect(() => {
    refetch();
  }, []);



  const renderCourseCard = (course: CourseModel) => (
    <Grid.Col key={course.ID} span={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Paper
        key={course.ID}
        p={{ base: 'md', md: 'xl' }}
        shadow="sm"
        bg="dark.8"
        style={{ minHeight: 160 }}
      >
        <AspectRatio ratio={16 / 9}>
          <Image
            src={`${import.meta.env.VITE_API}/api/v1/file/thumbnail_course/${course.thumnail}`}
            alt={course.name}
            style={{ objectFit: 'cover' }}
          />
        </AspectRatio>
        <Text fz={{ base: 'md', md: 'lg' }} fw={500} mb="sm" c="white" lineClamp={2}>
          {course.name}
        </Text>
        <Text fz="sm" c="dimmed" mb="xs" lineClamp={3}>
          {course.introduce}
        </Text>
        <Text fz="sm" c="violet.5" fw={500} truncate>
          Giá: {(course.value / 1000).toFixed(0)}k VND
        </Text>
        <Button
          onClick={() => gotoDetail(course.ID)}
          w={"100%"}
          mt={16}
        >Đi tới bài học</Button>
      </Paper>
    </Grid.Col>
  );

  if (isLoading) {
    return (
      <Grid>
        {[...Array(4)].map((_, index) => (
          <Grid.Col key={index} span={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Skeleton height={350} radius="md" />
          </Grid.Col>
        ))}
      </Grid>
    );
  }

  if (isError) {
    return (
      <Alert
        variant="outline"
        color="red"
        title="Error!"
        icon={<IconAlertCircle style={{ width: rem(16), height: rem(16) }} />}
      >
        Failed to load registered courses. Please try again later.
      </Alert>
    );
  }

  return (
    <Stack gap="xl" p={8}>
      <Title order={1} mb="xl" c="white" fz={{ base: 28, md: 36 }}>
        Khóa học của tôi
      </Title>
      {courses.length === 0 ? (
        <Alert variant="outline">
          Không có khóa học nào, vui lòng đăng kí
        </Alert>
      ) : (
        <Grid gutter="xl">
          {courses.map((item: CourseRegisterModel) =>
            item.course && renderCourseCard(item.course)
          )}
        </Grid>
      )}
    </Stack>
  );
};

export default MyCourse;
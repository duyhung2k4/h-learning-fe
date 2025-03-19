import React, { useEffect } from "react";

import {
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  Paper,
  Grid,
  Image,
  Stack,
  Skeleton,
} from "@mantine/core";
import { IconBook, IconClock, IconCertificate } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";

import bgHome from "@/assets/bg_home.png";
import { useGetAllCourseQuery } from "@/redux/api/course";



const Home: React.FC = () => {
  const navigation = useNavigate();
  const {
    data: courses,
    isLoading,
    refetch,
  } = useGetAllCourseQuery(null);

  // Lấy 3 khóa học đầu tiên hoặc ít hơn nếu không đủ
  const featuredCourses = courses?.data?.slice(0, 3) || [];

  useEffect(() => {
    refetch();
  }, []);



  return (
    <Stack>
      <Container size="lg" py={{ base: 40, md: 80 }}>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }} fw={900} mb="md" c="white">
              Học tập thông minh,
              <br />
              <Text component="span" c="violet.5" inherit>
                Tương lai rộng mở
              </Text>
            </Title>
            <Text size="lg" c="dimmed" mb="xl">
              Nền tảng học online với 5000+ khóa học chất lượng từ các chuyên gia hàng đầu
            </Text>
            <Button
              size="xl"
              radius="md"
              color="violet"
              onClick={() => navigation(ROUTER.FILTER_COURSE.href)}
            >
              Bắt đầu học ngay
            </Button>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              src={bgHome}
              alt="Học online"
              radius="md"
              fit="contain"
            />
          </Grid.Col>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container size="lg" py={{ base: 40, md: 80 }}>
        <Title order={2} ta="center" mb={50} c="white">Giới thiệu</Title>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          <Paper p="xl" shadow="sm" radius="md" bg="dark.8">
            <IconBook size={40} color="var(--mantine-color-violet-5)" />
            <Title order={3} mt="md" c="white">Đa dạng khóa học</Title>
            <Text mt="sm" c="dimmed">Từ lập trình, kinh doanh đến nghệ thuật sáng tạo</Text>
          </Paper>

          <Paper p="xl" shadow="sm" radius="md" bg="dark.8">
            <IconClock size={40} color="var(--mantine-color-violet-5)" />
            <Title order={3} mt="md" c="white">Học mọi lúc</Title>
            <Text mt="sm" c="dimmed">Truy cập 24/7 từ mọi thiết bị</Text>
          </Paper>

          <Paper p="xl" shadow="sm" radius="md" bg="dark.8">
            <IconCertificate size={40} color="var(--mantine-color-violet-5)" />
            <Title order={3} mt="md" c="white">Chứng nhận</Title>
            <Text mt="sm" c="dimmed">Nhận chứng chỉ sau mỗi khóa học</Text>
          </Paper>
        </SimpleGrid>
      </Container>

      {/* Popular Courses */}
      <Stack p={16}>
        <Title order={2} ta="center" mb={50} c="white">
          Khóa học nổi bật
        </Title>

        <Grid gutter="xl">
          {(isLoading ? Array(3).fill(null) : featuredCourses).map(
            (course, index) => (
              <Grid.Col span={{ base: 12, md: 4 }} key={index}>
                <Paper shadow="sm" radius="md" withBorder bg="dark.8">
                  {isLoading ? (
                    <Skeleton height={200} radius="md" />
                  ) : (
                    <Image
                      src={`${import.meta.env.VITE_API}/api/v1/file/thumbnail_course/${course?.thumnail}`}
                      height={200}
                      alt="Khóa học"
                      fit="cover"
                    />
                  )}

                  <div style={{ padding: 20 }}>
                    {isLoading ? (
                      <>
                        <Skeleton height={28} mb="sm" />
                        <Skeleton height={20} />
                        <Skeleton height={36} mt="md" />
                      </>
                    ) : (
                      <>
                        <Title order={4} c="white">
                          {course?.name || "Tên khóa học"}
                        </Title>
                        <Text c="dimmed" mt="sm" lineClamp={3}>
                          {course?.introduce || "Mô tả khóa học..."}
                        </Text>
                        <Button
                          fullWidth
                          mt="md"
                          radius="md"
                          color="violet"
                          onClick={() =>
                            navigation(
                              `${ROUTER.DETAIL_COURSE.href}/${course?.ID}`
                            )
                          }
                        >
                          Đăng ký ngay
                        </Button>
                      </>
                    )}
                  </div>
                </Paper>
              </Grid.Col>
            )
          )}
        </Grid>

        {!isLoading && featuredCourses.length === 0 && (
          <Text ta="center" c="dimmed">
            Hiện chưa có khóa học nào
          </Text>
        )}
      </Stack>
    </Stack>
  );
}

export default Home;
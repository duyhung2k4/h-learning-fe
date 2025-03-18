import React from "react";

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
} from "@mantine/core";
import { IconBook, IconClock, IconCertificate } from "@tabler/icons-react";



const MyCourse: React.FC = () => {
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
            <Button size="xl" radius="md" color="violet">
              Bắt đầu học ngay
            </Button>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              src="/images/hero-education.png"
              alt="Học online"
              radius="md"
              fit="contain"
            />
          </Grid.Col>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container size="lg" py={{ base: 40, md: 80 }}>
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
      <Container size="lg" py={{ base: 40, md: 80 }}>
        <Title order={2} ta="center" mb={50} c="white">Khóa học nổi bật</Title>

        <Grid gutter="xl">
          {[1, 2, 3].map((item) => (
            <Grid.Col span={{ base: 12, md: 4 }} key={item}>
              <Paper shadow="sm" radius="md" withBorder bg="dark.8">
                <Image
                  src={`/images/course-${item}.jpg`}
                  height={200}
                  alt="Khóa học"
                  fit="cover"
                />
                <div style={{ padding: 20 }}>
                  <Title order={4} c="white">Tên khóa học {item}</Title>
                  <Text c="dimmed" mt="sm" lineClamp={3}>
                    Mô tả khóa học với những nội dung hấp dẫn và thú vị...
                  </Text>
                  <Button fullWidth mt="md" radius="md" color="violet">
                    Đăng ký ngay
                  </Button>
                </div>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
}

export default MyCourse;
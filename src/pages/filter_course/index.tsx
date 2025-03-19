import React, { useState } from 'react';
import {
  Title,
  TextInput,
  RangeSlider,
  SimpleGrid,
  Paper,
  Text,
  Button,
  Stack,
  Box,
  AspectRatio,
  Image,
} from '@mantine/core';
import { CourseModel } from '@/model/course';
import { useGetAllCourseQuery } from '@/redux/api/course';
import { useNavigate } from 'react-router';
import { ROUTER } from '@/constants/router';

const FilterCourse: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [valueRange, setValueRange] = useState<[number, number]>([0, 1000000]);

  const { data: courses, isLoading, isError } = useGetAllCourseQuery(null);

  const filteredCourses = courses?.data?.filter((course: CourseModel) => {
    const matchesName = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesValue = course.value >= valueRange[0] && course.value <= valueRange[1];
    return matchesName && matchesValue;
  });

  const navigation = useNavigate();

  const gotoDetail = (courseId: number) => {
    navigation(`${ROUTER.DETAIL_COURSE.href}/${courseId}`);
  }

  return (
    <Stack p={8}>
      <Title order={1} mb="xl" c="white" fz={{ base: 28, md: 36 }}>
        Tìm kiếm khóa học
      </Title>

      <Paper p={{ base: 'md', md: 'xl' }} mb="xl" bg="dark.8">
        <Stack>
          <TextInput
            label="Tìm theo tên"
            placeholder="Nhập tên khóa học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
          />

          <Box>
            <Text size="sm" mb={5}>
              Khoảng giá trị (VND)
            </Text>
            <RangeSlider
              min={0}
              max={1000000}
              step={100000}
              value={valueRange}
              onChange={setValueRange}
              marks={[
                { value: 0, label: '0' },
                { value: 250000, label: '250k' },
                { value: 500000, label: '500k' },
                { value: 750000, label: '750k' },
                { value: 1000000, label: '1tr' },
              ]}
              label={(value) => `${(value / 1000).toFixed(0)}k`}
              styles={{
                markLabel: {
                  transform: 'rotate(-45deg)',
                  marginTop: 8,
                  whiteSpace: 'nowrap'
                },
                thumb: {
                  width: 20,
                  height: 20,
                }
              }}
            />
          </Box>

          <Button
            fullWidth
            onClick={() => {
              setSearchTerm('');
              setValueRange([0, 1000000]);
            }}
            size="md"
          >
            Xóa bộ lọc
          </Button>
        </Stack>
      </Paper>

      {isLoading && <Text ta="center">Đang tải...</Text>}
      {isError && <Text c="red" ta="center">⚠️ Lỗi tải dữ liệu</Text>}

      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="md"
        verticalSpacing={{ base: 'md', md: 'xl' }}
      >
        {filteredCourses?.map((course: CourseModel) => (
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
            <Button onClick={() => gotoDetail(course.ID)} w={"100%"} mt={16}>Chi tiết</Button>
          </Paper>
        ))}
      </SimpleGrid>

      {filteredCourses?.length === 0 && (
        <Text ta="center" c="dimmed" mt="xl" fz="lg">
          🧐 Không tìm thấy kết quả phù hợp
        </Text>
      )}
    </Stack>
  );
}

export default FilterCourse;
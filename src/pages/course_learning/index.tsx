import React, { useEffect, useMemo, useState } from 'react';
import {
  Paper,
  Title,
  Text,
  Group,
  Button,
  Stack,
  Skeleton,
  useMantineTheme,
  Box,
} from '@mantine/core';
import { IconArrowLeft, IconChevronDown } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router';
import { useDetailCourseQuery } from '@/redux/api/course';
import { ConvertHTML } from '@/components/convertHTML';
import { ROUTER } from '@/constants/router';



const CourseDetail: React.FC = () => {
  const theme = useMantineTheme();

  const navigation = useNavigate();

  const { id } = useParams();
  const courseId = useMemo(() => {
    return Number(id || 0);
  }, [id]);

  const {
    data: dataCourseRes,
    refetch: refetchCourseRes,
    isLoading,
  } = useDetailCourseQuery(courseId);
  const course = useMemo(() => {
    return dataCourseRes?.data;
  }, [dataCourseRes]);

  const [expandedChapters, setExpandedChapters] = useState<Record<number, boolean>>({});

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigation(-1);
    } else {
      navigation(ROUTER.MY_COURSE.href);
    }
  }

  const gotoLession = (lessionId: number) => {
    navigation(`${ROUTER.LESSION_LEARNING.href}/${lessionId}`);
  }



  useEffect(() => {
    refetchCourseRes();
  }, [courseId]);



  if (isLoading) {
    return (
      <Stack>
        <Skeleton height={50} width="40%" />
        <Skeleton height={20} />
        <Skeleton height={20} width="60%" />
        {[...Array(3)].map((_, idx) => (
          <Skeleton key={idx} height={100} mt="md" />
        ))}
      </Stack>
    );
  }

  if (!course) return <></>

  return (
    <Stack gap="lg" p={8}>
      <Group justify="space-between" align="start">
        <IconArrowLeft
          size={24}
          onClick={handleBack}
          style={{ cursor: "pointer" }}
        />
        <Box flex={1}>
          <Title order={4}>{course.name}</Title>
        </Box>
      </Group>

      <ConvertHTML defaultContent={course.description} />

      {course.chapters?.length === 0 ? (
        <Paper p="md" bg={theme.colors.dark[6]} withBorder>
          <Text c="dimmed">No chapters available</Text>
        </Paper>
      ) : (
        course.chapters?.map((chapter) => (
          <Paper
            key={chapter.ID}
            p="md"
            bg={theme.colors.dark[7]}
            withBorder
            shadow="sm"
          >
            <Group justify="space-between">
              <Group gap="sm">
                <Title order={4}>{chapter.name}</Title>
              </Group>

              <motion.div
                animate={{ rotate: expandedChapters[chapter.ID] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="subtle"
                  p={4}
                  onClick={() => toggleChapter(chapter.ID)}
                >
                  <IconChevronDown size={20} />
                </Button>
              </motion.div>
            </Group>

            <AnimatePresence>
              {expandedChapters[chapter.ID] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Stack mt="md" gap="xs">
                    {chapter.lessions?.map((lesson) => (
                      <Paper
                        key={lesson.ID}
                        p="sm"
                        bg={theme.colors.dark[8]}
                        style={{ borderRadius: theme.radius.sm }}
                        onClick={() => gotoLession(lesson.ID)}
                      >
                        <Group gap="sm">
                          <Text c="dimmed">{lesson.order}.</Text>
                          <Text>{lesson.name}</Text>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>
          </Paper>
        ))
      )}
    </Stack>
  );
};

export default CourseDetail;
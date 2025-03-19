import React, { useEffect } from "react";
import VideoPlayer from "./videoPlay";

import { useDetailLessionQuery } from "@/redux/api/lession";
import { Button, Flex, Stack, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { ROUTER } from "@/constants/router";
import { IconArrowLeft } from "@tabler/icons-react";



const LessionLearning: React.FC = () => {
  const { id } = useParams();
  const lessionId = Number(id || 0);

  const navigation = useNavigate();

  const {
    data: lessionDataRes,
    refetch: refetchLession,
  } = useDetailLessionQuery(lessionId);
  const lession = lessionDataRes?.data;



  const handleBack = () => {
    if (window.history.length > 1) {
      navigation(-1);
      return;
    }

    if(!lession?.course) {
      navigation(ROUTER.MY_COURSE.href);
      return;
    }

    navigation(`${ROUTER.COURSE_LEARNING.href}/${lession.course.ID}`);
  }



  useEffect(() => {
    refetchLession();
  }, [lessionId]);



  if (!lession?.videoLession) {
    return (
      <Stack 
        align="center"
        justify="center"
        h={"100vh"}
      >
        <Text>Bài học không có video</Text>
        <Button onClick={handleBack}>Quay lại</Button>
      </Stack>
    )
  }

  return (
    <Stack p={8}>
      <Flex align="center" gap={8} mt={8}>
        <IconArrowLeft onClick={handleBack} style={{ cursor: "pointer" }} size={24}/>
        <Text>{lession.name}</Text>
      </Flex>
      {lession.videoLession && <VideoPlayer videoLession={lession.videoLession} />}
    </Stack>
  )
}

export default LessionLearning;
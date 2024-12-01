import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

import { TOKEN_TYPE } from "@/model/variable";
import { Group, Progress, Stack, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { ROUTER } from "@/constants/router";
import { useSendFileAuthMutation } from "@/redux/api/auth";



const FaceAuth: React.FC = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [_, setLoad] = useState<boolean>(false);
    const [process, setProcess] = useState<number>(0);

    const uuid = Cookies.get(TOKEN_TYPE.PROFILE_UUID_PENDING);
    const { id } = useParams();
    const [post] = useSendFileAuthMutation();
    const navigation = useNavigate();

    useEffect(() => {
        if (!uuid) return;
        const ws = new WebSocket(`${import.meta.env.VITE_ART_PIXEL_SOCKET}/auth?uuid=${uuid}`);

        ws.onopen = () => {
            setWs(ws);
        }
    }, [uuid]);

    useEffect(() => {
        if (!ws || !id) return;
        console.log("cc")
        ws.onmessage = (data) => {
            console.log(data.data);
            if (data.data === "done") {
                navigation(`${ROUTER.SAVE_PROCESS.href}/${id}`);
                return
            }
            if (data.data === "not enough data") {
                setProcess((prevProcess) => prevProcess + 1);
            }
            setLoad(false);
            captureFrameAsImage();
        }
    }, [ws, id]);

    const sendMessage = async (dataBase64: string) => {
        if (!uuid) return;
        // if (!ws) return
        await post({
            data: dataBase64,
            profileId: Number(id),
            uuid: uuid,
        });

        // const imageBase64 = dataBase64.split(",")[1];
        // if (!imageBase64) return

        // console.log("send");

        // ws.send(JSON.stringify({
        //     type: "send_file_auth_face",
        //     auth: Cookies.get(TOKEN_TYPE.PROFILE_UUID_PENDING),
        //     data: {
        //         data: imageBase64,
        //     },
        // }));
        // setLoad(true);
    }







    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const captureFrameAsImage = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        // Đặt kích thước canvas bằng với kích thước video
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        // Tính toán đường kính và bán kính
        const diameter = Math.min(canvas.width, canvas.height);
        const radius = diameter / 2;

        // Vẽ hình tròn
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.clip(); // Cắt canvas theo hình tròn

        // Vẽ video lên canvas
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Lấy hình ảnh từ canvas dưới dạng base64
        const imageDataUrl = canvas.toDataURL("image/png");
        sendMessage(imageDataUrl); // Gửi hình ảnh đến server
    };

    useEffect(() => {
        if (!ws) return

        const getCameraStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    captureFrameAsImage();
                }
            } catch (error) {
                console.error("Lỗi khi truy cập camera:", error);
            }
        };

        getCameraStream();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, [ws]);


    if (!ws) {
        return (<>Not ws</>)
    }



    return (
        <>
            <Group
                justify="center"
                align="center"
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Lớp phủ đen với độ trong suốt 50%
                    }}
                ></div>
                <Stack h={"100vh"} justify="center" align="center">
                    <div
                        style={{
                            overflow: "hidden",
                            height: 300,
                            width: 300,
                            borderRadius: "50%", // Tạo hình tròn
                            position: "relative", // Để sử dụng vị trí tương đối cho canvas
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover", // Đảm bảo video lấp đầy khung
                                borderRadius: "50%", // Tạo hình tròn cho video
                                transform: "scaleX(-1)"
                            }}
                        />
                        <canvas ref={canvasRef} width={640} height={480} style={{ display: "none" }} />
                    </div>
                    <Text>Đưa mặt ra chính giữa</Text>
                    <Group w={"100%"} justify="center">
                        <Progress
                            value={process <= 5 ? ((process * 100) / 5) : 100}
                            color="green"
                            w={500}
                        />
                    </Group>
                </Stack>
            </Group>
        </>
    )
}

export default FaceAuth;
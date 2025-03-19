// Thêm interface này ở đầu file
declare global {
  interface ScreenOrientation {
    lock(orientation: string): Promise<void>;
    unlock(): void;
  }
}

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Hls from 'hls.js';

import { VideoLessionModel } from '@/model/video_lession';
import { Box, Group, Slider, Stack } from '@mantine/core';
import { IconMaximize, IconMaximizeOff, IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';

import iconClass from "@/styles/icon.module.css";


interface VideoPlayerProps {
  videoLession: VideoLessionModel;
}

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const boxVideoRef = useRef<HTMLDivElement | null>(null);

  const [isLandscape, setIsLandscape] = useState(false);

  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<number | null>(null);

  const videoSrc = useMemo(() => {
    const uuid = props.videoLession.code;
    const quantity = '360p';
    const filename = `index.m3u8`;
    return `${import.meta.env.VITE_UPLOAD_VIDEO_HLS}/api/v1/video/${uuid}/${quantity}/${filename}`;
  }, [props.videoLession]);

  useEffect(() => {
    const video = videoRef.current;

    if (video && !isDragging) {
      const updateProgress = () => {
        if (video.duration > 0) {
          setCurrentTime(video.currentTime);
          setDuration(video.duration);
          setProgress((video.currentTime / video.duration) * 100);
        }
      };

      video.addEventListener('timeupdate', updateProgress);

      return () => {
        video.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [isDragging]);

  useEffect(() => {
    const boxVideo = boxVideoRef.current;

    const checkFullscreen = async () => {
      if (!boxVideo) return;

      const fullscreen = document.fullscreenElement === boxVideo;
      setIsFullscreen(fullscreen);

      if (fullscreen && isMobile()) {
        await lockOrientation();
      } else if (!fullscreen && isMobile()) {
        await unlockOrientation();
      }
    };

    document.addEventListener('fullscreenchange', checkFullscreen);
    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (video && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      return () => {
        hls.destroy();
      };
    } else if (video && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }, [videoSrc]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayVideo = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const handleSliderChange = (value: number) => {
    setProgress(value); // Cập nhật khi kéo
  };

  const handleSliderChangeEnd = (value: number) => {
    const video = videoRef.current;
    if (video && video.duration > 0) {
      video.currentTime = (value / 100) * video.duration; // Cập nhật thời gian phát
    }
    setIsDragging(false); // Thoát trạng thái kéo
  };

  const toggleFullscreen = async () => {
    const boxVideo = boxVideoRef.current;
    if (!boxVideo) return;

    try {
      if (!isFullscreen) {
        await boxVideo.requestFullscreen();
        if (isMobile()) {
          await lockOrientation();
        }
      } else {
        await document.exitFullscreen();
        if (isMobile()) {
          await unlockOrientation();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const lockOrientation = async () => {
    try {
      if (
        isMobile() &&
        screen.orientation &&
        'lock' in screen.orientation
      ) {
        await screen.orientation.lock('landscape');
        setIsLandscape(true);
      }
    } catch (e) {
      console.error('Orientation lock failed:', e);
    }
  };

  const unlockOrientation = async () => {
    try {
      if (
        screen.orientation &&
        'unlock' in screen.orientation
      ) {
        await screen.orientation.unlock();
        setIsLandscape(false);
      }
    } catch (e) {
      console.error('Orientation unlock failed:', e);
    }
  };

  // Thêm hiệu ứng CSS cho điện thoại
  const videoStyles = useMemo(() => ({
    position: 'relative' as const,
    zIndex: 1,
    display: 'block',
    width: '100%',
    cursor: 'pointer',
    transform: isLandscape ? 'rotate(90deg)' : 'none',
    transformOrigin: 'center center',
    transition: 'transform 0.3s ease',
  }), [isLandscape]);



  return (
    <Stack w={'100%'} align="center">
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={boxVideoRef}
        // Thêm style cho container
        style={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 8,
          backgroundColor: 'black',
          transform: isLandscape ? 'rotate(90deg)' : 'none',
          ...(isLandscape && isMobile() ? {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vh',
            height: '100vw',
            transform: 'rotate(90deg) translateX(100%)',
            transformOrigin: 'left top',
            zIndex: 9999
          } : {})
        }}
      >

        <video
          ref={videoRef}
          controls={false}
          style={videoStyles}
          onClick={handlePlayVideo}
        />



        <Stack
          style={{
            position: 'absolute',
            display: isHovered || videoRef.current?.paused ? undefined : "none",
            bottom: 0,
            width: '100%',
            alignItems: 'center',
            zIndex: 2,
            padding: '16px 0px',
            background: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
          }}
        >
          <Stack w={'95%'} gap={4}>
            <Slider
              value={progress}
              onChange={handleSliderChange}
              onChangeEnd={handleSliderChangeEnd}
              min={0}
              max={100}
              label={null}
              onMouseMove={(event) => {
                const sliderRect = event.currentTarget.getBoundingClientRect();
                const x = event.clientX - sliderRect.left;
                const percentage = Math.min(100, Math.max(0, (x / sliderRect.width) * 100));

                setHoveredValue(percentage);
                setTooltipPosition(x);
              }}
              onMouseLeave={() => {
                setHoveredValue(null);
                setTooltipPosition(null);
              }}
              styles={{
                track: { height: 6 },
                thumb: { display: 'block', width: 10, height: 10 },
              }}
            />

            <Group justify="space-between">
              <Group justify="start">
                {videoRef.current?.paused ? (
                  <IconPlayerPlayFilled className={iconClass.icon} onClick={handlePlayVideo} />
                ) : (
                  <IconPlayerPauseFilled className={iconClass.icon} onClick={handlePlayVideo} />
                )}
                <span style={{ color: 'white', fontSize: '14px', marginLeft: '8px' }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </Group>
              <Group justify="end">
                {isFullscreen ? (
                  <IconMaximizeOff className={iconClass.icon} onClick={toggleFullscreen} />
                ) : (
                  <IconMaximize className={iconClass.icon} onClick={toggleFullscreen} />
                )}
              </Group>
            </Group>
          </Stack>


          {hoveredValue !== null && tooltipPosition !== null && (
            <Box
              style={{
                position: 'absolute',
                top: -30,
                left: tooltipPosition,
                backgroundColor: 'black',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
              }}
            >
              {formatTime((hoveredValue / 100) * duration)}
            </Box>
          )}
        </Stack>



      </Box>
    </Stack>
  );
};

export default VideoPlayer;

import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import { useSelector } from 'react-redux';
import { useForm } from '@mantine/form';
import {
  Container,
  Title,
  TextInput,
  Button,
  Stack,
  LoadingOverlay,
  Avatar,
  Group,
  Box,
  rem,
  Divider,
} from '@mantine/core';
import { RootState } from '@/redux/store';
import { useRefreshTokenMutation, useUpdateProfileMutation } from '@/redux/api/auth';
import { useNotification } from '@/hook/notification.hook';
import { TOKEN_TYPE } from '@/model/variable';
import { ROUTER } from '@/constants/router';
import { useNavigate } from 'react-router';



const Account: React.FC = () => {
  const { profile } = useSelector((state: RootState) => state.authSlice);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useUpdateProfileMutation();
  const [refresh, { isLoading: loadingRefreshToken }] = useRefreshTokenMutation();
  const noti = useNotification();
  const navigation = useNavigate();

  const form = useForm<FormUpdateProfile>({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      username: '',
      password: '',
      active: false,
      roleId: 0,
      organizationId: undefined,
    },

    validate: {
      firstName: (value) => (value.trim().length < 2 ? 'Tên phải có ít nhất 2 ký tự' : null),
      lastName: (value) => (value.trim().length < 2 ? 'Họ phải có ít nhất 2 ký tự' : null),
      phone: (value) => (/^\+?[0-9]{10,15}$/.test(value) ? null : 'Số điện thoại không hợp lệ'),
    },
  });

  useEffect(() => {
    if (profile) {
      form.setValues({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        email: profile.email,
        username: profile.username,
        active: profile.active,
        roleId: profile.roleId,
        organizationId: profile.organizationId,
      });
    }
  }, [profile]);

  const handleLogout = () => {
    Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
    Cookies.remove(TOKEN_TYPE.REFRESH_TOKEN);

    navigation(ROUTER.LOGIN.href);
  }

  const handleSubmit = async (values: Partial<FormUpdateProfile>) => {
    try {
      const result = await updateProfile({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      });

      if ("error" in result) throw "Chỉnh sửa thất bại";
      noti.success("Cập nhật thông tin thành công!");
      refresh(null);
    } catch (error) {
      noti.error(`Lỗi khi cập nhật: ${error}`);
    }
  };

  return (
    <Container size="md" py="xl" px="md">
      <Box mb={rem(40)}>
        <Title order={2} size={rem(24)} mb="sm" c="dark.4">
          Tài khoản cá nhân
        </Title>

        <Group justify="center" mb="xl">
          <Avatar
            size={rem(120)}
            radius="50%"
            color="violet"
            style={{
              border: `${rem(2)} solid var(--mantine-color-gray-3)`,
              cursor: 'pointer'
            }}
          >
            {profile?.firstName?.[0]}
            {profile?.lastName?.[0]}
          </Avatar>
        </Group>
      </Box>

      <Box maw={rem(600)} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay
            visible={loadingRefreshToken}
            overlayProps={{ blur: 1.5 }}
            loaderProps={{ type: 'bars' }}
          />

          <Stack gap="lg">
            <Group grow>
              <TextInput
                label="Họ"
                placeholder="Nhập họ của bạn"
                required
                radius="md"
                {...form.getInputProps('lastName')}
              />
              <TextInput
                label="Tên"
                placeholder="Nhập tên của bạn"
                required
                radius="md"
                {...form.getInputProps('firstName')}
              />
            </Group>

            <TextInput
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              required
              radius="md"
              {...form.getInputProps('phone')}
            />

            <TextInput
              label="Email"
              placeholder="Địa chỉ email"
              readOnly
              radius="md"
              {...form.getInputProps('email')}
            />

            <Button
              type="submit"
              size="md"
              loading={loadingUpdateProfile}
              radius="md"
              mt="md"
              w={"100%"}
            >
              Lưu thay đổi
            </Button>
            <Divider my="md" />

            <Button variant="outline" onClick={handleLogout}>Đăng xuất</Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default Account;

type FormUpdateProfile = {
  firstName: string
  lastName: string
  phone: string
  email: string
  username: string
  password: string
  active: boolean
  roleId: number
  organizationId?: number
}
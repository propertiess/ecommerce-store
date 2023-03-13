import { useState } from 'react';
import {
  Anchor,
  Box,
  Button,
  Group,
  PasswordInput,
  TextInput
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { AuthService } from '@/services/auth/auth.service';
import { useAuthStore } from '@/store/auth/Auth';
import { AuthUser } from '@/types';
import { getBase64 } from '@/utils/helpers/getBase64';
import { showErrorNotification } from '@/utils/helpers/notifications';

const schema = z.object({
  username: z.string().min(4, { message: 'Должно быть больше 4 символов' }),
  password: z.string().min(4, { message: 'Должно быть больше 4 символов' })
});

export const AuthorizationScreen = () => {
  const [type, setType] = useState<'register' | 'login'>('login');
  const router = useRouter();

  const { setAuthToken } = useAuthStore();

  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    },
    validate: zodResolver(schema)
  });

  const onAuthorize = async (values: AuthUser) => {
    try {
      const data = await AuthService[type](values);

      const token = getBase64(data.roles);
      token && setAuthToken(token);
      router.push('/');
    } catch (e) {
      if (e instanceof AxiosError && e.response?.data?.detail) {
        showErrorNotification(e.response?.data?.detail);
      }
      console.error(e);
    }
  };

  return (
    <Box
      w={{
        xs: '-1rem'
      }}
      className='mx-auto mt-5 border border-solid border-black/10 p-5 sm:w-96'
    >
      <form onSubmit={form.onSubmit(onAuthorize)}>
        <TextInput label='Логин' {...form.getInputProps('username')} />
        <PasswordInput
          mt='md'
          label='Пароль'
          {...form.getInputProps('password')}
        />

        <Group position='right' mt='lg'>
          {type === 'login' ? (
            <>
              <Anchor component='button' onClick={() => setType('register')}>
                Не имеете аккаунт? Зарегистрироваться
              </Anchor>
              <Button type='submit'>Войти</Button>
            </>
          ) : (
            <>
              <Anchor component='button' onClick={() => setType('login')}>
                Имеете аккаунт? Войти
              </Anchor>

              <Button type='submit'>Зарегистрироваться</Button>
            </>
          )}
        </Group>
      </form>
    </Box>
  );
};

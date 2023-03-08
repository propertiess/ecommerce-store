import { useState } from 'react';
import {
  Anchor,
  Box,
  Button,
  Flex,
  PasswordInput,
  TextInput
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import { Layout } from '@/layout';

const schema = z.object({
  username: z.string().min(5, { message: 'Должно быть больше 5 символов' }),
  password: z.string().min(5, { message: 'Должно быть больше 5 символов' })
});

const Authorization = () => {
  const [type, setType] = useState<'signup' | 'login'>('login');

  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    },
    validate: zodResolver(schema)
  });

  return (
    <Layout title='Авторизация'>
      <Box
        w='30rem'
        className='mx-auto mt-5 border border-solid border-black/10 p-5'
      >
        <form onSubmit={form.onSubmit(values => values)}>
          <TextInput label='Логин' {...form.getInputProps('username')} />
          <PasswordInput
            mt='md'
            label='Пароль'
            {...form.getInputProps('password')}
          />

          <Flex justify='space-between' mt='lg'>
            {type === 'login' ? (
              <>
                <Anchor component='button' onClick={() => setType('signup')}>
                  Не имеете аккаунта? Зарегистрироваться
                </Anchor>
                <Button type='submit'>Войти</Button>
              </>
            ) : (
              <>
                <Anchor component='button' onClick={() => setType('login')}>
                  Имеете аккаунта? Войти
                </Anchor>

                <Button type='submit'>Зарегистрироваться</Button>
              </>
            )}
          </Flex>
        </form>
      </Box>
    </Layout>
  );
};

export default Authorization;

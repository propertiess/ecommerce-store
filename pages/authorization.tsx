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
        w={{
          xs: '-1rem'
        }}
        className='mx-auto mt-5 border border-solid border-black/10 p-5 sm:w-96'
      >
        <form onSubmit={form.onSubmit(values => values)}>
          <TextInput label='Логин' {...form.getInputProps('username')} />
          <PasswordInput
            mt='md'
            label='Пароль'
            {...form.getInputProps('password')}
          />

          <Group position='right' mt='lg'>
            {type === 'login' ? (
              <>
                <Anchor component='button' onClick={() => setType('signup')}>
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
    </Layout>
  );
};

export default Authorization;

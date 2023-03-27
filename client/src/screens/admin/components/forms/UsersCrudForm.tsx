import { Button, Group, PasswordInput, Select, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import { User } from '@/types';
import { RoleEnum } from '@/utils/consts';

const schema = z.object({
  username: z.string().min(4, { message: 'Нужно больше 4 символов' }),
  password: z.string().min(4, { message: 'Нужно больше 4 символов' }),
  roles: z.string()
});

type Props = {
  user: User | Omit<User, 'id'> | null;
  onSave: (user: User | Omit<User, 'id'>) => void;
};

export const UsersCrudForm = ({ user, onSave }: Props) => {
  const form = useForm<User | Omit<User, 'id'>>({
    initialValues: (user && { ...user, password: '' }) ?? {
      username: '',
      password: '',
      roles: 'USER'
    },
    validate: zodResolver(schema)
  });

  return (
    <form onSubmit={form.onSubmit(values => onSave(values))}>
      <TextInput label='Логин' {...form.getInputProps('username')} />
      <PasswordInput
        label='Пароль'
        mt='sm'
        {...form.getInputProps('password')}
      />
      <Select
        mt='sm'
        label='Роль'
        data={[
          {
            value: RoleEnum.ADMIN,
            label: RoleEnum.ADMIN
          },
          {
            value: RoleEnum.USER,
            label: RoleEnum.USER
          }
        ]}
        {...form.getInputProps('roles')}
      />

      <Group position='right' mt='xl'>
        <Button type='submit'>Сохранить</Button>
      </Group>
    </form>
  );
};

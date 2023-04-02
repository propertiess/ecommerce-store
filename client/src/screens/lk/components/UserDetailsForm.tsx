import { Button, Group, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import validator from 'validator';
import { z } from 'zod';

import { UserDetailsService } from '@/services/user-details/user-details.service';
import { TUserDetails } from '@/types';
import { DetailsDictionary, initialFieldsUserDetails } from '@/utils/consts';

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(4).max(15),
  lastName: z.string().min(4).max(15),
  phone: z.string().refine(validator.isMobilePhone, {
    message: 'Не является телефонным номером!'
  })
});

type Props = Omit<TUserDetails, 'userId'> & {
  onClose: () => void;
};

export const UserDetailsForm = (props?: Props) => {
  const form = useForm<Omit<TUserDetails, 'userId'>>({
    initialValues: { ...initialFieldsUserDetails, ...props },
    validate: zodResolver(schema)
  });

  const onSubmit = async (values: Omit<TUserDetails, 'userId'>) => {
    if (!('userId' in values)) {
      return;
    }

    try {
      await UserDetailsService.post(values as TUserDetails);
    } catch (e) {
      console.error(e);
    }

    props?.onClose();
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        label={DetailsDictionary.email}
        {...form.getInputProps('email')}
      />
      <TextInput
        label={DetailsDictionary.firstName}
        {...form.getInputProps('firstName')}
      />
      <TextInput
        label={DetailsDictionary.lastName}
        {...form.getInputProps('lastName')}
      />
      <TextInput
        label={DetailsDictionary.phone}
        {...form.getInputProps('phone')}
      />
      <Group position='right'>
        <Button type='submit'>Изменить</Button>
      </Group>
    </form>
  );
};

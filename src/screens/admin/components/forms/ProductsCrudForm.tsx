import { Button, Group, NumberInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import { Product } from '@/types';

const schema = z.object({
  title: z
    .string()
    .min(5, { message: 'Название товара должно иметь больше 5 символов' }),
  description: z
    .string()
    .min(10, { message: 'Описание товара должно иметь больше 10 символов' }),
  img: z.string().url(),
  price: z
    .number()
    .min(100, { message: 'Значение цены должно быть больше 100' })
});

type Props = {
  product: Product | null;
  onSave: (product: Product | Omit<Product, 'id'>) => void;
};

export const ProductsCrudForm = ({ product, onSave }: Props) => {
  const form = useForm<Product | Omit<Product, 'id'>>({
    initialValues: product ?? {
      title: '',
      img: '',
      price: 0,
      description: ''
    },
    validate: zodResolver(schema)
  });

  return (
    <form onSubmit={form.onSubmit(values => onSave(values))}>
      <TextInput label='title' {...form.getInputProps('title')} />
      <TextInput
        label='description'
        mt='sm'
        {...form.getInputProps('description')}
      />
      <NumberInput label='price' mt='sm' {...form.getInputProps('price')} />
      <TextInput label='img' mt='sm' {...form.getInputProps('img')} />
      <Group position='right' mt='xl'>
        <Button type='submit'>Сохранить</Button>
      </Group>
    </form>
  );
};

import { Button, Group, NumberInput, Select, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import { Product } from '@/types';
import { ProductCategories } from '@/utils/consts';

const schema = z.object({
  title: z
    .string()
    .min(5, { message: 'Название товара должно иметь больше 5 символов' }),
  description: z
    .string()
    .min(10, { message: 'Описание товара должно иметь больше 10 символов' })
    .max(150, { message: 'Описание товара должно быть меньше 150 символов' }),
  img: z.string().url(),
  price: z
    .number()
    .min(100, { message: 'Значение цены должно быть больше 100' }),
  category: z.string(),
  rating: z.number()
});

type Props = {
  product: Product | Omit<Product, 'id'> | null;
  onSave: (product: Product | Omit<Product, 'id'>) => void;
};

const categoryData = ProductCategories.map(category => ({
  value: category,
  label: category
}));

export const ProductsCrudForm = ({ product, onSave }: Props) => {
  const form = useForm<Product | Omit<Product, 'id'>>({
    initialValues: product ?? {
      title: '',
      img: '',
      price: 0,
      description: '',
      category: 'MEN',
      rating: 0
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
      <NumberInput label='rating' mt='sm' {...form.getInputProps('rating')} />
      <Select
        label='category'
        data={categoryData}
        mt='sm'
        {...form.getInputProps('category')}
      />
      <Group position='right' mt='xl'>
        <Button type='submit'>Сохранить</Button>
      </Group>
    </form>
  );
};

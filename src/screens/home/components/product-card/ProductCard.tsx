import {
  Button,
  Card,
  Center,
  Group,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

import { Product } from '@/types';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const [added, { toggle }] = useDisclosure(false);

  return (
    <Card withBorder h='100%'>
      <Card.Section pt='sm'>
        <Stack className='relative mx-auto h-52'>
          <Image
            className='object-contain'
            sizes='100%'
            src={product.img}
            alt={product.title}
            fill={true}
            priority={product.id < 5}
          />
        </Stack>
      </Card.Section>
      <Center mt='md'>
        {product.title.length > 'Mens Casual Slim Fit'.length ? (
          <Tooltip label={product.title} withinPortal>
            <Text weight={500}>
              {product.title.slice(0, 'Mens Casual Slim Fit'.length - 3) +
                '...'}
            </Text>
          </Tooltip>
        ) : (
          <Text weight={500}>{product.title}</Text>
        )}
      </Center>
      <Group grow align='center' mt='md'>
        <Text>{product.price} $</Text>
        {!added ? (
          <Button variant='light' color='blue' radius='md' onClick={toggle}>
            Купить
          </Button>
        ) : (
          <Button variant='light' color='red' radius='md' onClick={toggle}>
            Убрать
          </Button>
        )}
      </Group>
    </Card>
  );
};

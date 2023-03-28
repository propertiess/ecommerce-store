import {
  Button,
  Card,
  Center,
  Group,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import Image from 'next/image';

import { Car } from '@/screens/cars/types';
import { convertCurrency } from '@/utils/helpers/convertCurrency';

type Props<T> = {
  goods: T;
  added: boolean;
  withToolTip?: boolean;
  maxLengthTitle?: number;
  onAdded: (id: number) => void;
  onCancel: (id: number) => void;
  disabled?: boolean;
};

export const GoodsCard = <T extends Omit<Car, ''>>({
  goods,
  added,
  maxLengthTitle = 20,
  withToolTip = false,
  onAdded,
  onCancel,
  disabled = false
}: Props<T>) => {
  return (
    <Card withBorder h='100%'>
      <Card.Section pt='sm'>
        <Stack className='relative mx-auto h-52'>
          <Image
            className='object-contain'
            sizes='100%'
            src={goods.img}
            alt={goods.title}
            fill={true}
          />
        </Stack>
      </Card.Section>
      <Center mt='md'>
        {withToolTip && goods.title.length > maxLengthTitle ? (
          <Tooltip label={goods.title} withinPortal={true}>
            <Text weight={500}>
              {goods.title.slice(0, maxLengthTitle) + '...'}
            </Text>
          </Tooltip>
        ) : (
          <Text weight={500}>{goods.title}</Text>
        )}
      </Center>
      <Group grow align='center' mt='md'>
        <Text>{convertCurrency(goods.price)}</Text>
        {!added ? (
          <Button
            variant='light'
            color='blue'
            radius='md'
            onClick={() => onAdded(goods.id)}
            disabled={disabled}
          >
            Купить
          </Button>
        ) : (
          <Button
            variant='light'
            color='red'
            radius='md'
            onClick={() => onCancel(goods.id)}
            disabled={disabled}
          >
            Убрать
          </Button>
        )}
      </Group>
    </Card>
  );
};

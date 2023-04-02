import { Button, Card, Group, Title, Tooltip } from '@mantine/core';
import Image from 'next/image';
import { Discount, DiscountOff } from 'tabler-icons-react';

import { Bonus } from '../types';

type Props = Bonus & {
  onAddedBonus: (percent: number) => void;
  disabled?: boolean;
};

export const BonusCard = (props: Props) => {
  return (
    <Card>
      <Image
        width={150}
        height={150}
        className='mx-auto block object-contain'
        src={props.img}
        alt={props.title}
      />
      <Title>Скидка {props.title}</Title>
      <Tooltip
        label={
          props.disabled
            ? 'Купоны больше недоступны для Вашего аккаунта, либо нужно пройти регистрацию!'
            : 'Выбрать купон можно один раз. Данное действие нельзя будет повторить!'
        }
        withinPortal={true}
      >
        <Group mt='md'>
          <Button
            onClick={() => props.onAddedBonus(parseInt(props.title))}
            fullWidth={true}
            disabled={props.disabled}
          >
            {props.disabled ? <DiscountOff /> : <Discount />}
          </Button>
        </Group>
      </Tooltip>
    </Card>
  );
};

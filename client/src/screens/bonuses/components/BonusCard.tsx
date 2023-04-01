import { PropsWithChildren } from 'react';
import { Button, Card, Group, Title, Tooltip } from '@mantine/core';
import Image from 'next/image';
import { Discount, DiscountOff } from 'tabler-icons-react';

import { Bonus } from '../types';

type Props = Bonus & {
  onAddedBonus: (percent: number) => void;
  disabled?: boolean;
};

export const BonusCard = (props: Props) => {
  const WrapperButton = ({ children }: PropsWithChildren) => {
    return props.disabled ? (
      <>{children}</>
    ) : (
      <Tooltip
        label='Выбрать купон можно один раз! Данное действие нельзя будет повторить!'
        withinPortal={true}
      >
        {children}
      </Tooltip>
    );
  };

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
      <Group mt='md'>
        <WrapperButton>
          <Button
            onClick={() => props.onAddedBonus(parseInt(props.title))}
            fullWidth={true}
            disabled={props.disabled}
          >
            {props.disabled ? <DiscountOff /> : <Discount />}
          </Button>
        </WrapperButton>
      </Group>
    </Card>
  );
};

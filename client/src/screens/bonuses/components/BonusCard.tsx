import { Button, Card, Group, Title } from '@mantine/core';
import Image from 'next/image';
import { Discount, DiscountOff } from 'tabler-icons-react';

import { PromptTooltipOnNotDisabled } from '@/components/PromptTooltip';

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
      <Group mt='md'>
        <PromptTooltipOnNotDisabled
          label='Выбрать купон можно один раз. Данное действие нельзя будет повторить!'
          disabled={props.disabled}
        >
          <Button
            onClick={() => props.onAddedBonus(parseInt(props.title))}
            fullWidth={true}
            disabled={props.disabled}
          >
            {props.disabled ? <DiscountOff /> : <Discount />}
          </Button>
        </PromptTooltipOnNotDisabled>
      </Group>
    </Card>
  );
};

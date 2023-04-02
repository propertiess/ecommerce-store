import { Avatar, Indicator, List, Popover, Tooltip } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Heart, ShoppingBag } from 'tabler-icons-react';

import { A } from '@/components/A';
import { useAuthReset } from '@/hooks/useAuthReset';
import { useBasketStore } from '@/store/basket/Basket';
import { useLikedStore } from '@/store/liked/Liked';

export const UserAvatar = observer(() => {
  const { basket } = useBasketStore();
  const { liked } = useLikedStore();
  const onResetAuth = useAuthReset();

  return (
    <Popover position='bottom' withArrow shadow='md'>
      <Popover.Target>
        <Avatar radius='xl' size='md' />
      </Popover.Target>
      <Popover.Dropdown>
        <List listStyleType='none' className='flex flex-col items-center gap-3'>
          <List.Item>
            <A href='/lk'>Профиль</A>
          </List.Item>
          <Tooltip label='Избранное'>
            <List.Item>
              <A href='/lk/liked'>
                <Indicator label={liked.length} offset={3} size={16}>
                  <Heart size={32} />
                </Indicator>
              </A>
            </List.Item>
          </Tooltip>
          <Tooltip label='Корзина'>
            <List.Item>
              <A href='/lk/basket'>
                <Indicator label={basket.length} offset={3} size={16}>
                  <ShoppingBag size={32} />
                </Indicator>
              </A>
            </List.Item>
          </Tooltip>
          <List.Item onClick={onResetAuth} className='cursor-pointer'>
            Выйти
          </List.Item>
        </List>
      </Popover.Dropdown>
    </Popover>
  );
});

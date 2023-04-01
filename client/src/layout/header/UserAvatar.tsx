import { Avatar, List, Popover } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { A } from '@/components/A';
import { useAuthReset } from '@/hooks/useAuthReset';

import { authorizationLinks } from './navbar';

export const UserAvatar = observer(() => {
  const onResetAuth = useAuthReset();

  return (
    <Popover position='bottom' withArrow shadow='md'>
      <Popover.Target>
        <Avatar radius='xl' size='md' />
      </Popover.Target>
      <Popover.Dropdown>
        <List listStyleType='none' className='flex flex-col items-center'>
          {authorizationLinks.map(link => (
            <List.Item key={link.title}>
              <A href={link.href}>{link.title}</A>
            </List.Item>
          ))}
          <List.Item onClick={onResetAuth} className='cursor-pointer'>
            Выйти
          </List.Item>
        </List>
      </Popover.Dropdown>
    </Popover>
  );
});

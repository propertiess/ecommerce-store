import { Anchor, List, Navbar as MantineNavbar } from '@mantine/core';
import { useRouter } from 'next/router';

import { A } from '@/components/A';
import { TLink } from '@/types';

type Props = {
  links: TLink[];
  onLogOut?: () => void;
};

export const Navbar = ({ links, onLogOut }: Props) => {
  const router = useRouter();

  return (
    <MantineNavbar
      className='mr-32 w-fit border-0'
      hiddenBreakpoint='sm'
      hidden={true}
    >
      <List className='flex gap-10' listStyleType='none'>
        {links.map(link => (
          <List.Item key={link.title}>
            <A active={router.asPath === link.href} href={link.href}>
              {link.title}
            </A>
          </List.Item>
        ))}
        {onLogOut && (
          <List.Item onClick={onLogOut}>
            <Anchor component='div'>Выйти</Anchor>
          </List.Item>
        )}
      </List>
    </MantineNavbar>
  );
};

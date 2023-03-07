import { List, Navbar as MantineNavbar } from '@mantine/core';
import { useRouter } from 'next/router';

import { A } from '@/components/A';
import { TLink } from '@/types';

type Props = {
  links: TLink[];
};

export const Navbar = ({ links }: Props) => {
  const router = useRouter();

  return (
    <MantineNavbar className='m-0 mr-32 w-fit border-0'>
      <List className='flex gap-10' listStyleType='none'>
        {links.map(link => (
          <List.Item key={link.title}>
            <A active={router.asPath === link.href} href={link.href}>
              {link.title}
            </A>
          </List.Item>
        ))}
      </List>
    </MantineNavbar>
  );
};

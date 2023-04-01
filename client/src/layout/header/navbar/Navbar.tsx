import { List, Navbar as MantineNavbar } from '@mantine/core';

import { A } from '@/components/A';
import { TLink } from '@/types';

type Props = {
  links: TLink[];
};

export const Navbar = ({ links }: Props) => {
  return (
    <MantineNavbar
      className='mr-32 w-fit border-0'
      hiddenBreakpoint='sm'
      hidden={true}
    >
      <List className='flex gap-10' listStyleType='none'>
        {links.map(link => (
          <List.Item key={link.title}>
            <A href={link.href}>{link.title}</A>
          </List.Item>
        ))}
      </List>
    </MantineNavbar>
  );
};

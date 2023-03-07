import { PropsWithChildren } from 'react';
import { Anchor, clsx } from '@mantine/core';
import Link from 'next/link';

type Props = PropsWithChildren & {
  href: string;
  active: boolean;
};

export const A = ({ children, href, active }: Props) => {
  return (
    <Anchor
      component={Link}
      href={href}
      className={clsx(
        active ? 'opacity-100' : 'opacity-80',
        'duration-400 font-medium transition-opacity hover:no-underline hover:opacity-100'
      )}
    >
      {children}
    </Anchor>
  );
};

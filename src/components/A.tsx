import { PropsWithChildren } from 'react';
import { Anchor, clsx } from '@mantine/core';
import Link from 'next/link';

type Props = PropsWithChildren & {
  href: string;
  active?: boolean;
};

export const A = ({ children, href, active }: Props) => {
  return (
    <Anchor
      component={Link}
      href={href}
      className={clsx(
        'font-medium text-main/80 transition-colors duration-300 hover:text-main hover:no-underline',
        active && 'text-main'
      )}
    >
      {children}
    </Anchor>
  );
};

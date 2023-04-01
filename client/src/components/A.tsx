import { PropsWithChildren } from 'react';
import { Anchor, clsx } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = PropsWithChildren & {
  href: string;
  className?: string;
};

export const A = ({ children, href, className }: Props) => {
  const router = useRouter();
  const active = router.asPath === href;

  return (
    <Anchor
      component={Link}
      href={href}
      className={clsx(
        active ? 'opacity-100' : 'opacity-80',
        'duration-400 font-medium transition-opacity hover:no-underline hover:opacity-100',
        className
      )}
    >
      {children}
    </Anchor>
  );
};

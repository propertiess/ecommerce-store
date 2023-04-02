import { PropsWithChildren } from 'react';
import { Text, Tooltip } from '@mantine/core';

import { A } from './A';

type Props = {
  title: string;
  length: number;
  as?: 'text' | 'a';
  href?: string;
  withTooltip?: boolean;
};

export const CutTooltip = ({
  withTooltip = false,
  as = 'text',
  length,
  ...props
}: Props) => {
  const Component =
    as === 'text'
      ? ({ children }: PropsWithChildren) => (
          <Text weight={500}>{children}</Text>
        )
      : ({ children }: PropsWithChildren) => (
          <A href={props.href!}>{children}</A>
        );

  return (
    <>
      {withTooltip && props.title.length > length ? (
        <Tooltip label={props.title}>
          <Text>
            <Component>{props.title.slice(0, length) + '...'}</Component>
          </Text>
        </Tooltip>
      ) : (
        <Component>{props.title}</Component>
      )}
    </>
  );
};

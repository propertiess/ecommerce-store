import { PropsWithChildren } from 'react';
import { Tooltip } from '@mantine/core';

export const PromptTooltipOnNotDisabled = ({
  children,
  label,
  disabled = false
}: PropsWithChildren & { label: string; disabled?: boolean }) => {
  return disabled ? (
    <>{children}</>
  ) : (
    <Tooltip label={label} withinPortal={true}>
      {children}
    </Tooltip>
  );
};

export const PromptTooltipOnDisabled = ({
  children,
  label,
  disabled = false
}: PropsWithChildren & { label: string; disabled?: boolean }) => {
  return disabled ? (
    <Tooltip label={label} withinPortal={true}>
      {children}
    </Tooltip>
  ) : (
    <>{children}</>
  );
};

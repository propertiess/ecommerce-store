import { ReactNode } from 'react';
import { Drawer } from '@mantine/core';

import { BodyOperation } from '../types';

type Props = {
  isOpen: boolean;
  close: () => void;
  operation?: BodyOperation;
  crudForm: ReactNode;
};

export const CrudDrawer = ({
  isOpen,
  operation = 'post',
  crudForm,
  close
}: Props) => {
  return (
    <Drawer
      opened={isOpen}
      onClose={close}
      zIndex={1002}
      title={
        operation === 'post' ? 'Создание новой строки' : 'Изменение строки'
      }
      position='right'
    >
      {crudForm}
    </Drawer>
  );
};

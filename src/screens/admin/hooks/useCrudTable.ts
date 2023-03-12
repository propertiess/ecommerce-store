import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

export const useCrudTable = <T>() => {
  const [tableElement, setTableElement] = useState<T | null>(null);
  const [isDrawerOpen, { close, open }] = useDisclosure(false);
  const [operation, setOperation] = useState<'post' | 'put'>();

  const changeRow = (changeElement: T): void => {
    setTableElement(changeElement);
    setOperation('put');
    open();
  };

  const addRow = (): void => {
    open();
    setTableElement(null);
    setOperation('post');
  };

  const onDelete = (cb: (id: number) => void) => {
    return cb;
  };

  const onSave = (
    postCb: (changedElement: T) => void,
    putCb: (changedElement: T) => void
  ) => {
    return (changedElement: T) => {
      switch (operation) {
        case 'post': {
          postCb(changedElement);
          break;
        }

        case 'put': {
          putCb(changedElement);
          break;
        }
      }

      close();
    };
  };

  return {
    tableElement,
    operation,
    isDrawerOpen,
    addRow,
    changeRow,
    onSave,
    onDelete,
    close
  };
};

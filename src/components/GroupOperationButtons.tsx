import { Group, Tooltip } from '@mantine/core';
import { Edit, Trash } from 'tabler-icons-react';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export const GroupOperationButtons = ({ onEdit, onDelete }: Props) => {
  return (
    <Group>
      <Tooltip label='Изменить' withinPortal={true}>
        <span onClick={onEdit}>
          <Edit className='cursor-pointer' />
        </span>
      </Tooltip>
      <Tooltip label='Удалить' withinPortal={true}>
        <span onClick={onDelete}>
          <Trash className='cursor-pointer' color='red' />
        </span>
      </Tooltip>
    </Group>
  );
};

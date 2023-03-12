import { Group, Tooltip } from '@mantine/core';
import { Edit, Trash } from 'tabler-icons-react';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export const GroupOperationButtons = ({ onEdit, onDelete }: Props) => {
  return (
    <Group>
      <Tooltip label='Изменить'>
        <span onClick={onEdit}>
          <Edit className='cursor-pointer' />
        </span>
      </Tooltip>
      <Tooltip label='Удалить'>
        <span onClick={onEdit}>
          <Trash className='cursor-pointer' color='red' onClick={onDelete} />
        </span>
      </Tooltip>
    </Group>
  );
};

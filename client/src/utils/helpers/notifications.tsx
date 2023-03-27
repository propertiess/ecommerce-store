import { showNotification } from '@mantine/notifications';
import { Check } from 'tabler-icons-react';

export const showErrorNotification = (message: string): void => {
  showNotification({
    title: 'Ошибка',
    message,
    styles: () => ({
      root: {
        '&::before': { backgroundColor: 'red' }
      }
    })
  });
};

export const showSuccessNotification = (message: string): void => {
  showNotification({
    title: 'Успех',
    message,
    icon: <Check />
  });
};

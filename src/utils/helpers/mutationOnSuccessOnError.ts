import { queryClient } from 'pages/_app';

import {
  showErrorNotification,
  showSuccessNotification
} from './notifications';

const dictionarySuccess = {
  post: 'Данные успешно добавлены',
  put: 'Данные успешно изменены',
  delete: 'Данные успешно удалены'
};

const dictionaryError = {
  post: 'Не удалось добавить данные!',
  put: 'Не удалось изменить данные!',
  delete: 'Не удалось удалить данные!'
};

export const mutationOnSuccessOnError = (
  queryKeys: string[],
  method: 'post' | 'put' | 'delete'
) => {
  return {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys });
      showSuccessNotification(dictionarySuccess[method]);
    },
    onError: () => {
      showErrorNotification(dictionaryError[method]);
    }
  };
};

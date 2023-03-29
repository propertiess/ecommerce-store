import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from '@/utils/consts';
import { mutationOnSuccessOnError } from '@/utils/helpers/mutationOnSuccessOnError';

export type TMutationCrudTableFn<T> = {
  post: (data: Omit<T, 'id'>) => Promise<T>;
  put: (data: T) => Promise<T>;
  delete: (id: number) => Promise<T>;
};

export const useMutationCrudTable = <T>(
  key: keyof typeof QueryKeys,
  service: TMutationCrudTableFn<T>
) => {
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (id: number) => service.delete(id),
    ...mutationOnSuccessOnError([key], 'delete')
  });

  const { mutate: mutatePost } = useMutation({
    mutationFn: (data: Omit<T, 'id'>) => service.post(data),
    ...mutationOnSuccessOnError([key], 'post')
  });

  const { mutate: mutatePut } = useMutation({
    mutationFn: (data: T) => service.put(data),
    ...mutationOnSuccessOnError([key], 'put')
  });

  return {
    mutateDelete,
    mutatePost,
    mutatePut
  };
};

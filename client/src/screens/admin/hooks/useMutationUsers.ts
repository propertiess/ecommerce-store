import { UserService } from '@/services/user/user.service';
import { QueryKeys } from '@/utils/consts';

import { useMutationCrudTable } from './useMutationCrudTable';

export const useMutationUsers = () =>
  useMutationCrudTable(QueryKeys.users, UserService);

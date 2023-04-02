import { UserDetailsScreen } from '@/screens/lk/UserDetailsScreen';
import { NextPageWithAuth } from '@/types';

const UserDetailsPage: NextPageWithAuth = () => {
  return <UserDetailsScreen />;
};

UserDetailsPage.isOnlyUser = true;

export default UserDetailsPage;

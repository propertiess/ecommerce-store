import { GetServerSideProps } from 'next';

import { withAuthAdmin } from '@/hooks/withAuth';
import { AdminScreen } from '@/screens/admin/AdminScreen';

export const getServerSideProps: GetServerSideProps = withAuthAdmin(
  async () => {
    return {
      props: {}
    };
  }
);

const Admin = () => {
  return <AdminScreen />;
};

export default Admin;

import { GetServerSideProps } from 'next';

import { withAuthAdmin } from '@/hooks/withAuth';
import { Layout } from '@/layout';
import { AdminScreen } from '@/screens/admin/AdminScreen';

export const getServerSideProps: GetServerSideProps = withAuthAdmin(
  async () => {
    return {
      props: {}
    };
  }
);

const Admin = () => {
  return (
    <Layout title='Администрирование'>
      <AdminScreen />
    </Layout>
  );
};

export default Admin;

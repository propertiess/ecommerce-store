import { Layout } from '@/layout';
import { AuthorizationScreen } from '@/screens/authorization/AuthorizationScreen';

const Authorization = () => {
  return (
    <Layout title='Авторизация' description='Авторизация личного аккаунта'>
      <AuthorizationScreen />
    </Layout>
  );
};

export default Authorization;

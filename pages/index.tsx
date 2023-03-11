// import { GetServerSideProps } from 'next';

// import { withAuth } from '@/hooks/useAuth';
import { HomeScreen } from '@/screens/home';

const Home = () => {
  return <HomeScreen />;
};

// export const getServerSideProps: GetServerSideProps = withAuth(async () => {
//   return {
//     props: {}
//   };
// });

export default Home;

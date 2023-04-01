import { Center, Text } from '@mantine/core';

import { Layout } from '@/layout';

const NotFound = () => {
  return (
    <Layout title='Страница не найдена'>
      <Center mt='sm'>
        <Text>Страница не найдена!</Text>
      </Center>
    </Layout>
  );
};

export default NotFound;

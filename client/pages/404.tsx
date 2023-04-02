import { Center, Text } from '@mantine/core';

import { Layout } from '@/layout';

const NotFound = ({ title }: { title?: string }) => {
  const text = title ?? 'Страница не найдена!';
  return (
    <Layout title={text}>
      <Center mt='sm'>
        <Text>{text}</Text>
      </Center>
    </Layout>
  );
};

export default NotFound;

import { Button, Grid, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { observer } from 'mobx-react-lite';

import { CenteredLoader } from '@/components/CenteredLoader';
import { Layout } from '@/layout';
import { UserDetailsForm } from '@/screens/lk/components/UserDetailsForm';
import { useGetDetail } from '@/screens/lk/hooks/useGetDetails';
import { useAuthStore } from '@/store/auth/Auth';
import { TUserDetails } from '@/types';
import { DetailsDictionary } from '@/utils/consts';

export const UserDetailsScreen = observer(() => {
  const { userId } = useAuthStore();
  const { data: details, isFetching, refetch } = useGetDetail(userId);

  const [isChangingDetails, { open, close }] = useDisclosure(false);

  if (isFetching) {
    return (
      <Layout title='Личный кабинет'>
        <CenteredLoader />
      </Layout>
    );
  }

  return (
    <Layout title='Личный кабинет'>
      <Title mt='md'>Профиль</Title>
      {details && (
        <Stack mt='md'>
          <Stack>
            {Object.entries(details).map(([key, value]) => {
              const typedKey = key as keyof TUserDetails;

              if (typedKey === 'userId') {
                return null;
              }

              return (
                <Grid key={typedKey}>
                  <Grid.Col span={5}>
                    <Text>{DetailsDictionary[typedKey]}:</Text>
                  </Grid.Col>

                  <Grid.Col span={7}>
                    <Text>{value || 'Не заполнено'}</Text>
                  </Grid.Col>
                </Grid>
              );
            })}
          </Stack>
          <Group position='right'>
            <Button onClick={open}>Изменить</Button>
          </Group>
          <Modal
            onClose={close}
            opened={isChangingDetails}
            centered={true}
            zIndex={1002}
          >
            <UserDetailsForm
              {...details}
              onClose={() => {
                refetch();
                close();
              }}
            />
          </Modal>
        </Stack>
      )}
    </Layout>
  );
});

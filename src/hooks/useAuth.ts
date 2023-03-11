import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';

import { AuthEnum } from '@/utils/consts';

export const withAuth = (
  getServerSideProps: GetServerSideProps
): GetServerSideProps => {
  return async context => {
    const token = getCookie(AuthEnum.TOKEN, context);

    if (!token) {
      return {
        redirect: { statusCode: 302, destination: '/authorization' }
      };
    }

    const getServerSidePropsData = await getServerSideProps(context);

    if (!('props' in getServerSidePropsData)) {
      throw new Error('invalid getServerSideProps result');
    }

    return {
      props: {
        ...getServerSidePropsData.props
      }
    };
  };
};

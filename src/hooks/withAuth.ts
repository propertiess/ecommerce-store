import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';

import { AuthEnum, RoleEnum } from '@/utils/consts';

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

    const isUser = atob(token as string) === RoleEnum.USER;

    if (!isUser) {
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

export const withAuthAdmin = (
  getServerSideProps: GetServerSideProps
): GetServerSideProps => {
  return async context => {
    const token = getCookie(AuthEnum.TOKEN, context);

    if (!token) {
      return {
        redirect: { statusCode: 302, destination: '/authorization' }
      };
    }

    const isAdmin = atob(token as string) === RoleEnum.ADMIN;
    const isUser = atob(token as string) === RoleEnum.USER;

    if (!isAdmin && isUser) {
      return {
        props: {},
        redirect: { destination: '/' }
      };
    }

    if (!isAdmin) {
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

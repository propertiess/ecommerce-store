import { Button, Flex, Group, Rating, Stack, Text, Title } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { BasketAndLikedButtons } from '@/components/BasketAndLikedButtons';
import { CenteredLoader } from '@/components/CenteredLoader';
import { useBasketAndLikedMethods } from '@/hooks/useBasketAndLiked';
import { Layout } from '@/layout';
import { useBasketList } from '@/screens/basket/hooks/useBasketList';
import { useGetProduct } from '@/screens/home/hooks/useGetProducts';
import { useLikedList } from '@/screens/liked/hooks/useLikedList';
import { convertCurrency } from '@/utils/helpers/convertCurrency';

const ProductsDetailsPage = observer(() => {
  const router = useRouter();
  const id = router.query.id;

  const productId = id === undefined ? undefined : +id;

  const { data: product, isFetching } = useGetProduct(productId);

  const basketAndLikedMethods = useBasketAndLikedMethods();

  const { basketItems } = useBasketList();
  const { likedItems } = useLikedList();

  const isInBasket = !!basketItems.find(item => item.productId === productId);
  const isInLiked = !!likedItems.find(item => item.productId === productId);

  if (isFetching) {
    <Layout title='Страница товара'>
      <CenteredLoader />
    </Layout>;
  }

  return (
    <Layout
      title={product?.title ?? 'Страница товара'}
      description={product?.description ?? ''}
    >
      {product && (
        <>
          <Group position='right' mt='md'>
            <Button onClick={() => router.push('/')}>Назад</Button>
          </Group>
          <Flex wrap='wrap' justify='center' mt='md' gap='sm'>
            <Stack>
              <Image
                width={300}
                height={300}
                className='mx-auto block object-contain'
                src={product.img}
                alt={product.title}
              />
            </Stack>
            <Stack>
              <Title>{product.title}</Title>
              <Text>Цена: {convertCurrency(product.price)}</Text>
              <Group>
                <Text>Звезды:</Text>
                <Rating value={product.rating} readOnly={true} />
              </Group>
              <Group>
                <Text>Описание:</Text>
                <Text>{product.description}</Text>
              </Group>
              <BasketAndLikedButtons
                id={product.id}
                isInBasket={isInBasket}
                isInLiked={isInLiked}
                {...basketAndLikedMethods}
              />
            </Stack>
          </Flex>
        </>
      )}
    </Layout>
  );
});

export default ProductsDetailsPage;

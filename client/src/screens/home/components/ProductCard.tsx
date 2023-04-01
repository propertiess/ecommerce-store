import { GoodsCard, GoodsCardPropsOften } from '@/components/GoodsCard';
import { Product } from '@/types';

type Props = GoodsCardPropsOften & {
  product: Product;
};

export const ProductCard = (props: Props) => {
  return (
    <GoodsCard
      {...props.product}
      {...props}
      withToolTip={true}
      maxLengthTitle={'Mens Cotton Jacket'.length}
    />
  );
};

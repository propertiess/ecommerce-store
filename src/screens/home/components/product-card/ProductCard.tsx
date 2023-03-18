import { useDisclosure } from '@mantine/hooks';

import { GoodsCard } from '@/components/GoodsCard';
import { Product } from '@/types';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const [added, { toggle }] = useDisclosure(false);

  return (
    <GoodsCard
      goods={product}
      added={added}
      onAdded={toggle}
      onCancel={toggle}
      withToolTip={true}
      maxLengthTitle={'Mens Cotton Jacket'.length}
    />
  );
};

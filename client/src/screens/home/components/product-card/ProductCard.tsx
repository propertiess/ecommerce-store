import { GoodsCard } from '@/components/GoodsCard';
import { Product } from '@/types';

type Props = {
  product: Product;
  isAdded: boolean;
  onAdded: (id: number) => void;
  onCancel: (id: number) => void;
};

export const ProductCard = ({ product, isAdded, onAdded, onCancel }: Props) => {
  return (
    <GoodsCard
      goods={product}
      added={isAdded}
      onAdded={onAdded}
      onCancel={onCancel}
      withToolTip={true}
      maxLengthTitle={'Mens Cotton Jacket'.length}
    />
  );
};

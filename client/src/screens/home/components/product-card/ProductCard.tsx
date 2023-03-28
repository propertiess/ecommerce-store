import { observer } from 'mobx-react-lite';

import { GoodsCard } from '@/components/GoodsCard';
import { useAuthStore } from '@/store/auth/Auth';
import { Product } from '@/types';

type Props = {
  product: Product;
  isAdded: boolean;
  onAdded: (id: number) => void;
  onCancel: (id: number) => void;
};

export const ProductCard = observer(
  ({ product, isAdded, onAdded, onCancel }: Props) => {
    const { userId } = useAuthStore();

    return (
      <GoodsCard
        goods={product}
        added={isAdded}
        onAdded={onAdded}
        onCancel={onCancel}
        withToolTip={true}
        disabled={!userId}
        maxLengthTitle={'Mens Cotton Jacket'.length}
      />
    );
  }
);

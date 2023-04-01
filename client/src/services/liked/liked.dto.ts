import { TLikedItem } from '@/store/liked/Liked';

export type LikedDto = {
  userId: number;
  liked: TLikedItem[];
};

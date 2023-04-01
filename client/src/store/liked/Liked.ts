import { makeAutoObservable } from 'mobx';

import { LikedDto } from '@/services/liked/liked.dto';
import { LikedService } from '@/services/liked/liked.service';
import { Storage } from '@/utils/api/storage';

export type TLikedItem = {
  productId: number;
};

class Liked {
  liked: TLikedItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItem = (item: TLikedItem) => {
    this.liked.push(item);
    this.mutateLiked(this.liked);
  };

  removeItem = (productId: number) => {
    const index = this.liked.findIndex(item => item.productId === productId);
    this.liked.splice(index, 1);
    this.mutateLiked(this.liked);
  };

  setLiked = (liked: TLikedItem[]) => {
    this.liked = liked;
  };

  private mutateLiked = async (liked: TLikedItem[]) => {
    const userId = Storage.getItem<string>('user-id');

    if (!userId) {
      return;
    }

    const likedDto: LikedDto = {
      userId: +userId,
      liked
    };

    try {
      await LikedService.put(likedDto);
    } catch (e) {
      console.error(e);
      try {
        await LikedService.post(likedDto);
      } catch (e) {
        console.error(e);
      }
    }
  };
}

const store = new Liked();

export const useLikedStore = () => store;

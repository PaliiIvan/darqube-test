import React from 'react';
import { Cart, CartType } from './cart';
import { Story } from '@storybook/react/types-6-0';
import { emptyFn } from '../../types/news.model';

const Template: Story<CartType> = (args: CartType) => <Cart {...args}></Cart>;
export type BinnedStory<T> = {
  args: T;
};

export default {
  component: Cart,
  title: 'Cart'
};

export const Default = Template.bind({}) as BinnedStory<CartType>;

Default.args = {
  related: 'Weekly Brief',
  summary: 'Cryptocurrency market is changing and shady players are leaving it',
  date: new Date(),
  isResearchedCart: true,
  headline: 'Will the 20s be the decade of Cryptos?',
  image:
    'https://static.seekingalpha.com/uploads/2021/3/12/saupload_lezingen_b.jpg',
  addToBookmarkCallback: emptyFn,
  removeFromBookmarkCallback: emptyFn,
  isInBookmark: true
};

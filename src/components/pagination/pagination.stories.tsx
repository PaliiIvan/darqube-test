import React from 'react';
import { Pagination, PaginationType } from './pagination';
import { Story } from '@storybook/react/types-6-0';

const Template: Story<PaginationType> = (args: PaginationType) => (
  <Pagination {...args}></Pagination>
);
export type BinnedStory<T> = {
  args: T;
};

export default {
  component: Pagination,
  title: 'Pagination'
};

export const Default = Template.bind({}) as BinnedStory<PaginationType>;

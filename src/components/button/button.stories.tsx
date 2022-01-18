import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Button, ButtonType } from './button';
import { BinnedStory } from '../cart/cart.stories';

const Template: Story<ButtonType> = (args: ButtonType) => <Button {...args} />;

export default {
  component: Button,
  title: 'Button'
};

export const Default = Template.bind({}) as BinnedStory<ButtonType>;

Default.args = {
  children: 'Next',
  onClick: () => console.log('click'),
  disabled: true
};

export const Default2 = Template.bind({}) as BinnedStory<ButtonType>;

Default.args = {
  children: 'Next',
  onClick: () => console.log('click'),
  disabled: false
};

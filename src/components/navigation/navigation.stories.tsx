import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Navigation } from './navigation';

const Template: Story = () => <Navigation />;

export default {
  component: Navigation,
  title: 'Navigation'
};

export const Default = Template.bind({});

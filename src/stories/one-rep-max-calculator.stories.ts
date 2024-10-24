import type { Meta, StoryObj } from '@storybook/react';
import { OneRepMaxCalculator } from '@/components/one-rep-max-calculator';

const meta = {
  title: '1RM Calculator',
  component: OneRepMaxCalculator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OneRepMaxCalculator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Calculator: Story = {};

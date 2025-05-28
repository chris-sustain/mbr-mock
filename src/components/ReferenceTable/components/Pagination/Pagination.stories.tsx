import type { StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

export default {
  title: 'ReferenceTable/Pagination',
  component: Pagination
};

export const Base: StoryObj<typeof Pagination> = {
  args: {
    currentPage: 1,
    totalPages: 10,
    isLoading: false,
    maxPages: 5,

    onPageChange: () => {}
  }
};

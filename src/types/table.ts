//disable eslint no-unused-vars
import type { Reference } from './reference';
import { TABLE_MODES } from '@src/utils/table';
//to build this type using the columns in the table
export type ColumnKey = keyof Reference;

export interface ReferenceSort {
  column: ColumnKey;
  direction: 'asc' | 'desc';
}

export interface ReferenceSearch {
  query: string;
  active: boolean;
}

// Create a type for all possible filter keys
type FilterKey = ColumnKey;

// Create a type for filter values
type FilterValue = string | number | string[];

// Create a type for the filters object
export type ReferenceFilters = {
  [K in FilterKey]?: FilterValue;
};

// export type ColumnId = keyof typeof COLUMNS_IDS;

export type TableMode = (typeof TABLE_MODES)[keyof typeof TABLE_MODES];

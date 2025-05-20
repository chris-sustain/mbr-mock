import type { EnhancedReference } from './reference';

//to build this type using the columns in the table
export type ColumnKey = keyof EnhancedReference;

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

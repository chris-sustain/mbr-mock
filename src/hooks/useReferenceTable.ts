import { useContext } from 'react';
import { ReferenceTableContext } from '@src/contexts/ReferenceTableContext';

export function useReferenceTable() {
  const context = useContext(ReferenceTableContext);
  if (context === undefined) {
    throw new Error('useReferenceFilters must be used within a ReferenceFilterProvider');
  }
  return context;
}

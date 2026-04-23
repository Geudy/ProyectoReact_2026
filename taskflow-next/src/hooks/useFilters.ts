import { useContext } from 'react';
import { FiltersContext } from '../context/FiltersContext';

export function useFilters() {
  return useContext(FiltersContext);
}

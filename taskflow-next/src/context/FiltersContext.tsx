"use client";
import React, { createContext, useContext, useState } from 'react';

export type Filters = {
  priority?: string;
  assignee?: string;
  search?: string;
};

export const FiltersContext = createContext<{
  filters: Filters;
  setFilters: (f: Filters) => void;
}>({ filters: {}, setFilters: () => {} });

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>({});
  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export function useFilters() {
  return useContext(FiltersContext);
}

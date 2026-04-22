import React from 'react';
import { useFilters } from '../../hooks/useFilters';
import { Input } from '../atoms/Input';

export const TaskFilters: React.FC = () => {
  const { filters, setFilters } = useFilters();
  return (
    <div className="task-filters">
      <Input
        placeholder="Buscar..."
        value={filters.search || ''}
        onChange={e => setFilters({ ...filters, search: e.target.value })}
        style={{ border: '2px solid #a0a3a0', borderRadius: 4, padding: '6px 12px', width: 200 }}
      />
      {/* Agrega más filtros según sea necesario */}
    </div>
  );
};

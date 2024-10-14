import React, { useState } from 'react';

interface HeaderProps {
  onViewChange: (view: 'files' | 'clusters') => void;
  onFilterChange: (filters: string[]) => void;
}

const Header: React.FC<HeaderProps> = ({ onViewChange, onFilterChange }) => {
  const [filters, setFilters] = useState<string[]>([]);

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onViewChange(e.target.value as 'files' | 'clusters');
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = e.target.value.split(',').map(filter => filter.trim());
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <header>
      <div>
        <label>View:</label>
        <select onChange={handleViewChange}>
          <option value="files">Files</option>
          <option value="clusters">Clusters</option>
        </select>
      </div>
      <div>
        <label>Filters (comma-separated):</label>
        <input
          type="text"
          value={filters.join(',')}
          onChange={handleFilterChange}
          placeholder="e.g., car,person"
        />
      </div>
    </header>
  );
};

export default Header;

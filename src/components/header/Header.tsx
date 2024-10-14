import React, { useState } from "react";
import classes from './Header.module.css'

interface HeaderProps {
  onViewChange: (view: "files" | "clusters") => void;
  onFilterChange: (filters: string) => void;
  view:"files" | "clusters",
  filter:string
}

const Header: React.FC<HeaderProps> = ({ onViewChange, onFilterChange,view,filter }) => {
  const [filters, setFilters] = useState<string>(filter);

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onViewChange(e.target.value as "files" | "clusters");
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = e.target.value.toString();
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <header className={classes.container}>
      <div className={classes.viewContainer}>
        <label>View:</label>
        <select value={view} onChange={handleViewChange}>
          <option value="files">Files</option>
          <option value="clusters">Clusters</option>
        </select>
      </div>
      <div className={classes.filterContainer}>
        <label>Filters:</label>
        <input
          type="text"
          value={filters}
          onChange={handleFilterChange}
          placeholder="e.g., car,person"
        />
      </div>
    </header>
  );
};

export default Header;

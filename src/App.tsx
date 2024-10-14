import React, { useState } from 'react';
import Header from './components/header/Header';
import FileGrid from './components/file-grid/FileGrid';
import ClusterView from './components/cluster-view/ClusterView';


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'files' | 'clusters'>('files');
  const [currentFilters, setCurrentFilters] = useState<string[]>([]);

  return (
    <div>
      <Header onViewChange={setCurrentView} onFilterChange={setCurrentFilters} />
      {currentView === 'files' ? (
        <FileGrid filters={currentFilters} />
      ) : (
        <ClusterView filters={currentFilters} />
      )}
    </div>
  );
};

export default App;

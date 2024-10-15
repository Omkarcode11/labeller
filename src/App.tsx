import React, { useState } from "react";
import Header from "./components/header/Header";
import FileGrid from "./components/file-grid/FileGrid";
import ClusterView from "./components/cluster-view/ClusterView";
import classes from "./App.module.css";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<"files" | "clusters">("files");
  const [currentFilters, setCurrentFilters] = useState<string>("");

  return (
    <div className={classes.container}>
      <Header
        onViewChange={setCurrentView}
        view={currentView}
        onFilterChange={setCurrentFilters}
        filter={currentFilters}
      />
      {currentView === "files" ? (
        <FileGrid filters={currentFilters} />
      ) : (
        <ClusterView
          setFilters={setCurrentFilters}
          setView={setCurrentView}
        />
      )}
    </div>
  );
};

export default App;

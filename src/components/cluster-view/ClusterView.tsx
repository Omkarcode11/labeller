import React from "react";

interface ClusterViewProps {
  filters: string[];
}

const ClusterView: React.FC<ClusterViewProps> = ({ filters }) => {
  const clusters: { [key: string]: string[] } = {
    cars: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",

      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
    persons: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
    animals: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
  };

  const filteredClusters = Object.entries(clusters).reduce(
    (acc: { [key: string]: string[] }, [category, items]) => {
      const filteredItems = items.filter((item) => {
        if (filters.length === 0) return true;
        return filters.some((filter) =>
          item.toLowerCase().includes(filter.toLowerCase())
        );
      });
      if (filteredItems.length > 0) {
        acc[category] = filteredItems;
      }
      return acc;
    },
    {}
  );

  return (
    <div>
      {Object.entries(filteredClusters).map(([category, items], index) => (
        <div key={index}>
          <h3>{category}</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
            }}
          >
            {items.map((item, idx) => (
              <div
                key={idx}
                style={{ border: "1px solid #ddd", padding: "10px" }}
              >
                <img
                  src={item}
                  alt={`${category} ${idx + 1}`}
                  style={{ width: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClusterView;

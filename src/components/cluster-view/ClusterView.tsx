import React, { useState, useEffect } from "react";
import axios from "axios";
import { key } from "../../utils/constant"; // Import your Pexels API key

interface ClusterViewProps {
  filters: string;
  setFilters: React.Dispatch<React.SetStateAction<string>>; // Function to update filters
  setView: React.Dispatch<React.SetStateAction<"files" | "clusters">>;
}

const ClusterView: React.FC<ClusterViewProps> = ({
  filters,
  setFilters,
  setView,
}) => {
  const [clusters, setClusters] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(false);
 

  const API_KEY = key; // Replace with your Pexels API key
  const PHOTOS_PER_CATEGORY = 5;

  // List of 10-20 categories
  const categories = [
    "Nature",
    "Cars",
    "Technology",
    "Animals",
    "Sports",
    "People",
    "Travel",
    "Architecture",
    "Food",
    "Fashion",
    // Add more categories as needed
  ];

  // Function to fetch images for each category
  const fetchImagesForCategory = async (category: string) => {
    try {
      const response = await axios.get("https://api.pexels.com/v1/search", {
        headers: {
          Authorization: API_KEY,
        },
        params: {
          query: category,
          per_page: PHOTOS_PER_CATEGORY,
        },
      });

      return response.data.photos.map((photo: any) => photo.src.medium);
    } catch (error) {
      console.error(`Error fetching images for ${category}:`, error);
      return [];
    }
  };

  // Function to fetch images for all categories
  const fetchAllImages = async () => {
    setLoading(true);
    try {
      const newClusters: { [key: string]: string[] } = {};

      for (const category of categories) {
        const images = await fetchImagesForCategory(category);
        if (images.length > 0) {
          newClusters[category] = images;
        }
      }

      setClusters(newClusters);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch images when component mounts
  useEffect(() => {
    fetchAllImages();
  }, []);

  // Handle category click
  const handleCategoryClick = (category: string) => {
    // Add the clicked category to the search filters
    setFilters(() => category);

    // Navigate to the FileView (assumes you have a route for it)
    setView("files");
  };

  return (
    <div>
      {loading && <h3>Loading images...</h3>}
      {!loading &&
        Object.entries(clusters).map(([category, items], index) => (
          <div key={index}>
            <h3>{category}</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "10px",
              }}
            >
              {items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCategoryClick(category)} // Handle category click
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
      {!loading && Object.keys(clusters).length === 0 && <p>No images found</p>}
    </div>
  );
};

export default ClusterView;

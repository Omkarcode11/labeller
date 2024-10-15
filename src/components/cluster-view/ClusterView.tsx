import React, { useState, useEffect } from "react";
import axios from "axios";
import { key } from "../../utils/constant"; // Import your Pexels API key
import styles from './ClusterView.module.css';


interface ClusterViewProps {
  setFilters: React.Dispatch<React.SetStateAction<string>>; // Function to update filters
  setView: React.Dispatch<React.SetStateAction<"files" | "clusters">>;
}

const ClusterView: React.FC<ClusterViewProps> = ({
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
 
      <div className={styles.container}>
        {loading && <h3 className={styles.loading}>Loading images...</h3>}
        {!loading &&
          Object.entries(clusters).map(([category, items], index) => (
            <div key={index} className={styles.categoryContainer}>
              <h3 className={styles.categoryTitle}>{category}</h3>
              <div className={styles.gridContainer}>
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className={styles.imageCard}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <img
                      src={item}
                      alt={`${category} ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        {!loading && Object.keys(clusters).length === 0 && (
          <p className={styles.noImagesFound}>No images found</p>
        )}
      </div>
    );
};

export default ClusterView;

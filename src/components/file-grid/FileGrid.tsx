import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { key } from "../../utils/constant";
import classes from "./FileGrid.module.css";

interface FileGridProps {
  filters: string;
}

const FileGrid: React.FC<FileGridProps> = ({ filters }) => {
  const [images, setImages] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [debouncedFilters, setDebouncedFilters] = useState<string>(filters); // Track debounced filters

  const API_KEY = key;
  const PER_PAGE = 15;

  const debounce = (func: Function, delay: number) => {
    let timeoutId: any;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Function to fetch images from the Pexels API
  const fetchImages = useCallback(async () => {
    try {
      const query = debouncedFilters.length > 0 ? debouncedFilters : "nature"; // default query if no filter provided

      const response = await axios.get("https://api.pexels.com/v1/search", {
        headers: {
          Authorization: API_KEY,
        },
        params: {
          query, // search term
          page,
          per_page: PER_PAGE,
        },
      });

      const newImages = response.data.photos.map(
        (photo: any) => photo.src.medium
      );
      setImages((prevImages) => [...prevImages, ...newImages]);

      if (newImages.length < PER_PAGE) {
        setHasMore(false); // No more images to load
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setHasMore(false);
    }
  }, [debouncedFilters, page]);

  // Debounced update for filters
  const updateDebouncedFilters = useCallback(
    debounce((newFilters: string) => {
      setDebouncedFilters(newFilters);
      setPage(1); // Reset page when filters change
      setImages([]); // Clear the images
      setHasMore(true); // Reset infinite scroll
    }, 500), // 500ms delay for debounce
    []
  );

  // Use effect to trigger debounce whenever filters change
  useEffect(() => {
    updateDebouncedFilters(filters);
  }, [filters, updateDebouncedFilters]);

  // Fetch images when page or debounced filters change
  useEffect(() => {
    fetchImages();
  }, [debouncedFilters, page, fetchImages]);

  // Fetch more images when scrolled
  const fetchMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={classes.container}>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchMoreImages}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more images</p>}
      >
        <div className={classes.gridContainer}>
          {images.map((img, index) => (
            <div key={index} className={classes.wrapper}>
              <img
                src={img}
                alt={`Image ${index + 1}`}
                className={classes.image}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default FileGrid;

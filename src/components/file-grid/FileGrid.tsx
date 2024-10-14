import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface FileGridProps {
  filters: string[];
}

const FileGrid: React.FC<FileGridProps> = ({ filters }) => {
  const imageUrls: string[] = [
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    'https://picsum.photos/200/',// Example image URL
    // Add more image URLs as needed
  ].map((ele,i)=>ele+(300+i));

  const [images, setImages] = useState<string[]>(imageUrls.slice(0, 5));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreImages = () => {
    if (images.length >= imageUrls.length) {
      setHasMore(false);
      return;
    }

    const newImages = imageUrls.slice(images.length, images.length + 5);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const filteredImages = images.filter((img) => {
    if (filters.length === 0) return true;
    return filters.some((filter) => img.toLowerCase().includes(filter.toLowerCase()));
  });

  return (
    <InfiniteScroll
      dataLength={filteredImages.length}
      next={fetchMoreImages}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more images</p>}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {filteredImages.map((img, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <img src={img} alt={`Image ${index + 1}`} style={{ width: '100%' }} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default FileGrid;

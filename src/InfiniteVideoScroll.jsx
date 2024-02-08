import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteVideoScroll = () => {
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Fetch initial videos
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`API_ENDPOINT?page=${page}`);
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setVideos(prevVideos => [...prevVideos, ...data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <InfiniteScroll
      dataLength={videos.length}
      next={fetchVideos}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {videos.map((video, index) => (
        <div key={index}>
          <ReactPlayer url={video.url} controls />
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteVideoScroll;

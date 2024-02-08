import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteVideoScroll = () => {
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
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
    <div className="container">

    <InfiniteScroll
      dataLength={videos.length}
      next={fetchVideos}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      className="scroll-container"
      
      >
      {videos.map((video, index) => (
        <div key={index}>
          <ReactPlayer
            url={video.url}
            controls
            playing={true}
            loop
            muted={true}
            width="auto"
            height="100vh"
            />
        </div>
      ))}
    </InfiniteScroll>
      </div>
  );
};

export default InfiniteVideoScroll;

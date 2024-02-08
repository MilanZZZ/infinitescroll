import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteVideoScrollYt = () => {
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageToken, setPageToken] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const apiKey = 'AIzaSyAQ1Svlmff-RMYZ7ECSy1cVq3LGPdeOtZU';
      const maxResults = 10;
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&maxResults=${maxResults}&q=surfing&pageToken=${pageToken}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.items.length === 0) {
        setHasMore(false);
        return;
      }

      const newVideos = data.items.map(item => ({
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        title: item.snippet.title
      }));

      setVideos(prevVideos => [...prevVideos, ...newVideos]);
      setPageToken(data.nextPageToken);
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
          <h3>{video.title}</h3>
          <ReactPlayer url={video.url} controls />
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteVideoScrollYt;

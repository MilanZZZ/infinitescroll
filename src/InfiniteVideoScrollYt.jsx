import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteVideoScrollYt = () => {
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageToken, setPageToken] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const apiKey = "AIzaSyDn8Av45fuMazwMsdbs8vAbfpKhF-oV1cc";
      const maxResults = 10;
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&maxResults=${maxResults}&q=surfing&pageToken=${pageToken}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.items.length === 0) {
        setHasMore(false);
        return;
      }

      const newVideos = data.items.map((item) => ({
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        title: item.snippet.title,
      }));

      setVideos((prevVideos) => [...prevVideos, ...newVideos]);
      setPageToken(data.nextPageToken);
    } catch (error) {
      console.error("Error fetching videos:", error);
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

export default InfiniteVideoScrollYt;

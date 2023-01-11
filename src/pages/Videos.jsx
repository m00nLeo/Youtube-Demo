// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import {
  // QueryClient,
  // QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Youtube from "../api/youtube";

const Videos = () => {
  const { keyword } = useParams(); // (?)
  // const [videos, setVideos] = useState([]);

  // // (?)
  // useEffect(() => {
  //   let requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   fetch(
  //     "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResults=20&chart=mostPopular&key=AIzaSyA0gkvb8iD6r_I-IC_I1EEe7coZT_sX9hQ",
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //       setVideos(result.items);
  //     })
  //     .catch((error) => console.log("error", error));
  // }, []);

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", keyword],
    queryFn: () => {
      const youtube = new Youtube();
      return youtube.search(keyword);
    },
  });

  return (
    <>
      <div>
        {/* {keyword ? (
          keyword
        ) : (
          <ul>
            {videos.map((item) => (
              <VideoCard key={item.id} video={item} />
            ))}
          </ul>
        )} */}
      </div>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>An error has occurred: {error.massage} </p>}
        {videos && (
          <div>
            <ul className="flex flex-col items-center py-4 gap-2  sm:gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {videos.map((item) => (
                <VideoCard key={item.id} video={item} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Videos;

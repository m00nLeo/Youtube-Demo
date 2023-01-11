import { useQuery } from "@tanstack/react-query";
import Youtube from "../api/youtube";
import VideoCard from "./VideoCard";

const RelatedVideos = ({ id }) => {
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["related", id],
    queryFn: () => {
      const youtube = new Youtube();
      return youtube.relatedVideos(id);
    },
  });

  return (
    <div>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>An error has occurred: {error.massage} </p>}
        {videos && (
          <div>
            <ul className="flex flex-col items-start lg:items-center justify-center px-6 gap-2">
              {videos.map((item) => (
                <VideoCard key={item.id} video={item} type="list"/>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedVideos;

import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";

const VideoCard = ({ video, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/videos/watch/${video.id}`, { state: { video: video } });
  };

  const isList = type === "list";
  return (
    <div className="overflow-hidden cursor-pointer">
      <li
        className={isList ? "flex gap-1 m-2  max-w-xs" : "group p-3 max-w-xs rounded-lg hover:scale-122 hover:p-0 hover:duration-200 hover:bg-slate-800"}
        onClick={handleClick}
      >
        <img
          className={isList ? "w-40 mr-2 rounded-xl " : "aspect-video rounded-xl w-ful group-hover:rounded-none group-hover:rounded-t-lg"}
          src={video.snippet.thumbnails.medium.url}
          alt=""
        />
        <div className="group-hover:p-3">
          <h2 className="truncate	my-3 line-clamp-2">{video.snippet.title}</h2>
          <div className="text-sm opacity-80">{video.snippet.channelTitle}</div>
          <div className="flex justify-between">
            <div className=" text-sm opacity-80">
              {format(video.snippet.publishedAt)}
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default VideoCard;

import axios from "axios";

export default class Youtube {
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      params: {
        key: process.env.REACT_APP_YOUTBE_API_KEY,
      },
    });
  }

  async search(keyword) {
    return keyword ? this.searchVideoByKeyword(keyword) : this.mostPopular();
  }

  async relatedVideos(id) {
    return this.httpClient
      .get("/search", {
        params: {
          part: "snippet",
          maxResults: 20,
          type: "video",
          relatedToVideoId: id,
        },
      })
      .then((response) => response.data.items)
      .then((item) =>
        item.map((child) => {
          return { ...child, id: child.id.videoId };
        })
      );
  }

  async channelThumbnail(id) {
    return this.httpClient
      .get("/channels", {
        params: {
          part: "snippet",
          id: id,
        },
      })
      .then((response) => {
        // console.log("haha");
        // console.log(response);
        return response.data.items[0].snippet.thumbnails.default.url;
      });
  }
  // Trường hợp 1:  Nếu có keyword tìm kiếm thì các video được trả ra sẽ dựa theo Id của từng videoId trong Object Id
  async searchVideoByKeyword(keyword) {
    return this.httpClient
      .get("/search", {
        params: { part: "snippet", maxResults: 20, type: "video", q: keyword },
      })
      .then((response) => response.data.items)
      .then((item) =>
        item.map((child) => {
          //   console.log(child);
          return { ...child, id: child.id.videoId };
        })
      )
      .catch((err) => console.log(err));
  }

  // Trường hợp 2:  Nếu không có keyword tìm kiếm thì các video được trả ra sẽ dựa theo Id của từng video
  async mostPopular() {
    return this.httpClient
      .get("/videos", {
        params: { part: "snippet", maxResults: 20, chart: "mostPopular" },
      })
      .then((response) => {
        // console.log(response);
        return response.data.items;
      })
      .catch((err) => console.log(err));
  }
}

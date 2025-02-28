import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

// For fetching searching videos from Youtube API
export const fetchYoutubeDataFromAPI = async (id) => {
  const options = {
    method: "GET",
    url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${id}&key=${ENV_VARS.MY_API_KEY}`,
  };

  const response = await axios.request(options);

  if (response.status !== 200) {
    throw new Error("Failed to fetch data from Rapid API");
  }

  return response.data;
};

// For fetching Youtube Trending Videos via from Youtube API
export const fetchYoutubeTrendingVideos = async () => {
  const options = {
    method: "GET",
    url: `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${ENV_VARS.MY_API_KEY}`,
  };

  const response = await axios.request(options);

  if (response.status !== 200) {
    throw new Error("Failed to fetch data from Rapid API");
  }

  return response.data;
};

// for fetching youtube video by ID from youtube API
export const fetchYoutubeVideoByID = async (id) => {
  const options = {
    method: "GET",
    url: `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${ENV_VARS.MY_API_KEY}`,
  };

  const response = await axios.request(options);

  if (response.status !== 200) {
    throw new Error("Failed to fetch data from Rapid API");
  }

  return response.data;
};

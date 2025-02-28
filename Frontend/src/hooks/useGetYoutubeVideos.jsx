import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import { useParams } from "react-router-dom";

const useGetYoutubeVideos = () => {
  const { id } = useParams();
  const [similarContent, setSimilarContent] = useState([]);
  const [content, setContent] = useState({});
  const { contentType } = useContentStore();
  const [loading, setLoading] = useState(true);

  // to get similar videos by searching that video on youtube with the video ID
  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };

    getSimilarContent();
  }, [contentType, id]);

  // to get video contents
  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}`);
        setContent(res.data.content[0]);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };

    getContentDetails();
  }, [contentType, id]);

  return { loading, content, similarContent };
};

export default useGetYoutubeVideos;

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player/vimeo";
import { fetchContentfulData } from "@/app/utils/fetchContentfulData";
import styles from "./page.module.css";

type Video = {
  vimeoLink: string;
};

const Video = () => {
  const { video } = useParams();
  const [videoData, setVideoData] = useState<Video | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        query GetVideo($slug: String!) {
          videoCollection(where: {slug: $slug}, limit: 1) {
            items {
              vimeoLink
            }
          }
        }
      `;

      const variables = {
        slug: video,
      };

      const { data, error } = await fetchContentfulData(query, variables);

      if (error) {
        console.error("Error fetching video data:", error);
      } else if (data && data.videoCollection.items.length > 0) {
        setVideoData(data.videoCollection.items[0]);
      } else {
        console.error("Video not found");
      }
    };

    fetchData();
  }, [video]);
  return (
    <div className={styles.videoContainer}>
      {videoData && (
        <ReactPlayer
          url={`https://vimeo.com/${videoData?.vimeoLink}?transparent=0`}
          width="100%"
          height="100%"
          controls
          playing={true}
          config={{
            playerOptions: {
              color: "0a0a0a",
              autoplay: true,
              byline: false,
              portrait: false,
              title: false,
              background: false,
              transparent: false,
            },
          }}
        />
      )}
    </div>
  );
};

export default Video;

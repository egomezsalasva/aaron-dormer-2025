"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { fetchContentfulData } from "@/app/utils/fetchContentfulData";
import ReactPlayer from "react-player/vimeo";

type Video = {
  vimeoLink: string;
};

export default function VideoPage() {
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
    <main className={styles.main}>
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
                color: "000000",
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
    </main>
  );
}

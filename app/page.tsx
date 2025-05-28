"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchContentfulData } from "@/app/utils/fetchContentfulData";
import styles from "./page.module.css";

type Video = {
  title: string;
  slug: string;
  tag: string;
  thumbnailImg: {
    url: string;
  };
  thumbnailVideo: {
    url: string;
  };
  vimeoLink: string;
};

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        query{
          videoListCollection(where: {title: "Video List"}, limit: 1){
            items{
              videosCollection{
                items{
                  ... on Video{
                    title
                    slug
                    tag
                    thumbnailImg{
                      url
                    }
                    thumbnailVideo{
                      url
                    }
                    vimeoLink
                  }
                }
              }
            }
          }
        }
      `;
      const { data, error } = await fetchContentfulData(query);

      if (error) {
        console.error("Error fetching video data:", error);
      } else if (data && data.videoListCollection.items.length > 0) {
        setVideos(data.videoListCollection.items[0].videosCollection.items);
      } else {
        console.error("Video data not found");
      }
    };

    fetchData();
  }, []);

  const handleMouseEnter = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.play().catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Error playing video:", err);
        }
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      // video.load();
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.videoList}>
        {videos.map((video, index) => (
          <Link
            href={`/work/${video.slug}`}
            key={index}
            className={styles.videoContainer}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className={styles.videoDescriptionContainer}>
              <div className={styles.videoDescription}>
                <div className={styles.videoTitleContainer}>
                  <h2 className={styles.videoTitle}>{video.title}</h2>
                </div>
                <div className={styles.videoTagContainer}>
                  <h3 className={styles.videoTag}>{video.tag}</h3>
                </div>
              </div>
            </div>
            <div className={styles.videoThumbnail}>
              {video.thumbnailVideo ? (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={video.thumbnailVideo.url}
                  poster={video.thumbnailImg.url}
                  playsInline
                  muted
                  loop
                  preload="auto"
                />
              ) : (
                <Image src={video.thumbnailImg.url} alt={video.title} fill />
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

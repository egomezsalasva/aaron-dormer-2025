import { Metadata } from "next";
import Video from "./Video";
import { fetchContentfulData } from "@/app/utils/fetchContentfulData";
import { metadataFallback } from "../../utils/metadataFallback";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ video: string }>;
};

const query = `
  query GetVideo($slug: String!) {
    videoCollection(where: {slug: $slug}, limit: 1) {
      items {
        seoTitle
        seoDescription
      }
    }
  }
`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { video } = await params;
  const { data, error } = await fetchContentfulData(query, {
    slug: video,
  });
  if (error) {
    return metadataFallback;
  }
  const pageData = data.videoCollection.items[0];
  return {
    title: pageData.seoTitle,
    description: pageData.seoDescription,
  };
}

export default function VideoPage() {
  return (
    <main className={styles.main}>
      <Video />
    </main>
  );
}

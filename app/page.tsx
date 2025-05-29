import { Metadata } from "next";
import Videos from "./home/Videos";
import styles from "./page.module.css";
import { fetchContentfulData } from "./utils/fetchContentfulData";
import { metadataFallback } from "./utils/metadataFallback";

const query = `
query {
  videoListCollection(where: {title: "Video List"}, limit: 1) {
    items {
      seoTitleHome
      seoDescriptionHome
    }
  }
}
`;

export async function generateMetadata(): Promise<Metadata> {
  const { data, error } = await fetchContentfulData(query);
  if (error) {
    return metadataFallback;
  }
  const pageData = data.videoListCollection.items[0];
  return {
    title: pageData.seoTitleHome,
    description: pageData.seoDescriptionHome,
  };
}

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Videos />
    </main>
  );
}

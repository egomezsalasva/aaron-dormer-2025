import { Metadata } from "next";
import Videos from "./home/Videos";
import styles from "./page.module.css";
import { fetchContentfulData } from "./utils/fetchContentfulData";

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
    return {
      title: "Aaron Dormer",
      description:
        "Explore a curated selection of Aaron Dormer's acclaimed commercials, music videos, and short films that showcase his unique visual storytelling and artistic vision.",
    };
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

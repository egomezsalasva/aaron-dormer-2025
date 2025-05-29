import { Metadata } from "next";
import { fetchContentfulData } from "../utils/fetchContentfulData";
import About from "./About";
import { metadataFallback } from "../utils/metadataFallback";
import styles from "./page.module.css";

const query = `
query{
  aboutCollection(where: {title:"About"}, limit: 1){
    items{
      seoTitleAbout
      seoDescriptionAbout
    }
  }
}
`;

export async function generateMetadata(): Promise<Metadata> {
  const { data, error } = await fetchContentfulData(query);
  if (error) {
    return metadataFallback;
  }
  const pageData = data.aboutCollection.items[0];
  return {
    title: pageData.seoTitleAbout,
    description: pageData.seoDescriptionAbout,
  };
}

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <About />
    </main>
  );
}

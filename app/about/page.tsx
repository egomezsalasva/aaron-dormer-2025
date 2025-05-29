import { Metadata } from "next";
import { fetchContentfulData } from "../utils/fetchContentfulData";
import About from "./About";
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
    return {
      title: "Aaron Dormer",
      description:
        "Explore a curated selection of Aaron Dormer's acclaimed commercials, music videos, and short films that showcase his unique visual storytelling and artistic vision.",
    };
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

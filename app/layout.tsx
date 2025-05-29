import Header from "./header/Header";
import "./globals.css";
import styles from "./page.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.page}>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

"use client";
import NavLink from "./NavLink";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isVideoRoute = pathname?.includes("/work");

  return (
    <header className={styles.header}>
      <div className={styles.navList}>
        <div className={styles.navLeft}>
          <NavLink href="/">
            {isVideoRoute ? "< Back" : "Selected Work"}
          </NavLink>
        </div>
        <div className={styles.navCenter}>
          <img
            src="/aaron-logo.png"
            alt="Aaron Dormer"
            className={styles.logo}
          />
        </div>
        <div className={styles.navRight}>
          <NavLink href="/about">About // Contact</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;

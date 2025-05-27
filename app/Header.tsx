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
        <NavLink href="/">{isVideoRoute ? "< Back" : "Selected Work"}</NavLink>
        <img src="/aaron-logo.png" alt="Aaron Dormer" className={styles.logo} />
        <NavLink href="/about">About // Contact</NavLink>
      </div>
    </header>
  );
};

export default Header;

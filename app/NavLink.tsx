"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLink.module.css";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href === "/" && pathname?.startsWith("/work"));

  return (
    <Link href={href} className={isActive ? styles.active : styles.inactive}>
      {children}
    </Link>
  );
};

export default NavLink;

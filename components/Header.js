"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/home", label: "Home" },
  { href: "/calendar", label: "Calendar" },
  { href: "/about", label: "About Us" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState("User");

  useEffect(() => {
    setUser(localStorage.getItem("bg-user") || "User");
  }, []);

  function logout() {
    localStorage.removeItem("bg-user");
    router.push("/");
  }

  return (
    <header className="header">
      <Link href="/home" className="brand">Basic Growth</Link>
      <nav className="nav" aria-label="Main">
        {links.map((l) => (
          <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>{l.label}</Link>
        ))}
      </nav>
      <div className="user">
        <span>Hi, {user}</span>
        <button className="btn-logout" onClick={logout}>Log out</button>
      </div>
    </header>
  );
}

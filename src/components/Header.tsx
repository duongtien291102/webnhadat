"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Về chúng tôi", path: "/ve-nous" },
    { name: "Dịch vụ", path: "/dich-vu" },
    { name: "Dự án", path: "/du-an" },
    { name: "Mẫu nhà", path: "/mau-nha" },
    { name: "Quy trình", path: "/quy-trinh" },
    { name: "Blog", path: "/blog" },
    { name: "Liên hệ", path: "/lien-he" },
  ];

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      padding: "20px 5%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 1000,
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      backdropFilter: "blur(10px)",
      boxSizing: "border-box",
      opacity: scrolled ? 1 : 0,
      transform: scrolled ? "translateY(0)" : "translateY(-100%)",
      pointerEvents: scrolled ? "auto" : "none"
    }}>
      <Link href="/" style={{ 
        color: "white", 
        textDecoration: "none", 
        fontSize: "1.5rem", 
        fontWeight: "bold",
        fontFamily: "'Playfair Display', Georgia, serif",
        letterSpacing: "1px"
      }}>
        NOU.Architects
      </Link>

      <nav style={{ display: "flex", gap: "30px" }}>
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            href={link.path}
            className={`nav-link ${pathname === link.path ? 'active' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}

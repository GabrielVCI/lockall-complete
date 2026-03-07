/*
 * Design: Institutional Clarity — Modern minimalist
 * Navbar: Transparent on home (dark hero), white on other pages. Sticky with blur on scroll.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ASSETS, NAV_LINKS } from "@/lib/constants";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  // Home page has dark video hero — navbar starts transparent with white text
  const isHomePage = location === "/";
  const showDarkNav = isHomePage && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : isHomePage
            ? "bg-transparent"
            : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <nav className="container flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img
            src={ASSETS.logo}
            alt="LOCKALL"
            className="h-30 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.filter(l => l.href !== "/").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13.5px] font-heading font-medium tracking-wide transition-colors duration-200 ${
                location === link.href
                  ? "text-lockall-cyan"
                  : showDarkNav
                    ? "text-white/70 hover:text-white"
                    : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center h-10 px-6 text-[13px] font-heading font-semibold tracking-wide text-white bg-lockall-cyan hover:bg-lockall-cyan-dark rounded transition-all duration-200"
          >
            Solicitar Demostración
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 transition-colors ${
            showDarkNav
              ? "text-white/70 hover:text-white"
              : "text-foreground/70 hover:text-foreground"
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <div className="container py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] font-heading font-medium py-2 transition-colors ${
                  location === link.href
                    ? "text-lockall-cyan"
                    : "text-foreground/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center h-11 px-6 mt-2 text-[14px] font-heading font-semibold text-white bg-lockall-cyan rounded"
            >
              Solicitar Demostración
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

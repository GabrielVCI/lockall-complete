// /*
//  * Design: Institutional Clarity — Modern minimalist
//  * Navbar: Transparent on home (dark hero), white on other pages. Sticky with blur on scroll.
//  */
// import { useState, useEffect } from "react";
// import { Link, useLocation } from "wouter";
// import { ASSETS, NAV_LINKS } from "@/lib/constants";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [location] = useLocation();

//   // Home page has dark video hero — navbar starts transparent with white text
//   const isHomePage = location === "/";
//   const showDarkNav = isHomePage && !scrolled;

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     setMobileOpen(false);
//   }, [location]);

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
//           : isHomePage
//             ? "bg-transparent"
//             : "bg-white/80 backdrop-blur-sm"
//       }`}
//     >
//       <nav className="container flex items-center justify-between h-[72px]">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2 shrink-0">
//           <img
//             src={ASSETS.logo}
//             alt="LOCKALL"
//             className="h-30 w-auto"
//           />
//         </Link>

//         {/* Desktop Nav */}
//         <div className="hidden lg:flex items-center gap-8">
//           {NAV_LINKS.filter(l => l.href !== "/").map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`text-[13.5px] font-heading font-medium tracking-wide transition-colors duration-200 ${
//                 location === link.href
//                   ? "text-lockall-cyan"
//                   : showDarkNav
//                     ? "text-white/70 hover:text-white"
//                     : "text-foreground/70 hover:text-foreground"
//               }`}
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>

//         {/* CTA */}
//         <div className="hidden lg:flex items-center gap-4">
//           <Link
//             href="/contacto"
//             className="inline-flex items-center justify-center h-10 px-6 text-[13px] font-heading font-semibold tracking-wide text-white bg-lockall-cyan hover:bg-lockall-cyan-dark rounded transition-all duration-200"
//           >
//             Solicitar Demostración
//           </Link>
//         </div>

//         {/* Mobile Toggle */}
//         <button
//           onClick={() => setMobileOpen(!mobileOpen)}
//           className={`lg:hidden p-2 transition-colors ${
//             showDarkNav
//               ? "text-white/70 hover:text-white"
//               : "text-foreground/70 hover:text-foreground"
//           }`}
//           aria-label="Toggle menu"
//         >
//           {mobileOpen ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </nav>

//       {/* Mobile Menu */}
//       {mobileOpen && (
//         <div className="lg:hidden bg-white border-t border-border">
//           <div className="container py-6 flex flex-col gap-4">
//             {NAV_LINKS.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`text-[15px] font-heading font-medium py-2 transition-colors ${
//                   location === link.href
//                     ? "text-lockall-cyan"
//                     : "text-foreground/70"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <Link
//               href="/contacto"
//               className="inline-flex items-center justify-center h-11 px-6 mt-2 text-[14px] font-heading font-semibold text-white bg-lockall-cyan rounded"
//             >
//               Solicitar Demostración
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


/*
 * Design: Institutional Clarity — Modern minimalist
 * Navbar: Transparent on home (dark hero), white on other pages. Sticky with blur on scroll.
 * Responsive improvements:
 * - Better max-width control
 * - Progressive horizontal padding
 * - Better logo sizing by breakpoint
 * - More stable spacing for desktop/tablet
 * - Cleaner mobile panel
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ASSETS, NAV_LINKS } from "@/lib/constants";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

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

  const desktopLinks = NAV_LINKS.filter((l) => l.href !== "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : isHomePage
          ? "bg-transparent"
          : "bg-white/85 backdrop-blur-sm"
      }`}
    >
      <nav
        className="
          mx-auto
          h-[68px] sm:h-[72px] xl:h-[78px]
          w-full max-w-[1600px]
          px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20
        "
      >
        <div className="flex h-full items-center justify-between gap-3 sm:gap-4 lg:gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
<img
  src={ASSETS.logo}
  alt="LOCKALL"
  className="
    w-auto object-contain
    h-10 sm:h-15 md:h-20 lg:h-19 xl:h-17
    max-w-[180px] sm:max-w-[180px] md:max-w-[180px] lg:max-w-[180px] xl:max-w-[290px]
    scale-[1.2] md:scale-[1.6] lg:scale-[1.9] xl:scale-[2.1 ]
    origin-left
  "
/>
          </Link>

          {/* Desktop / Large Tablet Nav */}
          <div className="hidden lg:flex min-w-0 flex-1 items-center justify-center px-4 xl:px-8">
            <div className="flex min-w-0 items-center gap-5 xl:gap-7 2xl:gap-9">
              {desktopLinks.map((link) => {
                const isActive = location === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`whitespace-nowrap text-[13px] xl:text-[13.5px] 2xl:text-[14px] font-heading font-medium tracking-[0.02em] transition-colors duration-200 ${
                      isActive
                        ? "text-lockall-cyan"
                        : showDarkNav
                        ? "text-white/75 hover:text-white"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex shrink-0 items-center">
            <Link
              href="/contacto"
              className="
                inline-flex items-center justify-center shrink-0
                h-10 xl:h-11
                px-4 xl:px-6
                text-[12.5px] xl:text-[13px]
                font-heading font-semibold tracking-[0.03em]
                text-white bg-lockall-cyan hover:bg-lockall-cyan-dark
                rounded-md transition-all duration-200
              "
            >
              Solicitar Demostración
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`lg:hidden inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors ${
              showDarkNav
                ? "text-white/80 hover:text-white"
                : "text-foreground/70 hover:text-foreground"
            }`}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen
            ? "max-h-[520px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="border-t border-border bg-white/98 backdrop-blur-md">
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-8">
            <div className="flex flex-col py-5 sm:py-6">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = location === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-md px-2 py-3 text-[15px] sm:text-[15.5px] font-heading font-medium transition-colors ${
                        isActive
                          ? "text-lockall-cyan bg-lockall-cyan/5"
                          : "text-foreground/75 hover:text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 sm:pt-5">
                <Link
                  href="/contacto"
                  className="
                    inline-flex w-full items-center justify-center
                    h-11 sm:h-12
                    px-6
                    text-[14px] font-heading font-semibold
                    text-white bg-lockall-cyan hover:bg-lockall-cyan-dark
                    rounded-md transition-colors
                  "
                >
                  Solicitar Demostración
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
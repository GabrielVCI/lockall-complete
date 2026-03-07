/*
 * Design: Institutional Clarity — McKinsey meets Stripe Enterprise
 * Footer: Minimal, dark navy background, clean columns, subtle links.
 */
import { Link } from "wouter";
import { ASSETS } from "@/lib/constants";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-lockall-navy text-white/80">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={ASSETS.logo} alt="LOCKALL" className="h-30 w-auto mb-5" />
            <p className="text-[14px] leading-relaxed text-white/50 max-w-[280px]">
              Soluciones avanzadas de mitigación de riesgo en el financiamiento de dispositivos.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-[13px] font-heading font-semibold tracking-widest uppercase text-white/40 mb-5">
              Soluciones
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="/soluciones" className="text-[14px] text-white/60 hover:text-white transition-colors">
                LOCKALL Shield™
              </Link>
              <Link href="/soluciones" className="text-[14px] text-white/60 hover:text-white transition-colors">
                LOCKALL Control™
              </Link>
              <Link href="/soluciones" className="text-[14px] text-white/60 hover:text-white transition-colors">
                LOCKALL Insight™
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[13px] font-heading font-semibold tracking-widest uppercase text-white/40 mb-5">
              Empresa
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="/sobre-lockall" className="text-[14px] text-white/60 hover:text-white transition-colors">
                Sobre LOCKALL
              </Link>
              <Link href="/seguridad" className="text-[14px] text-white/60 hover:text-white transition-colors">
                Seguridad y Cumplimiento
              </Link>
              <Link href="/recursos" className="text-[14px] text-white/60 hover:text-white transition-colors">
                Recursos
              </Link>
              <Link href="/contacto" className="text-[14px] text-white/60 hover:text-white transition-colors">
                Contacto Corporativo
              </Link>
            </div>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-[13px] font-heading font-semibold tracking-widest uppercase text-white/40 mb-5">
              Legal
            </h4>
            <div className="flex flex-col gap-3">
              <span className="text-[14px] text-white/60 hover:text-white transition-colors cursor-pointer">
                Política de Privacidad
              </span>
              <span className="text-[14px] text-white/60 hover:text-white transition-colors cursor-pointer">
                Términos y Condiciones
              </span>
              <span className="text-[14px] text-white/60 hover:text-white transition-colors cursor-pointer">
                Cumplimiento
              </span>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="mailto:info@lockall.co" className="text-white/40 hover:text-white transition-colors" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/30 font-heading">
            © {new Date().getFullYear()} LOCKALL. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1 text-[12px] text-white/30 font-heading">
            <span>Soluciones globales de protección financiera</span>
            <ArrowUpRight size={12} />
          </div>
        </div>
      </div>
    </footer>
  );
}

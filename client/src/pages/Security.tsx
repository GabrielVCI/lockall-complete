/*
 * Design: Institutional Clarity — McKinsey meets Stripe Enterprise
 * Security & Compliance page: Technical, solid tone. Two main sections.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import {
  Shield,
  Lock,
  Server,
  Key,
  Eye,
  FileCheck,
  Globe,
  Scale,
  BookOpen,
  Users,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "Cifrado de extremo a extremo",
    desc: "Toda la comunicación entre los servidores centrales y los dispositivos protegidos utiliza cifrado AES-256 con intercambio de claves mediante protocolo Diffie-Hellman.",
  },
  {
    icon: Server,
    title: "Infraestructura redundante",
    desc: "Centros de datos distribuidos geográficamente con replicación en tiempo real, garantizando una disponibilidad del 99.9% y recuperación ante desastres.",
  },
  {
    icon: Key,
    title: "Gestión de claves segura",
    desc: "Sistema de gestión de claves criptográficas con módulos de seguridad de hardware (HSM) certificados FIPS 140-2 Level 3.",
  },
  {
    icon: Eye,
    title: "Monitoreo continuo",
    desc: "Centro de operaciones de seguridad (SOC) activo 24/7 con detección de amenazas en tiempo real y respuesta automatizada ante incidentes.",
  },
  {
    icon: Shield,
    title: "Pruebas de penetración",
    desc: "Evaluaciones de seguridad periódicas realizadas por firmas independientes especializadas, con remediación inmediata de hallazgos.",
  },
  {
    icon: Users,
    title: "Control de acceso",
    desc: "Autenticación multifactor obligatoria, control de acceso basado en roles (RBAC) y registro completo de auditoría para todas las operaciones.",
  },
];

const complianceItems = [
  {
    icon: Globe,
    title: "Regulación de telecomunicaciones",
    desc: "Cumplimiento con las normativas de telecomunicaciones aplicables en cada jurisdicción donde operamos, incluyendo requisitos de registro y operación de servicios de valor agregado.",
  },
  {
    icon: Scale,
    title: "Protección al consumidor",
    desc: "Diseño de procesos que respetan los derechos del consumidor, con mecanismos de notificación transparentes y procedimientos de resolución accesibles.",
  },
  {
    icon: FileCheck,
    title: "Privacidad de datos",
    desc: "Adherencia a marcos de privacidad internacionales incluyendo GDPR, LGPD y regulaciones locales de protección de datos personales.",
  },
  {
    icon: BookOpen,
    title: "Normativa financiera",
    desc: "Operación alineada con los requisitos regulatorios del sector financiero, incluyendo normativas de gestión de riesgo y reporte a autoridades supervisoras.",
  },
  {
    icon: ShieldCheck,
    title: "Certificaciones de seguridad",
    desc: "Procesos alineados con estándares internacionales de seguridad de la información, incluyendo ISO 27001 y SOC 2 Type II.",
  },
  {
    icon: Users,
    title: "Equipos de cumplimiento locales",
    desc: "Profesionales de cumplimiento dedicados en cada región de operación, trabajando en coordinación con las autoridades regulatorias locales.",
  },
];

export default function Security() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-lockall-pearl">
        <div className="container">
          <div className="max-w-[720px]">
            <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan mb-4 block">
              Confianza y Cumplimiento
            </span>
            <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,3.25rem)] leading-[1.05] tracking-tight text-lockall-navy mb-6">
              Seguridad Empresarial y Cumplimiento Normativo
            </h1>
            <p className="text-[17px] leading-relaxed text-lockall-graphite max-w-[600px]">
              La seguridad y el cumplimiento regulatorio son pilares fundamentales de nuestra operación. Cada componente de las soluciones que ofrecemos ha sido diseñado con estos principios como requisitos no negociables.
            </p>
          </div>
        </div>
      </section>

      {/* Enterprise Security */}
      <section className="section-padding">
        <div className="container">
          <SectionReveal>
            <div className="max-w-[680px] mb-14">
              <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan mb-4 block">
                Seguridad
              </span>
              <h2 className="font-display font-bold text-[clamp(2rem,4vw,2.5rem)] leading-[1.1] tracking-tight text-lockall-navy mb-5">
                Seguridad Empresarial
              </h2>
              <p className="text-[16px] leading-relaxed text-lockall-graphite">
                Las soluciones de LOCKALL han sido diseñadas para cumplir con los estándares más exigentes del sector financiero. Cada capa de protección opera de forma independiente, conformando una estrategia de defensa en profundidad.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((f, i) => (
              <SectionReveal key={i} delay={i * 100}>
                <div className="exec-card p-7 rounded h-full">
                  <f.icon size={22} className="text-lockall-cyan mb-4" />
                  <h3 className="text-[16px] font-heading font-semibold text-lockall-navy mb-2">
                    {f.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-lockall-graphite">
                    {f.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="section-padding bg-lockall-pearl">
        <div className="container">
          <SectionReveal>
            <div className="max-w-[680px] mb-14">
              <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-orange mb-4 block">
                Cumplimiento
              </span>
              <h2 className="font-display font-bold text-[clamp(2rem,4vw,2.5rem)] leading-[1.1] tracking-tight text-lockall-navy mb-5">
                Cumplimiento Normativo
              </h2>
              <p className="text-[16px] leading-relaxed text-lockall-graphite">
                Operamos bajo un marco de cumplimiento integral que abarca regulaciones de telecomunicaciones, protección al consumidor, privacidad de datos y normativa financiera en cada jurisdicción donde tenemos presencia.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceItems.map((c, i) => (
              <SectionReveal key={i} delay={i * 100}>
                <div className="p-7 bg-white rounded border border-border hover:shadow-md transition-all duration-300 h-full">
                  <c.icon size={22} className="text-lockall-orange mb-4" />
                  <h3 className="text-[16px] font-heading font-semibold text-lockall-navy mb-2">
                    {c.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-lockall-graphite">
                    {c.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Standards bar */}
      <section className="py-16 bg-lockall-navy">
        <div className="container">
          <SectionReveal>
            <div className="text-center mb-10">
              <h3 className="text-[18px] font-heading font-semibold text-white mb-2">
                Estándares y Marcos de Referencia
              </h3>
              <p className="text-[14px] text-white/50">
                Nuestra operación se alinea con los principales marcos internacionales de seguridad y cumplimiento.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
              {["ISO 27001", "SOC 2 Type II", "GDPR", "LGPD", "PCI DSS", "FIPS 140-2"].map((std) => (
                <div key={std} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-lockall-cyan" />
                  <span className="text-[14px] font-heading font-medium text-white/70">{std}</span>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container text-center">
          <SectionReveal>
            <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.25rem)] leading-[1.1] tracking-tight text-lockall-navy mb-5">
              ¿Necesita más información sobre nuestras prácticas de seguridad?
            </h2>
            <p className="text-[16px] text-lockall-graphite max-w-[520px] mx-auto mb-8">
              Nuestro equipo de seguridad y cumplimiento está disponible para responder consultas técnicas y proporcionar documentación detallada.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 h-12 px-7 text-[14px] font-heading font-semibold text-white bg-lockall-cyan hover:bg-lockall-cyan-dark rounded transition-all duration-200"
            >
              Contactar Equipo de Seguridad
              <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </Layout>
  );
}

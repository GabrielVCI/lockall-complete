/*
 * Design: Institutional Clarity — Modern minimalist with Space Grotesk display font
 * Home page: Video hero with cinematic entrance, editorial layout, generous whitespace.
 * Sections: Hero (video), Problem, Solution, 6 Security Layers, Who We Serve, Global Reach, Video CTA
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { ASSETS } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import {
  ArrowRight,
  Shield,
  Lock,
  Radio,
  Brain,
  Scale,
  BarChart3,
  Building2,
  Landmark,
  CreditCard,
  ShoppingBag,
  Wallet,
  ChevronRight,
  Play,
} from "lucide-react";

/* ─── Hero with Video Background ─── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Trigger entrance animation after a short delay
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-lockall-navy">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-[2000ms] ease-out ${
            loaded ? "opacity-35" : "opacity-0"
          }`}
          onCanPlay={() => {
            // Video is ready
          }}
        >
          <source src={ASSETS.video} type="video/mp4" />
        </video>
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-lockall-navy via-lockall-navy/85 to-lockall-navy/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-lockall-navy via-transparent to-lockall-navy/30" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-[780px]">
          {/* Tag — slides in from left */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-lockall-cyan/30 bg-lockall-cyan/10 backdrop-blur-sm transition-all duration-700 ease-out ${
              loaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-lockall-cyan animate-pulse" />
            <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan">
              Infraestructura de Protección Financiera
            </span>
          </div>

          {/* H1 — Space Grotesk, fades up */}
          <h1
            className={`font-display font-bold text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.05] tracking-tight text-white mb-6 transition-all duration-1000 ease-out ${
              loaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            Soluciones Avanzadas de{" "}
            <span className="text-lockall-cyan">Mitigación de Riesgo</span> en
            Financiamiento de Dispositivos
          </h1>

          {/* Subtitle — fades up with delay */}
          <p
            className={`text-[17px] leading-relaxed text-white/60 max-w-[580px] mb-10 font-body transition-all duration-1000 ease-out ${
              loaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            Proteja teléfonos móviles y electrodomésticos financiados con
            soluciones respaldadas por tecnología de clase mundial, diseñadas
            para instituciones financieras.
          </p>

          {/* CTAs — fade up */}
          <div
            className={`flex flex-wrap items-center gap-4 transition-all duration-1000 ease-out ${
              loaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 h-12 px-7 text-[14px] font-heading font-semibold text-lockall-navy bg-lockall-cyan hover:bg-lockall-cyan-light rounded transition-all duration-200 shadow-[0_4px_20px_rgba(14,165,233,0.3)]"
            >
              Solicitar Demostración Privada
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 h-12 px-7 text-[14px] font-heading font-semibold text-white/90 border border-white/20 hover:border-white/40 hover:bg-white/5 rounded transition-all duration-200 backdrop-blur-sm"
            >
              Hablar con un Especialista
            </Link>
          </div>

          {/* Trust indicators — fade in last */}
          <div
            className={`flex items-center gap-8 mt-14 pt-8 border-t border-white/10 transition-all duration-1000 ease-out ${
              loaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1200ms" }}
          >
            <MetricBlock value={45} suffix="+" label="Países con cobertura" startVisible dark />
            <div className="w-px h-10 bg-white/10" />
            <MetricBlock value={12} suffix="M+" label="Dispositivos protegidos" startVisible dark />
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="hidden sm:block">
              <MetricBlock value={99} suffix=".9%" label="Disponibilidad" startVisible dark />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}

function MetricBlock({
  value,
  suffix,
  label,
  startVisible,
  dark,
}: {
  value: number;
  suffix: string;
  label: string;
  startVisible?: boolean;
  dark?: boolean;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });
  const shouldAnimate = startVisible || isVisible;
  const count = useCountUp(value, 2000, shouldAnimate);
  return (
    <div ref={ref}>
      <div
        className={`text-[28px] font-heading font-bold leading-none ${
          dark ? "text-white" : "text-lockall-navy"
        }`}
      >
        {count}
        {suffix}
      </div>
      <div
        className={`text-[12px] font-heading mt-1 tracking-wide ${
          dark ? "text-white/40" : "text-muted-foreground"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

/* ─── Problem Section ─── */
function ProblemSection() {
  const problems = [
    {
      title: "Incremento estructural de impagos",
      desc: "El crecimiento acelerado del financiamiento de dispositivos ha generado un aumento sostenido en las tasas de incumplimiento, particularmente en mercados emergentes.",
    },
    {
      title: "Dificultad de recuperación de activos",
      desc: "Los dispositivos financiados representan activos de difícil localización y recuperación física, lo que incrementa las pérdidas netas de las carteras.",
    },
    {
      title: "Limitaciones legales y regulatorias",
      desc: "Los marcos jurídicos tradicionales no ofrecen mecanismos ágiles para la protección de activos tecnológicos financiados a escala masiva.",
    },
    {
      title: "Falta de herramientas especializadas",
      desc: "Las soluciones genéricas de cobranza no contemplan las particularidades del financiamiento de dispositivos ni la complejidad operativa que implica.",
    },
    {
      title: "Riesgo operacional en carteras masivas",
      desc: "La gestión manual de miles de dispositivos financiados genera ineficiencias operativas y exposición a errores que amplifican el riesgo.",
    },
  ];

  return (
    <section className="section-padding bg-lockall-pearl">
      <div className="container">
        <SectionReveal>
          <div className="max-w-[680px] mb-14">
            <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-orange mb-4 block">
              El Desafío
            </span>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-lockall-navy mb-5">
              El Riesgo en el Financiamiento de Dispositivos Está Aumentando
            </h2>
            <p className="text-[16px] leading-relaxed text-lockall-graphite">
              A medida que el financiamiento de dispositivos tecnológicos se
              expande globalmente, las instituciones financieras enfrentan
              desafíos estructurales que los procesos tradicionales de cobranza
              no pueden resolver de manera eficiente.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <SectionReveal key={i} delay={i * 100}>
              <div className="p-7 bg-white rounded border border-border hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 rounded flex items-center justify-center bg-lockall-orange/10 text-lockall-orange mb-4">
                  <span className="text-[14px] font-heading font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-[16px] font-heading font-semibold text-lockall-navy mb-3">
                  {p.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-lockall-graphite">
                  {p.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={600}>
          <div className="mt-12 p-6 border-l-[3px] border-lockall-cyan bg-white rounded-r">
            <p className="text-[16px] font-body italic text-lockall-navy leading-relaxed">
              "Las instituciones financieras requieren infraestructura
              tecnológica de mitigación de riesgo, no únicamente procesos
              tradicionales de cobranza."
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─── Solution Section ─── */
function SolutionSection() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SectionReveal>
            <div>
              <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan mb-4 block">
                La Solución
              </span>
              <h2 className="font-display font-bold text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-lockall-navy mb-5">
                Un Nuevo Estándar en Protección de Activos Digitales Financiados
              </h2>
              <p className="text-[16px] leading-relaxed text-lockall-graphite mb-6">
                LOCKALL ofrece soluciones de mitigación de riesgo que operan
                a nivel de dispositivo, proporcionando a las instituciones
                financieras un mecanismo de protección sin precedentes sobre
                los activos tecnológicos que financian.
              </p>
              <p className="text-[16px] leading-relaxed text-lockall-graphite mb-8">
                Nuestras soluciones combinan seguridad a nivel de hardware,
                inteligencia de datos y cumplimiento regulatorio en una oferta
                unificada que se integra directamente con los sistemas de gestión
                de cartera existentes.
              </p>

              <div className="p-5 bg-lockall-pearl rounded border border-border">
                <p className="text-[15px] font-heading font-semibold text-lockall-navy">
                  No somos un sistema. Somos el aliado estratégico que
                  protege su cartera de financiamiento.
                </p>
              </div>

              <Link
                href="/soluciones"
                className="inline-flex items-center gap-2 mt-8 text-[14px] font-heading font-semibold text-lockall-cyan hover:text-lockall-cyan-dark transition-colors"
              >
                Explorar nuestras soluciones
                <ChevronRight size={16} />
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal delay={200}>
            <div className="relative">
              <img
                src={ASSETS.solutionsAbstract}
                alt="Protección de dispositivos LOCKALL"
                className="w-full rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-lg shadow-lg border border-border">
                <div className="text-[32px] font-heading font-bold text-lockall-cyan leading-none">
                  6
                </div>
                <div className="text-[12px] font-heading text-muted-foreground mt-1">
                  Capas de Seguridad
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Security Layers ─── */
function SecurityLayersSection() {
  const layers = [
    {
      icon: Shield,
      title: "Integridad del Sistema",
      desc: "Verificación continua de la integridad del software y hardware del dispositivo, garantizando que los mecanismos de protección permanezcan operativos en todo momento.",
    },
    {
      icon: Lock,
      title: "Protección Antimanipulación",
      desc: "Sistemas avanzados de detección y prevención de intentos de evasión, incluyendo protección contra restablecimiento de fábrica, cambio de firmware y manipulación física.",
    },
    {
      icon: Radio,
      title: "Transmisión Segura de Comandos",
      desc: "Canal de comunicación cifrado de extremo a extremo entre los servidores centrales y cada dispositivo, con autenticación multifactor y protocolos de redundancia.",
    },
    {
      icon: Brain,
      title: "Ejecución Inteligente de Control",
      desc: "Motor de decisiones que ejecuta acciones graduales y proporcionales basadas en el estado de la cuenta, desde notificaciones hasta restricciones progresivas del dispositivo.",
    },
    {
      icon: Scale,
      title: "Cumplimiento y Marco Legal",
      desc: "Arquitectura diseñada para cumplir con regulaciones de protección al consumidor, privacidad de datos y telecomunicaciones en múltiples jurisdicciones.",
    },
    {
      icon: BarChart3,
      title: "Analítica e Inteligencia de Riesgo",
      desc: "Panel de control con métricas en tiempo real sobre el estado de la cartera, patrones de comportamiento y predicción de riesgo mediante modelos de machine learning.",
    },
  ];

  return (
    <section className="section-padding bg-lockall-navy text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <img
          src={ASSETS.securityLayers}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-10">
        <SectionReveal>
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan mb-4 block">
              Arquitectura de Seguridad
            </span>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-white mb-5">
              6 Capas de Protección Integradas
            </h2>
            <p className="text-[16px] leading-relaxed text-white/60">
              Cada capa opera de forma independiente y complementaria,
              conformando una estrategia de defensa en profundidad que protege
              los activos financiados desde múltiples vectores.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {layers.map((layer, i) => (
            <SectionReveal key={i} delay={i * 100}>
              <div className="p-7 rounded border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/8 transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded flex items-center justify-center bg-lockall-cyan/15 text-lockall-cyan mb-5">
                  <layer.icon size={20} />
                </div>
                <div className="text-[11px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan/60 mb-2">
                  Capa {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-[17px] font-heading font-semibold text-white mb-3">
                  {layer.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-white/50">
                  {layer.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Who We Serve ─── */
function WhoWeServeSection() {
  const segments = [
    {
      icon: Landmark,
      title: "Bancos Comerciales",
      desc: "Instituciones bancarias con carteras de financiamiento de dispositivos que requieren mecanismos avanzados de mitigación de riesgo.",
    },
    {
      icon: Building2,
      title: "Instituciones Financieras",
      desc: "Entidades reguladas que buscan reducir la exposición al riesgo en sus líneas de crédito para tecnología de consumo.",
    },
    {
      icon: CreditCard,
      title: "Financieras de Consumo",
      desc: "Compañías especializadas en crédito al consumo que financian dispositivos tecnológicos a escala masiva.",
    },
    {
      icon: ShoppingBag,
      title: "Retailers con Crédito Propio",
      desc: "Cadenas comerciales que ofrecen financiamiento directo y necesitan proteger sus activos tecnológicos.",
    },
    {
      icon: Wallet,
      title: "Programas BNPL",
      desc: "Plataformas de compra ahora, paga después que requieren soluciones de protección para dispositivos financiados.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <SectionReveal>
          <div className="max-w-[680px] mb-14">
            <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan mb-4 block">
              Segmentos
            </span>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-lockall-navy mb-5">
              A Quiénes Servimos
            </h2>
            <p className="text-[16px] leading-relaxed text-lockall-graphite">
              Trabajamos exclusivamente con instituciones financieras y entidades
              de crédito que operan a escala, proporcionando infraestructura de
              nivel empresarial.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {segments.map((s, i) => (
            <SectionReveal key={i} delay={i * 100}>
              <div className="exec-card p-7 rounded h-full">
                <s.icon size={22} className="text-lockall-cyan mb-4" />
                <h3 className="text-[16px] font-heading font-semibold text-lockall-navy mb-2">
                  {s.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-lockall-graphite">
                  {s.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Global Reach ─── */
function GlobalReachSection() {
  return (
    <section className="section-padding bg-lockall-pearl">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SectionReveal delay={200}>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src={ASSETS.globalNetwork}
                alt="Red global LOCKALL"
                className="w-full"
              />
            </div>
          </SectionReveal>

          <SectionReveal>
            <div>
              <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan mb-4 block">
                Alcance Internacional
              </span>
              <h2 className="font-display font-bold text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-lockall-navy mb-5">
                Infraestructura Global, Cumplimiento Local
              </h2>
              <p className="text-[16px] leading-relaxed text-lockall-graphite mb-6">
                LOCKALL tiene presencia en más de 45 países, con soluciones
                respaldadas por infraestructura distribuida que garantiza baja
                latencia y alta disponibilidad. Nos adaptamos a los marcos
                regulatorios de cada
                jurisdicción, asegurando cumplimiento normativo sin comprometer
                la eficiencia operativa.
              </p>
              <p className="text-[16px] leading-relaxed text-lockall-graphite mb-8">
                Cada despliegue regional cuenta con equipos de cumplimiento
                dedicados que trabajan en coordinación con las autoridades
                regulatorias locales, garantizando que las operaciones se ajusten
                a las normativas vigentes en materia de telecomunicaciones,
                protección al consumidor y privacidad de datos.
              </p>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-[28px] font-heading font-bold text-lockall-navy">
                    45+
                  </div>
                  <div className="text-[12px] font-heading text-muted-foreground mt-1">
                    Países
                  </div>
                </div>
                <div>
                  <div className="text-[28px] font-heading font-bold text-lockall-navy">
                    5
                  </div>
                  <div className="text-[12px] font-heading text-muted-foreground mt-1">
                    Continentes
                  </div>
                </div>
                <div>
                  <div className="text-[28px] font-heading font-bold text-lockall-navy">
                    24/7
                  </div>
                  <div className="text-[12px] font-heading text-muted-foreground mt-1">
                    Operación
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Video CTA Section ─── */
function VideoCTASection() {
  return (
    <section className="section-padding">
      <div className="container">
        <SectionReveal>
          <div className="text-center max-w-[680px] mx-auto mb-10">
            <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan mb-4 block">
              Conozca LOCKALL
            </span>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-lockall-navy mb-5">
              Vea Nuestras Soluciones en Acción
            </h2>
          </div>
        </SectionReveal>

        <SectionReveal delay={200}>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] bg-lockall-navy">
            <video
              controls
              className="w-full aspect-video"
              poster={ASSETS.heroBg}
            >
              <source src={ASSETS.video} type="video/mp4" />
              Su navegador no soporta el elemento de video.
            </video>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTASection() {
  return (
    <section className="py-20 bg-lockall-cyan relative overflow-hidden">
      <div className="container relative z-10 text-center">
        <SectionReveal>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-tight text-white mb-5">
            Proteja su cartera de financiamiento de dispositivos
          </h2>
          <p className="text-[16px] text-white/80 max-w-[520px] mx-auto mb-8">
            Agende una demostración privada con nuestro equipo de especialistas
            y conozca cómo las soluciones de LOCKALL pueden integrarse con
            su operación.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 h-12 px-7 text-[14px] font-heading font-semibold text-lockall-cyan bg-white hover:bg-white/90 rounded transition-all duration-200"
            >
              Solicitar Demostración
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/recursos"
              className="inline-flex items-center gap-2 h-12 px-7 text-[14px] font-heading font-semibold text-white border border-white/30 hover:border-white/60 rounded transition-all duration-200"
            >
              Ver Recursos
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─── Home Page ─── */
export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <SecurityLayersSection />
      <WhoWeServeSection />
      <GlobalReachSection />
      <VideoCTASection />
      <FinalCTASection />
    </Layout>
  );
}

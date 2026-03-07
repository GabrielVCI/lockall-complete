/*
 * Design: Institutional Clarity — McKinsey meets Stripe Enterprise
 * About page: Institutional, realistic tone. Multinational established company.
 */
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { ASSETS } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { Target, Eye, Compass } from "lucide-react";

function StatBlock({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, isVisible } = useScrollAnimation();
  const count = useCountUp(value, 2000, isVisible);
  return (
    <div ref={ref} className="text-center">
      <div className="text-[40px] font-heading font-bold text-lockall-cyan leading-none">
        {count}{suffix}
      </div>
      <div className="text-[13px] font-heading text-lockall-graphite mt-2">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-lockall-pearl">
        <div className="container">
          <div className="max-w-[720px]">
            <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan mb-4 block">
              Nuestra Empresa
            </span>
            <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,3.25rem)] leading-[1.05] tracking-tight text-lockall-navy mb-6">
              Sobre LOCKALL
            </h1>
            <p className="text-[17px] leading-relaxed text-lockall-graphite max-w-[600px]">
              Una empresa multinacional dedicada a ofrecer soluciones de mitigación de riesgo para el sector financiero, respaldadas por tecnología especializada.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Image + Story */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div className="rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                <img
                  src={ASSETS.aboutCorporate}
                  alt="Sede corporativa LOCKALL"
                  className="w-full"
                />
              </div>
            </SectionReveal>

            <SectionReveal delay={200}>
              <div>
                <h2 className="font-display font-bold text-[clamp(2rem,4vw,2.5rem)] leading-[1.1] tracking-tight text-lockall-navy mb-6">
                  Infraestructura Global para la Protección de Activos Financiados
                </h2>
                <p className="text-[16px] leading-relaxed text-lockall-graphite mb-5">
                  LOCKALL nació de la identificación de una necesidad real en el mercado financiero: la falta de soluciones especializadas para mitigar el riesgo en el financiamiento de dispositivos tecnológicos. Lo que comenzó como una iniciativa enfocada se ha convertido en una operación con presencia en más de 45 países.
                </p>
                <p className="text-[16px] leading-relaxed text-lockall-graphite mb-5">
                  A través de las soluciones que ofrecemos, se procesan millones de transacciones diarias, proporcionando a bancos, instituciones financieras y retailers las herramientas necesarias para proteger sus carteras de financiamiento de dispositivos de manera eficiente y conforme a la regulación local.
                </p>
                <p className="text-[16px] leading-relaxed text-lockall-graphite">
                  Con equipos distribuidos en América Latina, Europa, Asia y África, mantenemos una operación continua que combina experiencia técnica con conocimiento regulatorio profundo en cada mercado donde operamos.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-lockall-pearl">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatBlock value={45} suffix="+" label="Países de operación" />
            <StatBlock value={12} suffix="M+" label="Dispositivos protegidos" />
            <StatBlock value={350} suffix="+" label="Instituciones clientes" />
            <StatBlock value={99} suffix=".9%" label="Disponibilidad" />
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding">
        <div className="container">
          <SectionReveal>
            <div className="text-center max-w-[680px] mx-auto mb-14">
              <h2 className="font-display font-bold text-[clamp(2rem,4vw,2.5rem)] leading-[1.1] tracking-tight text-lockall-navy mb-5">
                Nuestros Principios
              </h2>
              <p className="text-[16px] leading-relaxed text-lockall-graphite">
                Tres pilares que guían cada decisión operativa y estratégica de la organización.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Misión",
                text: "Proporcionar a las instituciones financieras las soluciones más avanzadas de mitigación de riesgo en el financiamiento de dispositivos, contribuyendo a la expansión responsable del crédito tecnológico.",
              },
              {
                icon: Eye,
                title: "Visión",
                text: "Ser el referente global en protección de activos tecnológicos financiados, reconocido por las principales instituciones financieras como un aliado estratégico esencial en su gestión de riesgo.",
              },
              {
                icon: Compass,
                title: "Valores",
                text: "Integridad en cada operación. Excelencia técnica sin compromisos. Cumplimiento regulatorio como requisito no negociable. Transparencia con nuestros clientes y las comunidades donde operamos.",
              },
            ].map((item, i) => (
              <SectionReveal key={i} delay={i * 150}>
                <div className="p-8 bg-lockall-pearl rounded-lg h-full">
                  <item.icon size={28} className="text-lockall-cyan mb-5" />
                  <h3 className="text-[20px] font-heading font-bold text-lockall-navy mb-4">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-lockall-graphite">
                    {item.text}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Global presence note */}
      <section className="py-20 bg-lockall-navy">
        <div className="container text-center">
          <SectionReveal>
            <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.25rem)] leading-[1.1] tracking-tight text-white mb-5">
              Presencia en 5 continentes
            </h2>
            <p className="text-[16px] text-white/60 max-w-[600px] mx-auto mb-8">
              Con oficinas regionales y equipos de cumplimiento dedicados en cada mercado, LOCKALL combina alcance global con conocimiento local para servir a instituciones financieras en todo el mundo.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-[14px] font-heading text-white/40">
              {["América Latina", "América del Norte", "Europa", "Asia-Pacífico", "África"].map((region) => (
                <span key={region} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-lockall-cyan" />
                  {region}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </Layout>
  );
}

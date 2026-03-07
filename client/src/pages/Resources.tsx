/*
 * Design: Institutional Clarity — McKinsey meets Stripe Enterprise
 * Resources page: Executive library with document cards.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { FileText, Download, BookOpen, BarChart3, Presentation, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const resources = [
  {
    icon: FileText,
    type: "Resumen Ejecutivo",
    title: "LOCKALL: Soluciones de Mitigación de Riesgo",
    description: "Documento de alto nivel que presenta la propuesta de valor de LOCKALL, casos de uso principales y métricas de impacto para comités ejecutivos.",
    format: "PDF",
    pages: "12 páginas",
  },
  {
    icon: BookOpen,
    type: "Documento Técnico",
    title: "Arquitectura de Seguridad de 6 Capas",
    description: "Descripción técnica detallada de la arquitectura de seguridad integrada en las soluciones de LOCKALL, incluyendo protocolos de cifrado, mecanismos de protección y estándares de cumplimiento.",
    format: "PDF",
    pages: "28 páginas",
  },
  {
    icon: BarChart3,
    type: "Análisis de Impacto",
    title: "Reducción de Riesgo en Carteras de Dispositivos",
    description: "Estudio cuantitativo del impacto de LOCKALL en la reducción de pérdidas por impago, basado en datos agregados de instituciones clientes en múltiples mercados.",
    format: "PDF",
    pages: "18 páginas",
  },
  {
    icon: Presentation,
    type: "Presentación Corporativa",
    title: "Solicitud de Presentación Privada",
    description: "Agende una presentación personalizada con nuestro equipo de especialistas, adaptada a las necesidades y contexto específico de su institución.",
    format: "Agenda",
    pages: "45 minutos",
  },
];

export default function Resources() {
  const handleDownload = (title: string) => {
    toast("Solicitud recibida", {
      description: `Para acceder a "${title}", por favor complete el formulario de contacto. Nuestro equipo le enviará el documento.`,
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-lockall-pearl">
        <div className="container">
          <div className="max-w-[720px]">
            <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan mb-4 block">
              Biblioteca
            </span>
            <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,3.25rem)] leading-[1.05] tracking-tight text-lockall-navy mb-6">
              Recursos
            </h1>
            <p className="text-[17px] leading-relaxed text-lockall-graphite max-w-[600px]">
              Documentación técnica y ejecutiva diseñada para facilitar la evaluación de LOCKALL por parte de equipos de riesgo, tecnología y dirección.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[960px] mx-auto">
            {resources.map((r, i) => (
              <SectionReveal key={i} delay={i * 150}>
                <div className="exec-card p-8 rounded h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded flex items-center justify-center bg-lockall-cyan/10">
                      <r.icon size={20} className="text-lockall-cyan" />
                    </div>
                    <span className="text-[11px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan">
                      {r.type}
                    </span>
                  </div>

                  <h3 className="text-[18px] font-heading font-bold text-lockall-navy mb-3">
                    {r.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-lockall-graphite mb-6 flex-1">
                    {r.description}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-border">
                    <div className="flex items-center gap-3 text-[12px] font-heading text-muted-foreground">
                      <span>{r.format}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{r.pages}</span>
                    </div>
                    <button
                      onClick={() => handleDownload(r.title)}
                      className="flex items-center gap-1.5 text-[13px] font-heading font-semibold text-lockall-cyan hover:text-lockall-cyan-dark transition-colors"
                    >
                      {r.format === "Agenda" ? "Solicitar" : "Descargar"}
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-lockall-pearl">
        <div className="container text-center">
          <SectionReveal>
            <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.25rem)] leading-[1.1] tracking-tight text-lockall-navy mb-5">
              ¿Necesita documentación adicional?
            </h2>
            <p className="text-[16px] text-lockall-graphite max-w-[520px] mx-auto mb-8">
              Podemos preparar documentación personalizada para su proceso de evaluación, incluyendo análisis de caso específico para su mercado.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 h-12 px-7 text-[14px] font-heading font-semibold text-white bg-lockall-cyan hover:bg-lockall-cyan-dark rounded transition-all duration-200"
            >
              Solicitar Documentación
              <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </Layout>
  );
}

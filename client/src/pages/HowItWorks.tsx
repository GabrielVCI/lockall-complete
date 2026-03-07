/*
 * Design: Institutional Clarity — McKinsey meets Stripe Enterprise
 * How It Works: 4-step minimalist corporate timeline.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Integración y Configuración",
    subtitle: "Despliegue adaptado a su infraestructura",
    description:
      "El proceso inicia con la integración de las soluciones de LOCKALL en su ecosistema tecnológico existente. Nuestro equipo de ingeniería trabaja directamente con su departamento de TI para configurar la conexión API, establecer las políticas de protección y definir los flujos de trabajo automatizados.",
    details: [
      "Integración API con su sistema de gestión de cartera",
      "Configuración de políticas de protección personalizadas",
      "Definición de reglas de automatización y escalamiento",
      "Pruebas de conectividad y validación de seguridad",
      "Capacitación del equipo operativo",
    ],
  },
  {
    number: "02",
    title: "Activación en Dispositivos",
    subtitle: "Protección desde el primer día de financiamiento",
    description:
      "Una vez integradas las soluciones, cada dispositivo financiado se registra automáticamente. El mecanismo de protección se activa de forma transparente durante el proceso de configuración inicial del dispositivo, sin afectar la experiencia del usuario final.",
    details: [
      "Registro automático al momento del financiamiento",
      "Activación transparente para el usuario final",
      "Vinculación criptográfica dispositivo-cuenta",
      "Verificación de integridad del sistema",
      "Confirmación de conectividad bidireccional",
    ],
  },
  {
    number: "03",
    title: "Monitoreo y Gestión Continua",
    subtitle: "Visibilidad total sobre su cartera protegida",
    description:
      "Con los dispositivos protegidos, su equipo accede al panel de control LOCKALL Control™ para monitorear el estado de toda la cartera en tiempo real. Las políticas automatizadas ejecutan acciones graduales basadas en el estado de cada cuenta, mientras el sistema de inteligencia identifica patrones de riesgo.",
    details: [
      "Dashboard en tiempo real con métricas de cartera",
      "Ejecución automática de políticas de protección",
      "Notificaciones inteligentes al usuario final",
      "Detección temprana de patrones de riesgo",
      "Reportes periódicos de rendimiento",
    ],
  },
  {
    number: "04",
    title: "Análisis y Optimización",
    subtitle: "Mejora continua basada en datos",
    description:
      "LOCKALL Insight™ proporciona análisis profundo del rendimiento de la cartera protegida. Los modelos predictivos identifican oportunidades de optimización, mientras los reportes de cumplimiento garantizan la adherencia a los marcos regulatorios aplicables en cada jurisdicción.",
    details: [
      "Análisis predictivo de riesgo de cartera",
      "Optimización de políticas basada en resultados",
      "Reportes de cumplimiento regulatorio automáticos",
      "Medición de ROI y reducción de pérdidas",
      "Recomendaciones estratégicas del equipo LOCKALL",
    ],
  },
];

export default function HowItWorks() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-lockall-pearl">
        <div className="container">
          <div className="max-w-[720px]">
            <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan mb-4 block">
              Proceso
            </span>
            <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,3.25rem)] leading-[1.05] tracking-tight text-lockall-navy mb-6">
              Cómo Funcionan Nuestras Soluciones
            </h1>
            <p className="text-[17px] leading-relaxed text-lockall-graphite max-w-[600px]">
              Un proceso estructurado en cuatro fases que garantiza una implementación eficiente y resultados medibles desde las primeras semanas de operación.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-[900px] mx-auto">
            {steps.map((step, i) => (
              <SectionReveal key={i} delay={i * 150}>
                <div className={`relative flex gap-8 lg:gap-12 ${i < steps.length - 1 ? "pb-16" : ""}`}>
                  {/* Timeline line */}
                  <div className="hidden md:flex flex-col items-center shrink-0">
                    <div className="w-14 h-14 rounded-full bg-lockall-cyan/10 border-2 border-lockall-cyan flex items-center justify-center">
                      <span className="text-[16px] font-heading font-bold text-lockall-cyan">
                        {step.number}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-lockall-cyan/30 to-border mt-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="md:hidden text-[13px] font-heading font-bold text-lockall-cyan mb-2">
                      Paso {step.number}
                    </div>
                    <h3 className="text-[22px] font-heading font-bold text-lockall-navy mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[15px] font-heading font-medium text-lockall-cyan mb-4">
                      {step.subtitle}
                    </p>
                    <p className="text-[15px] leading-relaxed text-lockall-graphite mb-6">
                      {step.description}
                    </p>
                    <div className="bg-lockall-pearl rounded-lg p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.details.map((detail, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <CheckCircle2 size={16} className="text-lockall-cyan shrink-0 mt-0.5" />
                            <span className="text-[13px] leading-snug text-lockall-graphite">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-lockall-cyan">
        <div className="container text-center">
          <SectionReveal>
            <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.25rem)] leading-[1.1] tracking-tight text-white mb-5">
              Inicie el proceso de evaluación
            </h2>
            <p className="text-[16px] text-white/80 max-w-[520px] mx-auto mb-8">
              Nuestro equipo le guiará a través de cada fase, adaptando la implementación a las necesidades específicas de su institución.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 h-12 px-7 text-[14px] font-heading font-semibold text-lockall-cyan bg-white hover:bg-white/90 rounded transition-all duration-200"
            >
              Hablar con un Especialista
              <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </Layout>
  );
}

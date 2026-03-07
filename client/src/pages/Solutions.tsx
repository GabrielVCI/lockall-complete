/*
 * Design: Institutional Clarity — McKinsey meets Stripe Enterprise
 * Solutions page: Three product lines with modular premium design.
 * LOCKALL Shield™, LOCKALL Control™, LOCKALL Insight™
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { ASSETS } from "@/lib/constants";
import {
  Shield,
  Fingerprint,
  Lock,
  ServerCrash,
  Smartphone,
  ArrowRight,
  BarChart3,
  TrendingUp,
  PieChart,
  AlertTriangle,
  Settings,
  Radio,
  Zap,
  Timer,
  ToggleRight,
  MessageSquare,
} from "lucide-react";

function PageHero() {
  return (
    <section className="pt-32 pb-20 bg-lockall-pearl relative overflow-hidden">
      <div className="container">
        <div className="max-w-[720px]">
          <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan mb-4 block">
            Nuestras Soluciones
          </span>
          <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,3.25rem)] leading-[1.05] tracking-tight text-lockall-navy mb-6">
            Soluciones de Protección Financiera de Nivel Empresarial
          </h1>
          <p className="text-[17px] leading-relaxed text-lockall-graphite max-w-[600px]">
            Tres soluciones integradas que cubren el ciclo completo de protección de activos financiados: desde la prevención hasta la inteligencia predictiva.
          </p>
        </div>
      </div>
    </section>
  );
}

interface ProductSectionProps {
  tag: string;
  tagColor: string;
  name: string;
  subtitle: string;
  description: string;
  capabilities: { icon: React.ElementType; title: string; desc: string }[];
  reversed?: boolean;
}

function ProductSection({ tag, tagColor, name, subtitle, description, capabilities, reversed }: ProductSectionProps) {
  return (
    <section className={`section-padding ${reversed ? "bg-lockall-pearl" : ""}`}>
      <div className="container">
        <SectionReveal>
          <div className="max-w-[680px] mb-12">
            <span className={`text-[12px] font-heading font-semibold tracking-widest uppercase mb-4 block ${tagColor}`}>
              {tag}
            </span>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-lockall-navy mb-3">
              {name}
            </h2>
            <p className="text-[18px] font-heading font-medium text-lockall-graphite mb-4">
              {subtitle}
            </p>
            <p className="text-[16px] leading-relaxed text-lockall-graphite">
              {description}
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <SectionReveal key={i} delay={i * 100}>
              <div className="exec-card p-7 rounded h-full">
                <cap.icon size={22} className="text-lockall-cyan mb-4" />
                <h3 className="text-[15px] font-heading font-semibold text-lockall-navy mb-2">
                  {cap.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-lockall-graphite">
                  {cap.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Solutions() {
  return (
    <Layout>
      <PageHero />

      <ProductSection
        tag="Protección de Activos"
        tagColor="text-lockall-cyan"
        name="LOCKALL Shield™"
        subtitle="Protección integral a nivel de dispositivo"
        description="LOCKALL Shield™ es nuestra solución de protección fundamental. Integra tecnología especializada directamente en el dispositivo financiado, operando de forma silenciosa y transparente para el usuario final, activándose únicamente cuando las condiciones de la cuenta lo requieren."
        capabilities={[
          { icon: Shield, title: "Protección persistente", desc: "Mecanismo de protección que permanece activo incluso después de un restablecimiento de fábrica o cambio de SIM." },
          { icon: Fingerprint, title: "Identificación única", desc: "Cada dispositivo recibe un identificador criptográfico único vinculado a la cuenta de financiamiento." },
          { icon: Lock, title: "Bloqueo gradual", desc: "Sistema de restricciones progresivas que permite acciones proporcionales al estado de la cuenta." },
          { icon: ServerCrash, title: "Resistencia a manipulación", desc: "Detección y respuesta ante intentos de evasión, incluyendo cambio de firmware y manipulación de software." },
          { icon: Smartphone, title: "Compatibilidad amplia", desc: "Soporte para los principales sistemas operativos y fabricantes de dispositivos del mercado." },
          { icon: Settings, title: "Configuración remota", desc: "Gestión centralizada de políticas de protección aplicables a toda la cartera de dispositivos." },
        ]}
      />

      <ProductSection
        tag="Gestión y Control"
        tagColor="text-lockall-orange"
        name="LOCKALL Control™"
        subtitle="Centro de operaciones para la gestión de cartera"
        description="LOCKALL Control™ pone a disposición de las instituciones financieras un panel de control centralizado para gestionar toda su cartera de dispositivos protegidos. Desde la activación inicial hasta la resolución de cuentas, cada acción queda registrada y auditable."
        capabilities={[
          { icon: Radio, title: "Comunicación en tiempo real", desc: "Canal cifrado de comunicación bidireccional con cada dispositivo de la cartera." },
          { icon: Zap, title: "Ejecución inmediata", desc: "Comandos de protección que se ejecutan en segundos, independientemente de la ubicación del dispositivo." },
          { icon: Timer, title: "Automatización de políticas", desc: "Reglas configurables que ejecutan acciones automáticas basadas en el estado de la cuenta." },
          { icon: ToggleRight, title: "Control granular", desc: "Capacidad de aplicar restricciones específicas por dispositivo, grupo o segmento de cartera." },
          { icon: MessageSquare, title: "Notificaciones inteligentes", desc: "Sistema de alertas al usuario final con mensajes personalizables según la etapa de gestión." },
          { icon: Settings, title: "Integración API", desc: "API RESTful documentada para integración directa con sistemas de gestión de cartera existentes." },
        ]}
        reversed
      />

      <ProductSection
        tag="Inteligencia y Analítica"
        tagColor="text-lockall-cyan"
        name="LOCKALL Insight™"
        subtitle="Inteligencia predictiva para la toma de decisiones"
        description="LOCKALL Insight™ convierte los datos operativos en inteligencia accionable. Mediante modelos de machine learning y análisis de patrones de comportamiento, brinda a los equipos de riesgo las herramientas necesarias para anticipar y prevenir pérdidas."
        capabilities={[
          { icon: BarChart3, title: "Dashboard ejecutivo", desc: "Visualización en tiempo real del estado de la cartera con métricas clave de rendimiento y riesgo." },
          { icon: TrendingUp, title: "Predicción de riesgo", desc: "Modelos predictivos que identifican cuentas con alta probabilidad de incumplimiento antes de que ocurra." },
          { icon: PieChart, title: "Segmentación avanzada", desc: "Análisis de cartera por múltiples dimensiones: geografía, tipo de dispositivo, perfil de riesgo." },
          { icon: AlertTriangle, title: "Alertas tempranas", desc: "Sistema de detección temprana de patrones anómalos que pueden indicar fraude o evasión." },
          { icon: TrendingUp, title: "Reportes regulatorios", desc: "Generación automática de reportes de cumplimiento adaptados a los requisitos de cada jurisdicción." },
          { icon: BarChart3, title: "ROI medible", desc: "Métricas claras de retorno sobre inversión que demuestran el impacto en la reducción de pérdidas." },
        ]}
      />

      {/* CTA */}
      <section className="py-20 bg-lockall-navy">
        <div className="container text-center">
          <SectionReveal>
            <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.25rem)] leading-[1.1] tracking-tight text-white mb-5">
              Descubra qué solución se adapta a su operación
            </h2>
            <p className="text-[16px] text-white/60 max-w-[520px] mx-auto mb-8">
              Nuestro equipo de especialistas evaluará su caso particular y le presentará una propuesta personalizada.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 h-12 px-7 text-[14px] font-heading font-semibold text-lockall-navy bg-white hover:bg-white/90 rounded transition-all duration-200"
            >
              Solicitar Evaluación
              <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </Layout>
  );
}

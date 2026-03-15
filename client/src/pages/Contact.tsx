// /*
//  * Design: Institutional Clarity — McKinsey meets Stripe Enterprise
//  * Contact page: Corporate form with all required fields. Serious and elegant.
//  * Enhanced with reCAPTCHA v3 and backend email integration.
//  */
// import { useState } from "react";
// import Layout from "@/components/Layout";
// import SectionReveal from "@/components/SectionReveal";
// import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
// import { toast } from "sonner";
// import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

// const institutionTypes = [
//   "Banco Comercial",
//   "Institución Financiera",
//   "Financiera de Consumo",
//   "Retailer con Crédito Propio",
//   "Programa BNPL",
//   "Otro",
// ];

// const deviceTypes = [
//   "Teléfonos Móviles",
//   "Electrodomésticos",
//   "Ambos",
//   "Otro",
// ];

// const volumeRanges = [
//   "Menos de 10,000",
//   "10,000 - 50,000",
//   "50,000 - 200,000",
//   "200,000 - 1,000,000",
//   "Más de 1,000,000",
// ];

// export default function Contact() {
//   const { executeRecaptcha } = useGoogleReCaptcha();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     institution: "",
//     country: "",
//     institutionType: "",
//     volume: "",
//     deviceType: "",
//     role: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!executeRecaptcha) {
//       toast.error("reCAPTCHA not initialized", {
//         description: "Please refresh the page and try again.",
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Execute reCAPTCHA
//       const token = await executeRecaptcha("contact_form_submit");

//       // Send to backend
//       const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
//       const response = await fetch(`${apiUrl}/api/contact`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           recaptchaToken: token,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         toast.error("Error al enviar", {
//           description: data.message || "Ocurrió un error al procesar tu solicitud.",
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       // Success
//       toast.success("Solicitud enviada", {
//         description: "Nuestro equipo se pondrá en contacto con usted dentro de las próximas 24 horas hábiles.",
//       });

//       // Reset form
//       setFormData({
//         institution: "",
//         country: "",
//         institutionType: "",
//         volume: "",
//         deviceType: "",
//         role: "",
//         email: "",
//         phone: "",
//         message: "",
//       });
//     } catch (error) {
//       console.error("Form submission error:", error);
//       toast.error("Error de conexión", {
//         description: "No se pudo conectar con el servidor. Intenta de nuevo.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const inputClass =
//     "w-full h-11 px-4 text-[14px] font-body bg-white border border-border rounded focus:outline-none focus:ring-2 focus:ring-lockall-cyan/30 focus:border-lockall-cyan transition-all placeholder:text-muted-foreground/50";
//   const selectClass =
//     "w-full h-11 px-4 text-[14px] font-body bg-white border border-border rounded focus:outline-none focus:ring-2 focus:ring-lockall-cyan/30 focus:border-lockall-cyan transition-all text-foreground appearance-none";
//   const labelClass = "block text-[13px] font-heading font-medium text-lockall-navy mb-1.5";

//   return (
//     <Layout>
//       {/* Hero */}
//       <section className="pt-32 pb-20 bg-lockall-pearl">
//         <div className="container">
//           <div className="max-w-[720px]">
//             <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan mb-4 block">
//               Contacto
//             </span>
//             <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,3.25rem)] leading-[1.05] tracking-tight text-lockall-navy mb-6">
//               Contacto Corporativo
//             </h1>
//             <p className="text-[17px] leading-relaxed text-lockall-graphite max-w-[600px]">
//               Complete el formulario a continuación y un especialista de nuestro equipo se pondrá en contacto para evaluar cómo las soluciones de LOCKALL pueden integrarse con su operación.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Form Section */}
//       <section className="section-padding">
//         <div className="container">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
//             {/* Form */}
//             <div className="lg:col-span-2">
//               <SectionReveal>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div>
//                       <label className={labelClass}>Nombre de la Institución *</label>
//                       <input
//                         type="text"
//                         name="institution"
//                         value={formData.institution}
//                         onChange={handleChange}
//                         required
//                         disabled={isSubmitting}
//                         placeholder="Nombre de su institución"
//                         className={inputClass}
//                       />
//                     </div>
//                     <div>
//                       <label className={labelClass}>País *</label>
//                       <input
//                         type="text"
//                         name="country"
//                         value={formData.country}
//                         onChange={handleChange}
//                         required
//                         disabled={isSubmitting}
//                         placeholder="País de operación"
//                         className={inputClass}
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div>
//                       <label className={labelClass}>Tipo de Institución *</label>
//                       <select
//                         name="institutionType"
//                         value={formData.institutionType}
//                         onChange={handleChange}
//                         required
//                         disabled={isSubmitting}
//                         className={selectClass}
//                       >
//                         <option value="">Seleccione</option>
//                         {institutionTypes.map((t) => (
//                           <option key={t} value={t}>{t}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className={labelClass}>Volumen Mensual Estimado *</label>
//                       <select
//                         name="volume"
//                         value={formData.volume}
//                         onChange={handleChange}
//                         required
//                         disabled={isSubmitting}
//                         className={selectClass}
//                       >
//                         <option value="">Seleccione</option>
//                         {volumeRanges.map((v) => (
//                           <option key={v} value={v}>{v}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div>
//                       <label className={labelClass}>Tipo de Dispositivos *</label>
//                       <select
//                         name="deviceType"
//                         value={formData.deviceType}
//                         onChange={handleChange}
//                         required
//                         disabled={isSubmitting}
//                         className={selectClass}
//                       >
//                         <option value="">Seleccione</option>
//                         {deviceTypes.map((d) => (
//                           <option key={d} value={d}>{d}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className={labelClass}>Rol *</label>
//                       <input
//                         type="text"
//                         name="role"
//                         value={formData.role}
//                         onChange={handleChange}
//                         required
//                         disabled={isSubmitting}
//                         placeholder="Ej: Director de Riesgo"
//                         className={inputClass}
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div>
//                       <label className={labelClass}>Email Corporativo *</label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         disabled={isSubmitting}
//                         placeholder="nombre@institucion.com"
//                         className={inputClass}
//                       />
//                     </div>
//                     <div>
//                       <label className={labelClass}>Teléfono</label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         disabled={isSubmitting}
//                         placeholder="+1 (555) 000-0000"
//                         className={inputClass}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className={labelClass}>Mensaje</label>
//                     <textarea
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                       disabled={isSubmitting}
//                       rows={4}
//                       placeholder="Describa brevemente sus necesidades o preguntas..."
//                       className="w-full px-4 py-3 text-[14px] font-body bg-white border border-border rounded focus:outline-none focus:ring-2 focus:ring-lockall-cyan/30 focus:border-lockall-cyan transition-all placeholder:text-muted-foreground/50 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="inline-flex items-center gap-2 h-12 px-8 text-[14px] font-heading font-semibold text-white bg-lockall-cyan hover:bg-lockall-cyan-dark rounded transition-all duration-200 shadow-[0_2px_12px_rgba(14,165,233,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <Loader2 size={16} className="animate-spin" />
//                         Enviando...
//                       </>
//                     ) : (
//                       <>
//                         Enviar Solicitud
//                         <Send size={16} />
//                       </>
//                     )}
//                   </button>

//                   <p className="text-[12px] text-muted-foreground mt-2">
//                     Al enviar este formulario, acepta nuestra política de privacidad y el tratamiento de sus datos con fines comerciales.
//                   </p>
//                 </form>
//               </SectionReveal>
//             </div>

//             {/* Sidebar Info */}
//             <div className="lg:col-span-1">
//               <SectionReveal delay={200}>
//                 <div className="sticky top-28 space-y-8">
//                   <div>
//                     <h3 className="text-[18px] font-heading font-bold text-lockall-navy mb-4">
//                       Información de Contacto
//                     </h3>
//                     <div className="space-y-4">
//                       <div className="flex items-start gap-3">
//                         <Mail size={18} className="text-lockall-cyan shrink-0 mt-0.5" />
//                         <div>
//                           <div className="text-[13px] font-heading font-medium text-lockall-navy">Email Corporativo</div>
//                           <div className="text-[14px] text-lockall-graphite">info@lockall.co</div>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <Phone size={18} className="text-lockall-cyan shrink-0 mt-0.5" />
//                         <div>
//                           <div className="text-[13px] font-heading font-medium text-lockall-navy">Teléfono</div>
//                           <div className="text-[14px] text-lockall-graphite">+1 (829) 709-0285</div>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <MapPin size={18} className="text-lockall-cyan shrink-0 mt-0.5" />
//                         <div>
//                           <div className="text-[13px] font-heading font-medium text-lockall-navy">Oficina Principal</div>
//                           <div className="text-[14px] text-lockall-graphite">Santo Domingo, Rep. Dom.</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-6 bg-lockall-pearl rounded-lg">
//                     <h4 className="text-[15px] font-heading font-semibold text-lockall-navy mb-3">
//                       Tiempo de Respuesta
//                     </h4>
//                     <p className="text-[14px] leading-relaxed text-lockall-graphite">
//                       Nuestro equipo responde dentro de las 24 horas hábiles. Para solicitudes urgentes, indíquelo en el campo de mensaje.
//                     </p>
//                   </div>

//                   <div className="p-6 bg-lockall-pearl rounded-lg">
//                     <h4 className="text-[15px] font-heading font-semibold text-lockall-navy mb-3">
//                       Demostración Privada
//                     </h4>
//                     <p className="text-[14px] leading-relaxed text-lockall-graphite">
//                       Las demostraciones se realizan de forma privada y personalizada, adaptadas al contexto operativo de cada institución.
//                     </p>
//                   </div>
//                 </div>
//               </SectionReveal>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }

/*
 * Design: Institutional Clarity — McKinsey meets Stripe Enterprise
 * Contact page: Corporate form with all required fields. Serious and elegant.
 */
import { useState } from "react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

const institutionTypes = [
  "Banco Comercial",
  "Institución Financiera",
  "Financiera de Consumo",
  "Retailer con Crédito Propio",
  "Programa BNPL",
  "Otro",
];

const deviceTypes = [
  "Teléfonos Móviles",
  "Electrodomésticos",
  "Ambos",
  "Otro",
];

const volumeRanges = [
  "Menos de 10,000",
  "10,000 - 50,000",
  "50,000 - 200,000",
  "200,000 - 1,000,000",
  "Más de 1,000,000",
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    institution: "",
    country: "",
    institutionType: "",
    volume: "",
    deviceType: "",
    role: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "No se pudo enviar la solicitud.");
      }

      toast.success("Solicitud enviada", {
        description:
          "Nuestro equipo se pondrá en contacto con usted dentro de las próximas 24 horas hábiles.",
      });

      setFormData({
        institution: "",
        country: "",
        institutionType: "",
        volume: "",
        deviceType: "",
        role: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error("No se pudo enviar la solicitud", {
        description: error?.message || "Intente nuevamente en unos minutos.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-11 px-4 text-[14px] font-body bg-white border border-border rounded focus:outline-none focus:ring-2 focus:ring-lockall-cyan/30 focus:border-lockall-cyan transition-all placeholder:text-muted-foreground/50";

  const selectClass =
    "w-full h-11 px-4 text-[14px] font-body bg-white border border-border rounded focus:outline-none focus:ring-2 focus:ring-lockall-cyan/30 focus:border-lockall-cyan transition-all text-foreground appearance-none";

  const labelClass =
    "block text-[13px] font-heading font-medium text-lockall-navy mb-1.5";

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-lockall-pearl">
        <div className="container">
          <div className="max-w-[720px]">
            <span className="text-[12px] font-heading font-semibold tracking-widest uppercase text-lockall-cyan mb-4 block">
              Contacto
            </span>
            <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,3.25rem)] leading-[1.05] tracking-tight text-lockall-navy mb-6">
              Contacto Corporativo
            </h1>
            <p className="text-[17px] leading-relaxed text-lockall-graphite max-w-[600px]">
              Complete el formulario a continuación y un especialista de nuestro
              equipo se pondrá en contacto para evaluar cómo las soluciones de
              LOCKALL pueden integrarse con su operación.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <SectionReveal>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Nombre de la Institución *</label>
                      <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        required
                        placeholder="Nombre de su institución"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>País *</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        placeholder="País de operación"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Tipo de Institución *</label>
                      <select
                        name="institutionType"
                        value={formData.institutionType}
                        onChange={handleChange}
                        required
                        className={selectClass}
                      >
                        <option value="">Seleccione</option>
                        {institutionTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Volumen Mensual Estimado *</label>
                      <select
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        required
                        className={selectClass}
                      >
                        <option value="">Seleccione</option>
                        {volumeRanges.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Tipo de Dispositivos *</label>
                      <select
                        name="deviceType"
                        value={formData.deviceType}
                        onChange={handleChange}
                        required
                        className={selectClass}
                      >
                        <option value="">Seleccione</option>
                        {deviceTypes.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Rol *</label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Director de Riesgo"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Email Corporativo *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="nombre@institucion.com"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Teléfono</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Mensaje</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describa brevemente sus necesidades o preguntas..."
                      className="w-full px-4 py-3 text-[14px] font-body bg-white border border-border rounded focus:outline-none focus:ring-2 focus:ring-lockall-cyan/30 focus:border-lockall-cyan transition-all placeholder:text-muted-foreground/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 h-12 px-8 text-[14px] font-heading font-semibold text-white bg-lockall-cyan hover:bg-lockall-cyan-dark rounded transition-all duration-200 shadow-[0_2px_12px_rgba(14,165,233,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Solicitud
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-[12px] text-muted-foreground mt-2">
                    Al enviar este formulario, acepta nuestra política de
                    privacidad y el tratamiento de sus datos con fines
                    comerciales.
                  </p>
                </form>
              </SectionReveal>
            </div>

            <div className="lg:col-span-1">
              <SectionReveal delay={200}>
                <div className="sticky top-28 space-y-8">
                  <div>
                    <h3 className="text-[18px] font-heading font-bold text-lockall-navy mb-4">
                      Información de Contacto
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail
                          size={18}
                          className="text-lockall-cyan shrink-0 mt-0.5"
                        />
                        <div>
                          <div className="text-[13px] font-heading font-medium text-lockall-navy">
                            Email Corporativo
                          </div>
                          <div className="text-[14px] text-lockall-graphite">
                            info@lockall.co
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone
                          size={18}
                          className="text-lockall-cyan shrink-0 mt-0.5"
                        />
                        <div>
                          <div className="text-[13px] font-heading font-medium text-lockall-navy">
                            Teléfono
                          </div>
                          <div className="text-[14px] text-lockall-graphite">
                            +1 809-895-0273
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin
                          size={18}
                          className="text-lockall-cyan shrink-0 mt-0.5"
                        />
                        <div>
                          <div className="text-[13px] font-heading font-medium text-lockall-navy">
                            Oficina Principal
                          </div>
                          <div className="text-[14px] text-lockall-graphite">
                            Santo Domingo, Rep. Dom.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-lockall-pearl rounded-lg">
                    <h4 className="text-[15px] font-heading font-semibold text-lockall-navy mb-3">
                      Tiempo de Respuesta
                    </h4>
                    <p className="text-[14px] leading-relaxed text-lockall-graphite">
                      Nuestro equipo responde dentro de las 24 horas hábiles.
                      Para solicitudes urgentes, indíquelo en el campo de
                      mensaje.
                    </p>
                  </div>

                  <div className="p-6 bg-lockall-pearl rounded-lg">
                    <h4 className="text-[15px] font-heading font-semibold text-lockall-navy mb-3">
                      Demostración Privada
                    </h4>
                    <p className="text-[14px] leading-relaxed text-lockall-graphite">
                      Las demostraciones se realizan de forma privada y
                      personalizada, adaptadas al contexto operativo de cada
                      institución.
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
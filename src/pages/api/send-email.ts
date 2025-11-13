import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Pequeño sistema de control de frecuencia (in-memory)
const lastSent: Record<string, number> = {};
const MIN_INTERVAL = 60 * 1000; // 1 minuto entre envíos por email

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const nombre = String(formData.get("nombre") || "");
    const email = String(formData.get("email") || "");
      const mensaje = String(formData.get("observaciones") || "");
      const telefono = String(formData.get("telefono") || "")
      const fecha_hasta = String(formData.get("fecha_hasta") || "")
      const fecha_desde = String(formData.get("fecha_desde") || "")
      const cantidad_adultos = String(formData.get("adultos") || "")
      const cantidad_menores = String(formData.get("menores") || "")
      

    // Validación básica
    if (!nombre || !email || !mensaje || !telefono || !fecha_desde || !fecha_hasta || !cantidad_adultos)
      return new Response(JSON.stringify({ success: false, message: "Faltan campos" }), { status: 400 });

    // Anti-spam: verificar frecuencia
    const now = Date.now();
    if (lastSent[email] && now - lastSent[email] < MIN_INTERVAL) {
      return new Response(
        JSON.stringify({ success: false, message: "Por favor esperá un minuto antes de enviar otro mensaje" }),
        { status: 429 }
      );
    }

    lastSent[email] = now;

    // Enviar el correo con Resend
    await resend.emails.send({
      from: "Contacto <info@costadelfaro.com.ar>", // Podés cambiar por tu dominio verificado
      to: "eduardoguerradg@gmail.com",
      subject: `Reserva desde Costa del Faro // ${nombre}`,
      text: `
        Nombre: ${nombre}
        Email: ${email}
        Mensaje:
        ${mensaje}
        Fecha desde: ${fecha_desde} Fecha Hasta: ${fecha_hasta}
        cantidad de adultos : ${cantidad_adultos} cantidad de menores: ${cantidad_menores}
      `,
    });

    return new Response(JSON.stringify({ success: true, message: "Correo enviado correctamente" }), { status: 200 });
  } catch (error) {
    console.error("Error al enviar:", error);
    return new Response(JSON.stringify({ success: false, message: "Error al enviar el correo" }), { status: 500 });
  }
};

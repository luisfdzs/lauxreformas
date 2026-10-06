"use server";

import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/config/site";

const schema = z.object({
  name: z.string().trim().min(2, "required").max(100),
  phone: z
    .string()
    .trim()
    .min(1, "required")
    .regex(/^[+\d][\d\s().-]{6,19}$/, "invalidPhone"),
  email: z.union([z.literal(""), z.string().trim().email("invalidEmail").max(150)]),
  service: z.string().max(50).optional().default(""),
  town: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(1, "required").max(3000),
  privacy: z.literal("on", { message: "privacyRequired" }),
});

export type ContactField = keyof z.infer<typeof schema>;
export type ContactState = {
  status: "idle" | "success" | "error" | "invalid";
  /** Códigos de error por campo; se traducen en el cliente. */
  errors?: Partial<Record<ContactField, string>>;
  /** Valores enviados, para no vaciar el formulario si hay errores. */
  values?: Partial<Record<ContactField, string>>;
};

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: los humanos no ven este campo. Si viene relleno, fingimos éxito.
  if (formData.get("website")) return { status: "success" };

  const fields: ContactField[] = ["name", "phone", "email", "service", "town", "message", "privacy"];
  const values = Object.fromEntries(
    fields.map((f) => [f, String(formData.get(f) ?? "")]),
  ) as Record<ContactField, string>;
  const parsed = schema.safeParse(values);

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      errors[field] ??= issue.message === "privacyRequired" || issue.message.startsWith("invalid")
        ? issue.message
        : "required";
    }
    return { status: "invalid", errors, values };
  }

  const data = parsed.data;
  const text = [
    `Nombre: ${data.name}`,
    `Teléfono: ${data.phone}`,
    `Email: ${data.email || "-"}`,
    `Tipo de reforma: ${data.service || "-"}`,
    `Municipio: ${data.town || "-"}`,
    "",
    data.message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Envío aún no configurado: dejamos constancia en los logs y respondemos OK.
    console.info("[contacto] RESEND_API_KEY no configurada. Solicitud recibida:\n" + text);
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || `${site.name} <onboarding@resend.dev>`,
      to: (process.env.CONTACT_TO_EMAIL || site.email).split(",").map((s) => s.trim()),
      replyTo: data.email || undefined,
      subject: `Nueva solicitud de presupuesto: ${data.name}`,
      text,
    });
    if (error) throw new Error(error.message);
    return { status: "success" };
  } catch (err) {
    console.error("[contacto] Error enviando email", err);
    return { status: "error", values };
  }
}

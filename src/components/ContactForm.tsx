"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { CircleCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { sendContact, type ContactField, type ContactState } from "@/app/[locale]/contacto/actions";
import { buttonClass } from "./ui/Button";

const inputClass =
  "mt-1.5 w-full border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition-colors focus:border-gold aria-[invalid=true]:border-red-600";

export default function ContactForm({ services }: { services: { value: string; label: string }[] }) {
  const t = useTranslations("contact.form");
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center border border-line bg-white p-10 text-center" role="status">
        <CircleCheck className="size-12 text-gold" strokeWidth={1.25} aria-hidden="true" />
        <p className="mt-4 text-base font-medium">{t("success")}</p>
      </div>
    );
  }

  const err = (f: ContactField) => state.errors?.[f];
  const errorText = (f: ContactField) => {
    const code = err(f);
    return code ? t(code as "required" | "invalidEmail" | "invalidPhone" | "privacyRequired") : null;
  };
  const fieldProps = (f: ContactField) => ({
    id: f,
    name: f,
    defaultValue: f === "privacy" ? undefined : (state.values?.[f] ?? ""),
    "aria-invalid": err(f) ? true : undefined,
    "aria-describedby": err(f) ? `${f}-error` : undefined,
  });
  const errorMsg = (f: ContactField) =>
    err(f) ? (
      <p id={`${f}-error`} className="mt-1 text-xs text-red-700">
        {errorText(f)}
      </p>
    ) : null;

  return (
    <form key={JSON.stringify(state.values ?? {})} action={action} noValidate className="grid gap-5 border border-line bg-white p-6 sm:grid-cols-2 sm:p-8">
      {/* Honeypot antispam */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="text-sm font-medium">
          {t("name")} *
        </label>
        <input {...fieldProps("name")} type="text" autoComplete="name" required className={inputClass} />
        {errorMsg("name")}
      </div>
      <div>
        <label htmlFor="phone" className="text-sm font-medium">
          {t("phone")} *
        </label>
        <input {...fieldProps("phone")} type="tel" autoComplete="tel" required className={inputClass} />
        {errorMsg("phone")}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          {t("email")}
        </label>
        <input {...fieldProps("email")} type="email" autoComplete="email" className={inputClass} />
        {errorMsg("email")}
      </div>
      <div>
        <label htmlFor="town" className="text-sm font-medium">
          {t("town")}
        </label>
        <input {...fieldProps("town")} type="text" autoComplete="address-level2" className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="service" className="text-sm font-medium">
          {t("service")}
        </label>
        <select {...fieldProps("service")} className={inputClass}>
          <option value="">{t("servicePlaceholder")}</option>
          {services.map((s) => (
            <option key={s.value} value={s.label}>
              {s.label}
            </option>
          ))}
          <option value={t("serviceOther")}>{t("serviceOther")}</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="text-sm font-medium">
          {t("message")} *
        </label>
        <textarea {...fieldProps("message")} rows={5} required className={inputClass} />
        {errorMsg("message")}
      </div>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm">
          <input
            {...fieldProps("privacy")}
            type="checkbox"
            defaultChecked={state.values?.privacy === "on"}
            required
            className="mt-0.5 size-4 shrink-0 accent-[var(--color-gold)]"
          />
          <span>
            {t.rich("privacy", {
              link: (chunks) => (
                <Link href="/privacidad" target="_blank" className="text-gold-600 underline">
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {errorMsg("privacy")}
      </div>

      {state.status === "error" ? (
        <p className="text-sm text-red-700 sm:col-span-2" role="alert">
          {t("error")}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className={buttonClass("gold", "w-full disabled:opacity-60 sm:w-auto")}>
          {pending ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}

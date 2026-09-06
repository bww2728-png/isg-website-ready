"use client";

import Link from "next/link";
import { useState } from "react";
import { audienceStages } from "@/lib/content";
import { validateLead, type LeadErrors } from "@/lib/form";
import { Icon } from "@/components/Icon";

type FormFields = {
  name: string;
  email: string;
  stage: string;
  challenge: string;
  consent: boolean;
  company: string;
};

const emptyFields: FormFields = {
  name: "",
  email: "",
  stage: "",
  challenge: "",
  consent: false,
  company: "",
};

type Status = "idle" | "loading" | "success";

export default function ContactForm() {
  const [fields, setFields] = useState<FormFields>(emptyFields);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function setField<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = validateLead(fields);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setStatus("loading");
    setErrors({});

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });

    if (response.ok) {
      setStatus("success");
      return;
    }

    try {
      const payload = (await response.json()) as { errors?: LeadErrors };
      setErrors(payload.errors ?? {});
    } catch {
      setErrors({});
    }
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="success-panel">
        <div className="flex gap-sm" style={{ alignItems: "center", marginBottom: "0.5rem" }}>
          <Icon name="check" size={22} />
          <h3 style={{ margin: 0 }}>تم استلام طلبك</h3>
        </div>
        <p>
          شاركنا المرحلة التي تمر بها الشركة، وسيتحوّل الحوار الأول إلى نقطة بداية عملية: قرار أو
          أولوية أو مسار جاهزية واضح.
        </p>
        <p className="note">سيتواصل معك الفريق عبر البريد الذي أدخلته.</p>
      </div>
    );
  }

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      <div className={`field${errors.name ? " invalid" : ""}`}>
        <label htmlFor="contact-name">الاسم الكامل</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={fields.name}
          required
          minLength={3}
          onChange={(event) => setField("name", event.target.value)}
        />
        {errors.name ? <p className="form-error">{errors.name}</p> : null}
      </div>

      <div className={`field${errors.email ? " invalid" : ""}`}>
        <label htmlFor="contact-email">البريد الإلكتروني</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={fields.email}
          onChange={(event) => setField("email", event.target.value)}
        />
        {errors.email ? <p className="form-error">{errors.email}</p> : null}
      </div>

      <div className={`field${errors.stage ? " invalid" : ""}`}>
        <label htmlFor="contact-stage">مرحلة الشركة</label>
        <select
          id="contact-stage"
          name="stage"
          value={fields.stage}
          onChange={(event) => setField("stage", event.target.value)}
        >
          <option value="">اختر المرحلة الأنسب</option>
          {audienceStages.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
        {errors.stage ? <p className="form-error">{errors.stage}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="contact-challenge">ما القرار أو التحدي الأكثر إلحاحاً؟ (اختياري)</label>
        <textarea
          id="contact-challenge"
          name="challenge"
          value={fields.challenge}
          maxLength={500}
          onChange={(event) => setField("challenge", event.target.value)}
        />
      </div>

      <div
        className="field"
        style={{ display: "none" }}
        aria-hidden
      >
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          value={fields.company}
          onChange={(event) => setField("company", event.target.value)}
        />
      </div>

      <label className={`check${errors.consent ? " invalid" : ""}`}>
        <input
          type="checkbox"
          name="consent"
          checked={fields.consent}
          onChange={(event) => setField("consent", event.target.checked)}
        />
        <span>
          أوافق على معالجة بياناتي وفق <Link href="/privacy-policy">سياسة الخصوصية</Link>.
        </span>
      </label>
      {errors.consent ? <p className="form-error">{errors.consent}</p> : null}

      <button type="submit" className="button button-primary" disabled={status === "loading"}>
        {status === "loading" ? "جارٍ الإرسال..." : "اطلب جلسة تشخيصية"}
      </button>
    </form>
  );
}
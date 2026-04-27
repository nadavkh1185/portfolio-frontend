"use client";

import { FormEvent, useState } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import type { Contact } from "@/types/contact";
import Reveal from "./Reveal";
import emailjs from "@emailjs/browser";

type Props = {
  data: Contact;
};

type FormState = {
  email: string;
  subject: string;
  message: string;
};

function normalizeExternalUrl(url?: string) {
  if (!url || url.trim() === "") return null;
  const clean = url.trim();
  if (/^https?:\/\//i.test(clean)) return clean;
  return `https://${clean}`;
}

export default function ContactSection({ data }: Props) {
  const [form, setForm] = useState<FormState>({
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!data) return null;

  const socialLinks = [
    {
      id: "linkedin",
      href: normalizeExternalUrl(data?.linkedin_link),
      label: "LinkedIn",
      icon: FaLinkedin,
    },
    {
      id: "instagram",
      href: normalizeExternalUrl(data?.instagram_link),
      label: "Instagram",
      icon: FaInstagram,
    },
  ];

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = {
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (!trimmed.email || !trimmed.subject || !trimmed.message) {
      setFeedback("Lengkapi semua field");
      return;
    }

    setSending(true);
    setFeedback(null);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          email: trimmed.email,
          subject: trimmed.subject,
          message: trimmed.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );

      setForm({
        email: "",
        subject: "",
        message: "",
      });

      setFeedback("Pesan berhasil dikirim");
    } catch (err) {
      console.error(err);
      setFeedback("Gagal kirim email");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="public-section px-4 pb-20 pt-20 md:px-10 md:pb-24">
      <div className="mx-auto max-w-6xl pt-20 pb-20">
        <Reveal className="text-center">
          <h2 className="public-title text-white">Contact Section</h2>
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-xl px-4 md:mt-10" delayMs={120}>
          <form className="space-y-4 text-center" onSubmit={handleSubmit}>
            <input
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="Email"
              className="w-full rounded-full border border-[#14384c] bg-[linear-gradient(180deg,#c7d8e4_0%,#aec4d4_100%)] px-4 py-3 text-base font-semibold text-[#123245] outline-none transition placeholder:text-white/85 focus:border-cyan-100 focus:shadow-[0_0_0_3px_rgba(174,229,255,0.24)]"
            />

            <input
              value={form.subject}
              onChange={(event) => updateField("subject", event.target.value)}
              placeholder="Subject"
              className="w-full rounded-full border border-[#14384c] bg-[linear-gradient(180deg,#c7d8e4_0%,#aec4d4_100%)] px-4 py-3 text-base font-semibold text-[#123245] outline-none transition placeholder:text-white/85 focus:border-cyan-100 focus:shadow-[0_0_0_3px_rgba(174,229,255,0.24)]"
            />

            <p className="pt-1 text-xl font-bold text-white">Email Message:</p>

            <textarea
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Write your message here..."
              className="h-44 w-full resize-none rounded-[1.2rem] border border-[#14384c] bg-[linear-gradient(180deg,#c7d8e4_0%,#aec4d4_100%)] px-4 py-4 text-base font-medium text-[#123245] outline-none transition placeholder:text-white/70 focus:border-cyan-100 focus:shadow-[0_0_0_3px_rgba(174,229,255,0.24)] md:h-52"
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full border border-[#14384c] bg-[linear-gradient(180deg,#a7e1ff_0%,#85cdea_100%)] px-4 py-3 text-xl font-bold text-[#0c2a3c] transition hover:shadow-[0_0_18px_rgba(133,205,234,0.75)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? "Sending..." : "Send"}
            </button>

            {feedback ? (
              <p className="px-2 text-sm font-medium leading-relaxed text-white/88">
                {feedback}
              </p>
            ) : null}
          </form>
        </Reveal>

        <Reveal
          className="mt-6 flex items-center justify-center gap-5 md:mt-8"
          delayMs={220}
        >
          {socialLinks.map((item) => {
            const Icon = item.icon;

            if (!item.href) return null;

            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="text-[2.15rem] text-[#2a82b7] transition hover:-translate-y-1 hover:text-[#8fddff] hover:drop-shadow-[0_0_12px_rgba(143,221,255,0.85)]"
              >
                <Icon />
              </a>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

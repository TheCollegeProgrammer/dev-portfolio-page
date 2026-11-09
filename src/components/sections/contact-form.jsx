"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
export function ContactForm() {
    const [status, setStatus] = useState("idle");
    const [feedback, setFeedback] = useState(null);
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
            company: "",
        },
    });
    const onSubmit = async (values) => {
        setStatus("submitting");
        setFeedback(null);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const data = (await response.json());
            if (response.ok && data.ok) {
                setStatus("success");
                setFeedback({
                    message: "Message sent. I'll get back to you as soon as I can.",
                });
                reset();
                return;
            }
            setStatus("error");
            setFeedback({
                code: data.code,
                message: data.message ??
                    "Something went wrong while sending your message. Please try again.",
            });
        }
        catch {
            setStatus("error");
            setFeedback({
                message: "The network request failed. Check your connection or email me directly.",
            });
        }
    };
    const isSubmitting = status === "submitting";
    const notConfigured = feedback?.code === "EMAIL_NOT_CONFIGURED";
    return (<form onSubmit={handleSubmit(onSubmit)} noValidate className="relative rounded-md border border-line bg-surface/40 p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-brand">
            Send a message
          </p>
          <h3 className="mt-3 font-display text-xl font-medium uppercase tracking-[0.01em] text-ink sm:text-2xl">
            Start a conversation
          </h3>
        </div>
        <Send className="h-4 w-4 shrink-0 text-muted/50"/>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
            Name
          </label>
          <input id="contact-name" type="text" autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} className="field" {...register("name")}/>
          {errors.name ? (<p id="contact-name-error" className="mt-2 text-[0.7rem] text-brand/90">
              {errors.name.message}
            </p>) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-2 block font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
            Email
          </label>
          <input id="contact-email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} className="field" {...register("email")}/>
          {errors.email ? (<p id="contact-email-error" className="mt-2 text-[0.7rem] text-brand/90">
              {errors.email.message}
            </p>) : null}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-subject" className="mb-2 block font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
          Subject
        </label>
        <input id="contact-subject" type="text" placeholder="What's this about?" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "contact-subject-error" : undefined} className="field" {...register("subject")}/>
        {errors.subject ? (<p id="contact-subject-error" className="mt-2 text-[0.7rem] text-brand/90">
            {errors.subject.message}
          </p>) : null}
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="mb-2 block font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
          Message
        </label>
        <textarea id="contact-message" rows={6} placeholder="Tell me about the idea, the problem, or the opportunity." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} className="field resize-none" {...register("message")}/>
        {errors.message ? (<p id="contact-message-error" className="mt-2 text-[0.7rem] text-brand/90">
            {errors.message.message}
          </p>) : null}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" type="text" tabIndex={-1} autoComplete="off" {...register("company")}/>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (<>
              Sending
              <Loader2 className="h-4 w-4 animate-spin"/>
            </>) : (<>
              Send message
              <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"/>
            </>)}
        </Button>
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted/50">
          No newsletters. No noise.
        </p>
      </div>

      <div aria-live="polite" className="mt-5">
        {status === "success" && feedback ? (<div role="status" className="flex items-start gap-3 rounded-md border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"/>
            <p className="text-[0.8rem] leading-relaxed text-emerald-100/90">
              {feedback.message}
            </p>
          </div>) : null}

        {status === "error" && feedback ? (<div role="alert" className={cn("flex items-start gap-3 rounded-md border px-4 py-3", notConfigured
                ? "border-brand/25 bg-brand/[0.06]"
                : "border-red-400/25 bg-red-400/[0.06]")}>
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand"/>
            <div className="text-[0.78rem] leading-relaxed text-muted">
              <p>{feedback.message}</p>
              <a href={siteConfig.socials.email} className="link-underline mt-2 inline-block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink">
                {siteConfig.email}
              </a>
            </div>
          </div>) : null}
      </div>
    </form>);
}

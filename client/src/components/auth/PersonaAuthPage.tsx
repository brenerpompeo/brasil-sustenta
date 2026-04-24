import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { Link } from "wouter";

import { AuthPortalLayout } from "@/components/AuthPortalLayout";
import type {
  AccentTone,
  AuthField,
  AuthPersonaConfig,
  AuthTabKey,
} from "@/constants/auth-personas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ─── Tone Lookup Maps ─────────────────────────────────────────────────────────

const toneButtonVariant: Record<AccentTone, "leaf" | "atlantic" | "sun"> = {
  green: "leaf",
  blue: "atlantic",
  yellow: "sun",
};

const toneText: Record<AccentTone, string> = {
  green: "text-[color:var(--color-leaf)]",
  blue: "text-[color:var(--color-atlantic)]",
  yellow: "text-[color:var(--color-sun-deep)]",
};

// ─── PersonaAuthPage ──────────────────────────────────────────────────────────

export function PersonaAuthPage({ persona }: { persona: AuthPersonaConfig }) {
  const [tab, setTab] = useState<AuthTabKey>(persona.defaultTab ?? "cadastro");
  const [lgpdConsent, setLgpdConsent] = useState(false);

  const active = persona[tab];
  const inactiveTab: AuthTabKey = tab === "login" ? "cadastro" : "login";
  const isCadastro = tab === "cadastro";
  const canSubmit = !isCadastro || lgpdConsent;

  return (
    <AuthPortalLayout.Root
      tone={persona.tone}
      secondaryTone={persona.secondaryTone}
      personaKey={persona.key}
    >
      {/* ── Left column: brand narrative ── */}
      <AuthPortalLayout.Sidebar icon={persona.icon}>
        <div>
          <AuthPortalLayout.Nav />
          <AuthPortalLayout.Hero
            icon={persona.icon}
            portalLabel={persona.portalLabel}
            eyebrow={persona.eyebrow}
            title={persona.title}
            description={persona.description}
          />
          <AuthPortalLayout.Badges items={persona.metadata} />
        </div>
        <AuthPortalLayout.Stats
          metrics={persona.metrics}
          highlights={persona.highlights}
        />
      </AuthPortalLayout.Sidebar>

      {/* ── Right column: auth card ── */}
      <AuthPortalLayout.Main portalLabel={persona.portalLabel} icon={persona.icon}>
        <div className="space-y-8">
          {/* Mode header */}
          <div className="space-y-3">
            <p className={cn("font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.24em]", toneText[persona.tone])}>
              {active.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(2rem,4vw,2.9rem)] font-black leading-[0.94] tracking-[-0.045em] text-[color:var(--color-ink)]">
              {active.title}
            </h1>
            <p className="max-w-[34rem] text-base leading-7 text-[color:var(--color-ink-3)]">
              {active.description}
            </p>
          </div>

          {/* Login / Register toggle */}
          <TabSwitch
            tone={persona.tone}
            loginLabel={persona.login.label}
            cadastroLabel={persona.cadastro.label}
            tab={tab}
            onChange={setTab}
          />

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              {active.fields.map((field) => (
                <FieldRenderer
                  key={`${tab}-${field.name}`}
                  field={field}
                  tone={persona.tone}
                />
              ))}
            </div>

            {/* Forgot password (login only) */}
            {active.assistiveActionLabel && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className={cn(
                    "font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] transition-colors",
                    toneText[persona.tone]
                  )}
                >
                  {active.assistiveActionLabel}
                </button>
              </div>
            )}

            {/* LGPD consent (cadastro only) */}
            {isCadastro && (
              <LgpdConsentBox
                checked={lgpdConsent}
                onChange={setLgpdConsent}
                tone={persona.tone}
              />
            )}

            <Button
              type="submit"
              size="xl"
              variant={toneButtonVariant[persona.tone]}
              disabled={!canSubmit}
              className="w-full justify-between rounded-[1.2rem] px-6 text-[0.8125rem] font-black uppercase tracking-[0.24em] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {active.submitLabel}
              <ArrowUpRight className="size-4" />
            </Button>

            {/* Callout box */}
            {active.callout && (
              <div className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-white p-5">
                <p className={cn("font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em]", toneText[persona.tone])}>
                  {active.callout.eyebrow}
                </p>
                <p className="mt-2.5 text-sm leading-6 text-[color:var(--color-ink-3)]">
                  {active.callout.body}
                </p>
              </div>
            )}

            {/* Legal copy */}
            {active.legal && (
              <p className="text-center text-sm leading-6 text-[color:var(--color-ink-4)]">
                {active.legal}
              </p>
            )}
          </form>

          {/* Switch mode footer */}
          <div className="border-t border-[color:var(--color-border)] pt-6 text-center text-sm text-[color:var(--color-ink-3)]">
            {active.footerPrompt}{" "}
            <button
              type="button"
              onClick={() => setTab(inactiveTab)}
              className={cn(
                "font-mono text-[0.75rem] font-semibold uppercase tracking-[0.2em] transition-colors",
                toneText[persona.tone]
              )}
            >
              {active.footerActionLabel}
            </button>
          </div>
        </div>
      </AuthPortalLayout.Main>
    </AuthPortalLayout.Root>
  );
}

// ─── TabSwitch ────────────────────────────────────────────────────────────────

const activeTabClasses: Record<AccentTone, string> = {
  green: "bg-[color:var(--color-leaf)] text-white shadow-sm",
  blue: "bg-[color:var(--color-atlantic)] text-white shadow-sm",
  yellow: "bg-[color:var(--color-sun)] text-[color:var(--color-ink)] shadow-sm",
};

function TabSwitch({
  tone,
  loginLabel,
  cadastroLabel,
  tab,
  onChange,
}: {
  tone: AccentTone;
  loginLabel: string;
  cadastroLabel: string;
  tab: AuthTabKey;
  onChange: (tab: AuthTabKey) => void;
}) {
  return (
    <div className="grid grid-cols-2 rounded-[1.25rem] border border-[color:var(--color-border)] bg-white p-1.5">
      {(
        [
          ["login", loginLabel],
          ["cadastro", cadastroLabel],
        ] as const
      ).map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={cn(
            "rounded-[0.95rem] px-4 py-3 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] transition-all",
            tab === value
              ? activeTabClasses[tone]
              : "text-[color:var(--color-ink-4)] hover:text-[color:var(--color-ink)]"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── FieldRenderer ────────────────────────────────────────────────────────────

const toneBorder: Record<AccentTone, string> = {
  green: "focus-within:border-[color:var(--color-leaf)] focus-within:ring-[color:var(--color-leaf)]",
  blue: "focus-within:border-[color:var(--color-atlantic)] focus-within:ring-[color:var(--color-atlantic)]",
  yellow: "focus-within:border-[color:var(--color-sun-deep)] focus-within:ring-[color:var(--color-sun-deep)]",
};

const inputToneClasses: Record<AccentTone, string> = {
  green: "focus-visible:border-[color:var(--color-leaf)] focus-visible:ring-[color:var(--color-leaf)]",
  blue: "focus-visible:border-[color:var(--color-atlantic)] focus-visible:ring-[color:var(--color-atlantic)]",
  yellow: "focus-visible:border-[color:var(--color-sun-deep)] focus-visible:ring-[color:var(--color-sun-deep)]",
};

function FieldRenderer({ field, tone }: { field: AuthField; tone: AccentTone }) {
  const wrapperClass = field.colSpan === 2 ? "sm:col-span-2" : "sm:col-span-1";

  return (
    <div className={cn("space-y-2.5", wrapperClass)}>
      <Label
        htmlFor={field.name}
        className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]"
      >
        {field.label}
      </Label>
      {renderControl(field, tone)}
    </div>
  );
}

function renderControl(field: AuthField, tone: AccentTone) {
  if (field.type === "select") {
    return (
      <div
        className={cn(
          "relative rounded-[1rem] border border-[color:var(--color-input)] bg-white ring-0 transition-[border-color,box-shadow] focus-within:ring-2",
          toneBorder[tone]
        )}
      >
        <select
          id={field.name}
          defaultValue=""
          required={field.required}
          className="h-12 w-full appearance-none rounded-[1rem] bg-transparent px-4 pr-11 text-base font-medium text-[color:var(--color-ink)] outline-none"
        >
          <option value="" disabled>Selecione</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[color:var(--color-ink-4)]" />
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div
        className={cn(
          "rounded-[1rem] border border-[color:var(--color-input)] bg-white ring-0 transition-[border-color,box-shadow] focus-within:ring-2",
          toneBorder[tone]
        )}
      >
        <textarea
          id={field.name}
          required={field.required}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          className="w-full resize-none rounded-[1rem] bg-transparent px-4 py-3 text-base font-medium text-[color:var(--color-ink)] outline-none placeholder:text-[color:var(--color-ink-5)]"
        />
      </div>
    );
  }

  return (
    <Input
      id={field.name}
      type={field.type}
      placeholder={field.placeholder}
      required={field.required}
      className={cn(
        "rounded-[1rem] border-[color:var(--color-input)] bg-white shadow-none focus-visible:ring-2",
        inputToneClasses[tone]
      )}
    />
  );
}

// ─── LgpdConsentBox ───────────────────────────────────────────────────────────

/**
 * Caixa de consentimento LGPD.
 * Obrigatória em qualquer fluxo de cadastro (Lei 13.709/2018, Art. 7º, I e Art. 8º).
 */
const checkboxToneClasses: Record<AccentTone, string> = {
  green: "bg-[color:var(--color-leaf)] border-[color:var(--color-leaf)]",
  blue: "bg-[color:var(--color-atlantic)] border-[color:var(--color-atlantic)]",
  yellow: "bg-[color:var(--color-sun)] border-[color:var(--color-sun-deep)] text-[color:var(--color-ink)]",
};

function LgpdConsentBox({
  checked,
  onChange,
  tone,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  tone: AccentTone;
}) {
  return (
    <div className="rounded-[1rem] border border-[color:var(--color-border)] bg-[color:var(--color-paper-2)] p-4">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
          aria-required="true"
          aria-label="Concordo com os Termos de Uso e Política de Privacidade conforme LGPD"
        />
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-[0.3rem] border-2 border-[color:var(--color-ink-4)] bg-white transition-all",
            checked && checkboxToneClasses[tone]
          )}
        >
          {checked && (
            <Check
              className={cn(
                "size-3.5 stroke-[3]",
                tone === "yellow" ? "text-[color:var(--color-ink)]" : "text-white"
              )}
            />
          )}
        </span>
        <span className="text-xs leading-relaxed text-[color:var(--color-ink-3)]">
          Concordo com os{" "}
          <Link
            href="/termos"
            className="font-semibold text-[color:var(--color-ink)] underline underline-offset-2 hover:text-[color:var(--color-leaf)]"
          >
            Termos de Uso
          </Link>{" "}
          e{" "}
          <Link
            href="/privacidade"
            className="font-semibold text-[color:var(--color-ink)] underline underline-offset-2 hover:text-[color:var(--color-leaf)]"
          >
            Política de Privacidade
          </Link>
          . Autorizo o tratamento de meus dados conforme a{" "}
          <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-[color:var(--color-ink)]">
            LGPD
          </span>{" "}
          (Lei 13.709/2018).
        </span>
      </label>
    </div>
  );
}

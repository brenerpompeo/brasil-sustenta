import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { ODSBadge } from "./ODSBadge"
import { X, Plus } from "lucide-react"

const briefSchema = z.object({
  title: z.string().min(5, "Mínimo 5 caracteres"),
  description: z.string().min(20, "Descreva o desafio com mais detalhes"),
  odsAlignment: z.array(z.number()).min(1, "Selecione ao menos 1 ODS"),
  requiredSkills: z.array(z.string()).min(1, "Adicione ao menos 1 skill"),
  duration: z.number().min(7).max(365),
  teamSize: z.number().min(1).max(10),
  budget: z.number().optional(),
  category: z.enum([
    "esg",
    "direitos_humanos",
    "ods",
    "comunicacao",
    "marketing",
    "website",
    "ui_ux",
    "design_thinking",
  ]),
})

export type BriefFormData = z.infer<typeof briefSchema>

type BriefFormProps = {
  onSubmit: (data: BriefFormData) => Promise<void>
  isLoading?: boolean
}

const ODS_RANGE = Array.from({ length: 17 }, (_, i) => i + 1)

const CATEGORIES: { value: BriefFormData["category"]; label: string }[] = [
  { value: "esg", label: "ESG" },
  { value: "direitos_humanos", label: "Direitos Humanos" },
  { value: "ods", label: "ODS" },
  { value: "comunicacao", label: "Comunicação" },
  { value: "marketing", label: "Marketing" },
  { value: "website", label: "Website" },
  { value: "ui_ux", label: "UI/UX" },
  { value: "design_thinking", label: "Design Thinking" },
]

export function BriefForm({ onSubmit, isLoading = false }: BriefFormProps) {
  const [skillInput, setSkillInput] = useState("")

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BriefFormData>({
    defaultValues: {
      title: "",
      description: "",
      odsAlignment: [],
      requiredSkills: [],
      duration: 30,
      teamSize: 3,
      budget: undefined,
      category: "esg",
    },
  })

  const selectedODS = watch("odsAlignment") || []
  const skills = watch("requiredSkills") || []

  function toggleODS(ods: number) {
    const current = selectedODS
    if (current.includes(ods)) {
      setValue("odsAlignment", current.filter((o) => o !== ods), { shouldValidate: true })
    } else {
      setValue("odsAlignment", [...current, ods], { shouldValidate: true })
    }
  }

  function addSkill() {
    const trimmed = skillInput.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setValue("requiredSkills", [...skills, trimmed], { shouldValidate: true })
      setSkillInput("")
    }
  }

  function removeSkill(skill: string) {
    setValue("requiredSkills", skills.filter((s) => s !== skill), { shouldValidate: true })
  }

  async function handleFormSubmit(data: BriefFormData) {
    const parsed = briefSchema.safeParse(data)
    if (!parsed.success) return
    await onSubmit(parsed.data)
  }

  const inputClass =
    "w-full bg-[#050505] border border-white/8 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#00FF41]/40 transition-colors"
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-white/50 mb-2"
  const errorClass = "text-xs text-[#FF003C] mt-1"

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-[#0A0A0A] border border-white/8 rounded-xl p-6 space-y-6"
    >
      {/* Título */}
      <div>
        <label className={labelClass}>Título do Desafio</label>
        <input
          {...register("title", {
            required: "Campo obrigatório",
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
          })}
          placeholder="Ex: Relatório ESG Escopo 3 para 2025"
          className={inputClass}
        />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      {/* Descrição */}
      <div>
        <label className={labelClass}>Descrição do Desafio</label>
        <textarea
          {...register("description", {
            required: "Campo obrigatório",
            minLength: { value: 20, message: "Descreva o desafio com mais detalhes" },
          })}
          placeholder="Descreva o contexto, os objetivos e as entregas esperadas..."
          rows={4}
          className={inputClass + " resize-none"}
        />
        {errors.description && <p className={errorClass}>{errors.description.message}</p>}
      </div>

      {/* Categoria */}
      <div>
        <label className={labelClass}>Categoria</label>
        <select
          {...register("category", { required: "Selecione uma categoria" })}
          className={inputClass}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value} style={{ background: "#0A0A0A" }}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && <p className={errorClass}>{errors.category.message}</p>}
      </div>

      {/* ODS Alignment */}
      <div>
        <label className={labelClass}>Alinhamento ODS</label>
        <p className="text-white/30 text-xs mb-3">Clique para selecionar os ODS relacionados ao desafio</p>
        <div className="grid grid-cols-6 sm:grid-cols-9 gap-2">
          {ODS_RANGE.map((ods) => (
            <button
              key={ods}
              type="button"
              onClick={() => toggleODS(ods)}
              className={[
                "rounded-lg p-1 transition-all min-h-[44px] flex flex-col items-center justify-center gap-1",
                selectedODS.includes(ods)
                  ? "ring-2 ring-[#00FF41] bg-[#00FF41]/10 scale-105"
                  : "ring-1 ring-white/8 hover:ring-white/20 hover:scale-105",
              ].join(" ")}
              title={`ODS ${ods}`}
            >
              <ODSBadge ods={ods} size="sm" />
              <span className="text-[9px] text-white/50 font-mono">{ods}</span>
            </button>
          ))}
        </div>
        {errors.odsAlignment && (
          <p className={errorClass}>{errors.odsAlignment.message as string}</p>
        )}
      </div>

      {/* Skills */}
      <div>
        <label className={labelClass}>Skills Necessárias</label>
        <div className="flex gap-2 mb-2">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addSkill()
              }
            }}
            placeholder="Ex: Python, ESG reporting... e pressione Enter"
            className={inputClass + " flex-1"}
          />
          <button
            type="button"
            onClick={addSkill}
            className="min-h-[44px] px-4 bg-white/8 border border-white/8 rounded-lg text-white/60 hover:text-white hover:border-white/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/70 text-xs px-3 py-1.5 rounded-full"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        {errors.requiredSkills && (
          <p className={errorClass}>{errors.requiredSkills.message as string}</p>
        )}
      </div>

      {/* Duração e Tamanho do Squad */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Duração (dias)</label>
          <input
            type="number"
            {...register("duration", {
              required: "Campo obrigatório",
              valueAsNumber: true,
              min: { value: 7, message: "Mínimo 7 dias" },
              max: { value: 365, message: "Máximo 365 dias" },
            })}
            className={inputClass}
            min={7}
            max={365}
          />
          {errors.duration && <p className={errorClass}>{errors.duration.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Tamanho do Squad</label>
          <input
            type="number"
            {...register("teamSize", {
              required: "Campo obrigatório",
              valueAsNumber: true,
              min: { value: 1, message: "Mínimo 1 pessoa" },
              max: { value: 10, message: "Máximo 10 pessoas" },
            })}
            className={inputClass}
            min={1}
            max={10}
          />
          {errors.teamSize && <p className={errorClass}>{errors.teamSize.message}</p>}
        </div>
      </div>

      {/* Budget (opcional) */}
      <div>
        <label className={labelClass}>
          Budget{" "}
          <span className="text-white/30 normal-case tracking-normal font-normal">(opcional)</span>
        </label>
        <input
          type="number"
          {...register("budget", { valueAsNumber: true })}
          placeholder="Valor em R$"
          className={inputClass}
          min={0}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full min-h-[48px] bg-[#00FF41] text-black font-black text-sm uppercase tracking-widest rounded-lg hover:bg-[#00FF41]/90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Enviando..." : "Publicar Brief ESG"}
      </button>
    </form>
  )
}

import { PersonaAuthPage } from "@/components/auth/PersonaAuthPage";
import { AUTH_PERSONAS } from "@/constants/auth-personas";

export default function EmbaixadorAuth() {
  return <PersonaAuthPage persona={AUTH_PERSONAS.embaixador} />;
}

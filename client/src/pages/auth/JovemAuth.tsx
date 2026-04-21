import { PersonaAuthPage } from "@/components/auth/PersonaAuthPage";
import { AUTH_PERSONAS } from "@/constants/auth-personas";

export default function JovemAuth() {
  return <PersonaAuthPage persona={AUTH_PERSONAS.jovem} />;
}

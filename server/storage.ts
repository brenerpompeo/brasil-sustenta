// Storage helpers usando Supabase Storage (migrado de Manus proxy)
import { createClient } from "@supabase/supabase-js";
import { ENV } from "./_core/env";

const supabase = createClient(ENV.supabaseUrl, ENV.supabaseServiceRoleKey);
const BUCKET = "uploads";

/**
 * Faz upload de um arquivo para o Supabase Storage.
 * Retorna a URL pública do arquivo.
 */
export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  const key = relKey.replace(/^\/+/, "");

  const blob =
    typeof data === "string"
      ? new Blob([data], { type: contentType })
      : new Blob([data as unknown as ArrayBuffer], { type: contentType });

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(key, blob, { contentType, upsert: true });

  if (error) {
    throw new Error(`Falha no upload: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(key);

  return { key, url: publicUrl };
}

/**
 * Obtém a URL pública de um arquivo no Supabase Storage.
 */
export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const key = relKey.replace(/^\/+/, "");

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(key);

  return { key, url: publicUrl };
}

/**
 * Remove um arquivo do Supabase Storage.
 */
export async function storageDelete(relKey: string): Promise<void> {
  const key = relKey.replace(/^\/+/, "");
  const { error } = await supabase.storage.from(BUCKET).remove([key]);
  if (error) {
    throw new Error(`Falha ao deletar arquivo: ${error.message}`);
  }
}

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface CoverUploadProps {
  currentCover?: string | null;
  onUploadSuccess: (url: string) => void;
}

export const CoverUpload = ({ currentCover, onUploadSuccess }: CoverUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentCover || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.upload.uploadProjectCover.useMutation({
    onSuccess: (data) => {
      toast.success('Capa enviada com sucesso!');
      onUploadSuccess(data.url);
      setIsUploading(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao enviar capa');
      setIsUploading(false);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione uma imagem válida');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    const base64Reader = new FileReader();
    base64Reader.onloadend = () => {
      uploadMutation.mutate({
        base64: base64Reader.result as string,
        filename: file.name,
        contentType: file.type,
      });
    };
    base64Reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onUploadSuccess('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video rounded-xl border-2 border-dashed border-border bg-card overflow-hidden">
        {preview ? (
          <>
            <img
              src={preview}
              alt="Cover Preview"
              className="w-full h-full object-cover"
            />
            {!isUploading && (
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          <div 
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="w-10 h-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground font-medium">Adicionar capa do projeto</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG até 5MB</p>
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!preview && (
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          variant="outline"
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Escolher Imagem de Capa
            </>
          )}
        </Button>
      )}
    </div>
  );
};
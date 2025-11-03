import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface LogoUploadProps {
  currentLogo?: string | null;
  onUploadSuccess: (url: string) => void;
  type?: 'logo' | 'avatar';
}

export const LogoUpload = ({ currentLogo, onUploadSuccess, type = 'logo' }: LogoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentLogo || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.upload[type === 'logo' ? 'uploadLogo' : 'uploadAvatar'].useMutation({
    onSuccess: (data) => {
      toast.success('Imagem enviada com sucesso!');
      onUploadSuccess(data.url);
      setIsUploading(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao enviar imagem');
      setIsUploading(false);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione uma imagem válida');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
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

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {/* Preview */}
        <div className={`relative ${type === 'logo' ? 'w-32 h-32' : 'w-24 h-24'} rounded-xl border-2 border-dashed border-border bg-card overflow-hidden`}>
          {preview ? (
            <>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {!isUploading && (
                <button
                  onClick={handleRemove}
                  className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            onClick={handleClick}
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
                {preview ? 'Alterar Imagem' : 'Escolher Imagem'}
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            PNG, JPG ou JPEG até 5MB
          </p>
        </div>
      </div>
    </div>
  );
};

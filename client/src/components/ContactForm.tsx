import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface ContactFormProps {
  onSuccess?: () => void;
}

export const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    cnpj: '',
    industry: '',
    companySize: '' as 'pequena' | 'media' | 'grande' | '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const submitMutation = trpc.contact.submitRequest.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success('Solicitação enviada com sucesso!');
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao enviar solicitação');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.companyName || !formData.contactName || !formData.email) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    submitMutation.mutate({
      ...formData,
      companySize: formData.companySize || undefined,
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-primary/50 rounded-2xl p-12 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-3xl font-bold text-foreground mb-4">
          Solicitação Enviada!
        </h3>
        <p className="text-lg text-muted-foreground mb-6">
          Recebemos sua solicitação e entraremos em contato em até 24 horas úteis.
        </p>
        <p className="text-sm text-muted-foreground">
          Enviamos uma confirmação para <strong>{formData.email}</strong>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Solicite um Orçamento Personalizado
        </h3>
        <p className="text-muted-foreground">
          Preencha o formulário abaixo e nossa equipe entrará em contato para entender suas necessidades.
        </p>
      </div>

      {/* Company Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground">Informações da Empresa</h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Nome da Empresa *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              placeholder="Ex: TechCorp Brasil"
              required
            />
          </div>

          <div>
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              id="cnpj"
              value={formData.cnpj}
              onChange={(e) => handleChange('cnpj', e.target.value)}
              placeholder="00.000.000/0000-00"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="industry">Setor</Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              placeholder="Ex: Tecnologia, Energia, Finanças"
            />
          </div>

          <div>
            <Label htmlFor="companySize">Porte da Empresa</Label>
            <Select
              value={formData.companySize}
              onValueChange={(value) => handleChange('companySize', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o porte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pequena">Pequena (até 50 funcionários)</SelectItem>
                <SelectItem value="media">Média (51-500 funcionários)</SelectItem>
                <SelectItem value="grande">Grande (500+ funcionários)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground">Informações de Contato</h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactName">Nome do Contato *</Label>
            <Input
              id="contactName"
              value={formData.contactName}
              onChange={(e) => handleChange('contactName', e.target.value)}
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>

      {/* Project Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground">Sobre o Projeto</h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="projectType">Tipo de Projeto</Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) => handleChange('projectType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="esg">ESG / Sustentabilidade</SelectItem>
                <SelectItem value="direitos_humanos">Direitos Humanos</SelectItem>
                <SelectItem value="ods">ODS (Objetivos de Desenvolvimento Sustentável)</SelectItem>
                <SelectItem value="comunicacao">Comunicação Corporativa</SelectItem>
                <SelectItem value="marketing">Marketing com Propósito</SelectItem>
                <SelectItem value="website">Website / Plataforma Digital</SelectItem>
                <SelectItem value="ui_ux">UI/UX Design</SelectItem>
                <SelectItem value="design_thinking">Design Thinking</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="budget">Orçamento Estimado</Label>
            <Select
              value={formData.budget}
              onValueChange={(value) => handleChange('budget', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a faixa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ate_15k">Até R$ 15.000</SelectItem>
                <SelectItem value="15k_30k">R$ 15.000 - R$ 30.000</SelectItem>
                <SelectItem value="30k_50k">R$ 30.000 - R$ 50.000</SelectItem>
                <SelectItem value="acima_50k">Acima de R$ 50.000</SelectItem>
                <SelectItem value="a_definir">A definir</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="timeline">Prazo Desejado</Label>
          <Select
            value={formData.timeline}
            onValueChange={(value) => handleChange('timeline', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o prazo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urgente">Urgente (até 1 mês)</SelectItem>
              <SelectItem value="curto">Curto prazo (1-3 meses)</SelectItem>
              <SelectItem value="medio">Médio prazo (3-6 meses)</SelectItem>
              <SelectItem value="longo">Longo prazo (6+ meses)</SelectItem>
              <SelectItem value="flexivel">Flexível</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="message">Mensagem / Detalhes do Projeto</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Conte-nos mais sobre seu projeto, desafios e objetivos..."
            rows={5}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={submitMutation.isPending}
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold text-lg py-6"
        >
          {submitMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            'Solicitar Orçamento'
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Ao enviar, você concorda com nossa política de privacidade
        </p>
      </div>
    </form>
  );
};

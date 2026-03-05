'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ChevronRight, 
  Upload, 
  Phone, 
  Mail, 
  MapPin, 
  Info,
  Menu,
  X
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { colors } from '@/lib/colors';
import ColorSimulator from '@/components/ColorSimulator';
import ImageUploader from '@/components/ImageUploader';

// --- Types & Schemas ---

const formSchema = z.object({
  nome: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  whatsapp: z.string().min(10, 'WhatsApp inválido'),
  cep: z.string().min(8, 'CEP inválido'),
  rua: z.string().min(3, 'Rua obrigatória'),
  numero: z.string().min(1, 'Número obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(2, 'Bairro obrigatório'),
  cidade: z.string().min(2, 'Cidade obrigatória'),
  estado: z.string().length(2, 'UF inválida'),
});

type FormData = z.infer<typeof formSchema>;

const productLines = [
  {
    id: 'perfetta',
    name: 'Linha Perfetta™',
    tag: 'Premium',
    description: 'Design minimalista e industrial, isolamento acústico absoluto e vedação hermética.',
    color: 'bg-black text-white',
    tagColor: 'bg-black text-white'
  },
  {
    id: 'gold',
    name: 'Linha Gold',
    tag: 'Intermediária',
    description: 'Qualidade superior com excelente custo-benefício para projetos residenciais.',
    color: 'bg-white border-gray-200',
    tagColor: 'bg-orange-500 text-white'
  },
  {
    id: 'portas',
    name: 'Portas de Entrada',
    tag: 'Especial',
    description: 'Portas pivotantes de entrada em alumínio de alta gestão.',
    color: 'bg-white border-gray-200',
    tagColor: 'bg-blue-500 text-white'
  },
  {
    id: 'brise',
    name: 'Brise / Painéis',
    tag: 'Decorativa',
    description: 'Brises e painéis decorativos para fachadas modernas.',
    color: 'bg-white border-gray-200',
    tagColor: 'bg-emerald-500 text-white'
  }
];

// --- Components ---

export default function BudgetPage() {
  const [selectedLine, setSelectedLine] = useState(productLines[0].id);
  const [selectedColorId, setSelectedColorId] = useState('preto');
  const [colorType, setColorType] = useState<'solid' | 'wood'>('solid');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customProfileImage, setCustomProfileImage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data, { selectedLine, selectedColorId });
    alert('Orçamento solicitado com sucesso! Entraremos em contato em breve.');
  };

  const currentLine = productLines.find(l => l.id === selectedLine);
  const currentColor = colors.find(c => c.id === selectedColorId);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black grid grid-cols-2 gap-0.5 p-0.5">
              <div className="bg-white/20"></div>
              <div className="bg-white/80"></div>
              <div className="bg-white/60"></div>
              <div className="bg-white/40"></div>
            </div>
            <span className="font-bold text-xl tracking-tighter">REALIZA</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-black transition-colors">Home</a>
            <a href="#" className="hover:text-black transition-colors">Sobre</a>
            <a href="#" className="hover:text-black transition-colors">Projetos</a>
            <a href="#" className="hover:text-black transition-colors">Contato</a>
            <a href="#" className="text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1">Orçamentos</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden lg:flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
              <Phone size={16} />
              Falar com Especialista
            </button>
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white border-b border-gray-100 p-4 flex flex-col gap-4"
            >
              <a href="#" className="text-gray-600 font-medium">Home</a>
              <a href="#" className="text-gray-600 font-medium">Sobre</a>
              <a href="#" className="text-gray-600 font-medium">Projetos</a>
              <a href="#" className="text-gray-600 font-medium">Contato</a>
              <a href="#" className="text-emerald-600 font-bold">Orçamentos</a>
              <button className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-semibold">
                <Phone size={16} />
                Falar com Especialista
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20 relative bg-white/50 p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="text-center md:text-left max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#0F172A] mb-6 leading-tight">
              Crie Seu Orçamento <span className="text-emerald-600">Personalizado</span>
            </h1>
            <p className="text-slate-500 max-w-xl mx-auto md:mx-0 text-lg md:text-xl leading-relaxed">
              Escolha a linha de produtos e a cor perfeita para seu projeto. Nossos especialistas analisarão sua solicitação e enviarão um orçamento detalhado em até 48 horas.
            </p>
          </div>

          {/* Profile Image Display - Refined with Glow */}
          <div className="relative w-56 h-72 md:w-72 md:h-96 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white flex-shrink-0 group ring-1 ring-emerald-100/50">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-emerald-400/10 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
            
            <div className="relative h-full w-full bg-white rounded-[1.25rem] overflow-hidden">
              <Image 
                src={customProfileImage || `/images/profiles/${selectedColorId}.png`}
                alt="Perfil Técnico"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  if (!customProfileImage) {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://picsum.photos/seed/profile-${selectedColorId}/400/400`;
                  }
                }}
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Labels */}
              {!customProfileImage && (
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm text-center">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                      Visualização Técnica
                    </span>
                  </div>
                </div>
              )}
              
              {customProfileImage && (
                <div className="absolute top-4 right-4">
                  <div className="bg-emerald-500 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/30">
                    Sua Imagem
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Selection */}
          <div className="lg:col-span-4 space-y-12">
            {/* 1. Escolha a Linha */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-bold">1</span>
                <h2 className="text-xl font-bold">Escolha a Linha</h2>
              </div>
              <div className="space-y-4">
                {productLines.map((line) => (
                  <button
                    key={line.id}
                    onClick={() => setSelectedLine(line.id)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all relative group ${
                      selectedLine === line.id 
                        ? 'border-black bg-white shadow-xl scale-[1.02]' 
                        : 'border-transparent bg-white hover:border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{line.name}</h3>
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-md ${line.tagColor}`}>
                        {line.tag}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {line.description}
                    </p>
                    {selectedLine === line.id && (
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-black rounded-full" />
                    )}
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      <Check size={14} className="text-emerald-600" />
                      Selecionado
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Middle Column: Customization & Preview */}
          <div className="lg:col-span-8">
            <ColorSimulator 
              showWoodColors={true} 
              defaultColorId={selectedColorId} 
              onColorChange={setSelectedColorId}
            />
            
            {/* Área de Teste de Upload (Opcional) */}
            <div className="mt-12 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4 text-center uppercase tracking-widest">Área de Teste: Upload de Imagem</h3>
              <ImageUploader onImageUploadSuccess={(url) => setCustomProfileImage(url)} />
              <p className="mt-4 text-[10px] text-gray-400 text-center italic">
                * Teste como seus perfis técnicos ficam no enquadramento.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Seus Dados */}
        <section className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-bold">3</span>
            <h2 className="text-2xl font-bold">Seus Dados</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-black transition-colors">Nome Completo *</label>
                  <input 
                    {...register('nome')}
                    placeholder="Seu nome"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl px-4 py-3 outline-none transition-all"
                  />
                  {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-black transition-colors">WhatsApp *</label>
                  <input 
                    {...register('whatsapp')}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl px-4 py-3 outline-none transition-all"
                  />
                  {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-black transition-colors">Rua *</label>
                  <input 
                    {...register('rua')}
                    placeholder="Nome da rua"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl px-4 py-3 outline-none transition-all"
                  />
                  {errors.rua && <p className="text-red-500 text-xs mt-1">{errors.rua.message}</p>}
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-black transition-colors">Complemento</label>
                  <input 
                    {...register('complemento')}
                    placeholder="Apto, bloco, etc"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl px-4 py-3 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-black transition-colors">Bairro *</label>
                    <input 
                      {...register('bairro')}
                      placeholder="Bairro"
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl px-4 py-3 outline-none transition-all"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-black transition-colors">Cidade *</label>
                    <input 
                      {...register('cidade')}
                      placeholder="Cidade"
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl px-4 py-3 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-black transition-colors">Email *</label>
                  <input 
                    {...register('email')}
                    placeholder="seu@email.com"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl px-4 py-3 outline-none transition-all"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-black transition-colors">CEP *</label>
                  <input 
                    {...register('cep')}
                    placeholder="00000-000"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl px-4 py-3 outline-none transition-all"
                  />
                  {errors.cep && <p className="text-red-500 text-xs mt-1">{errors.cep.message}</p>}
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-black transition-colors">Número *</label>
                  <input 
                    {...register('numero')}
                    placeholder="123"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl px-4 py-3 outline-none transition-all"
                  />
                  {errors.numero && <p className="text-red-500 text-xs mt-1">{errors.numero.message}</p>}
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-black transition-colors">Estado *</label>
                  <input 
                    {...register('estado')}
                    placeholder="SP"
                    maxLength={2}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl px-4 py-3 outline-none transition-all uppercase"
                  />
                  {errors.estado && <p className="text-red-500 text-xs mt-1">{errors.estado.message}</p>}
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-black transition-colors">Upload de Projetos (Opcional)</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-black transition-colors cursor-pointer bg-gray-50">
                    <Upload className="mx-auto mb-4 text-gray-400" />
                    <p className="text-sm font-bold mb-1">Clique para fazer upload ou arraste e solte</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">PDF, JPG, PNG, ZIP (máx 10MB por arquivo)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumo */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-12 border border-gray-100">
              <h3 className="font-bold text-lg mb-6">Resumo do Orçamento</h3>
              <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Linha</p>
                  <p className="font-bold text-xl">{currentLine?.name}</p>
                </div>
                <div className="flex-1 text-right md:text-left">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Cor</p>
                  <div className="flex items-center md:justify-start justify-end gap-3">
                    <div className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: currentColor?.hex }} />
                    <p className="font-bold text-xl">{currentColor?.name}</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#0F172A] text-white py-6 rounded-2xl font-bold text-xl hover:bg-black transition-all shadow-2xl shadow-black/20 flex items-center justify-center gap-3 group"
            >
              Solicitar Orçamento
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center mt-6 text-xs text-gray-400">
              Seus dados estão 100% seguros. Não fazemos spam.
            </p>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-black grid grid-cols-2 gap-0.5 p-0.5">
                <div className="bg-white/20"></div>
                <div className="bg-white/80"></div>
                <div className="bg-white/60"></div>
                <div className="bg-white/40"></div>
              </div>
              <span className="font-bold text-lg tracking-tighter">REALIZA</span>
            </div>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
              Especialistas em esquadrias de alto padrão e soluções arquitetônicas sob medida para transformar seu projeto em realidade.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Links Rápidos</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Nossos Projetos</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Linha de Produtos</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Contato</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center gap-3"><Phone size={16} /> (11) 99999-9999</li>
              <li className="flex items-center gap-3"><Mail size={16} /> contato@realiza.com.br</li>
              <li className="flex items-center gap-3"><MapPin size={16} /> São Paulo, SP</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-50 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Realiza Esquadrias. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { WOOD_COLORS, SOLID_COLORS, PRODUCT_LINES, getColorById } from '@/lib/colors';
import ColorSimulator from '@/components/ColorSimulator';
import ImageUploader from '@/components/ImageUploader';

const PRODUCT_LINES_ARRAY = Object.values(PRODUCT_LINES);

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

export default function BudgetPage() {
  const [selectedLine, setSelectedLine] = useState(PRODUCT_LINES_ARRAY[0].id);
  const [selectedColorId, setSelectedColorId] = useState('black');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customProfileImage, setCustomProfileImage] = useState<string | null>(null);

  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    const line = PRODUCT_LINES[selectedLine];
    const color = getColorById(selectedColorId);
    
    console.log('Form Data:', data, { line, color });
    
    // Preparando para o WhatsApp oficial
    const message = `Olá! Gostaria de um orçamento para:\n\n` +
      `*Linha:* ${line.displayName}\n` +
      `*Cor:* ${color?.name}\n\n` +
      `*Dados do Cliente:*\n` +
      `*Nome:* ${data.nome}\n` +
      `*WhatsApp:* ${data.whatsapp}\n` +
      `*Endereço:* ${data.rua}, ${data.numero} - ${data.bairro}, ${data.cidade}/${data.estado}`;
    
    const encodedMessage = encodeURIComponent(message);
    // Substitua pelo número real da Realiza quando tiver
    window.open(`https://wa.me/5511999999999?text=${encodedMessage}`, '_blank');
  };

  const handleLineChange = (lineId: string) => {
    setSelectedLine(lineId);
    const line = PRODUCT_LINES[lineId];
    // Reseta para a primeira cor disponível da linha
    if (line.solidColors && line.solidColors.length > 0) {
      setSelectedColorId(line.solidColors[0].id);
    } else if (line.colors && line.colors.length > 0) {
      setSelectedColorId(line.colors[0].id);
    }
  };

  const currentLine = PRODUCT_LINES[selectedLine];
  const currentColor = getColorById(selectedColorId);

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
              <img 
                src={customProfileImage || currentColor?.profileImage || `/images/profiles/${selectedColorId}.png`}
                alt="Perfil Técnico"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  if (!customProfileImage) {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://picsum.photos/seed/profile-${selectedColorId}/400/400`;
                  }
                }}
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

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Selection (3 cols) */}
          <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            {/* 1. Escolha a Linha */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-bold">1</span>
                <h2 className="text-lg font-bold">Escolha a Linha</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {PRODUCT_LINES_ARRAY.map((line) => (
                  <button
                    key={line.id}
                    onClick={() => handleLineChange(line.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all relative group ${
                      selectedLine === line.id 
                        ? 'border-black bg-white shadow-md scale-[1.02]' 
                        : 'border-transparent bg-white hover:border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm">{line.displayName}</h3>
                      {line.hasBonus && (
                        <span className="text-[8px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded-md bg-emerald-500 text-white">
                          BÔNUS
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 leading-tight line-clamp-2">
                      {line.description}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Middle Column: Customization & Preview (6 cols) */}
          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
            <ColorSimulator 
              showWoodColors={currentLine.id !== 'acm'} 
              defaultColorId={selectedColorId} 
              onColorChange={setSelectedColorId}
              customColors={currentLine.colors}
              customSolidColors={currentLine.solidColors}
            />
            
            {/* Área de Teste de Upload */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-[10px] font-bold text-gray-400 mb-4 text-center uppercase tracking-widest">Área de Teste: Upload de Perfil</h3>
              <ImageUploader onImageUploadSuccess={(url) => setCustomProfileImage(url)} />
            </div>
          </div>

          {/* Right Column: Form (3 cols) */}
          <div className="lg:col-span-3 order-3">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-bold">3</span>
                <h2 className="text-lg font-bold">Seus Dados</h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg space-y-4">
                <div className="space-y-4">
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Nome *</label>
                    <input {...register('nome')} placeholder="Seu nome" className="w-full bg-gray-50 border border-gray-100 focus:border-black rounded-lg px-3 py-2 text-sm outline-none transition-all" />
                    {errors.nome && <p className="text-red-500 text-[10px] mt-1">{errors.nome.message}</p>}
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">WhatsApp *</label>
                    <input {...register('whatsapp')} placeholder="(11) 99999-9999" className="w-full bg-gray-50 border border-gray-100 focus:border-black rounded-lg px-3 py-2 text-sm outline-none transition-all" />
                    {errors.whatsapp && <p className="text-red-500 text-[10px] mt-1">{errors.whatsapp.message}</p>}
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">CEP *</label>
                    <input {...register('cep')} placeholder="00000-000" className="w-full bg-gray-50 border border-gray-100 focus:border-black rounded-lg px-3 py-2 text-sm outline-none transition-all" />
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Cidade *</label>
                    <input {...register('cidade')} placeholder="Sua cidade" className="w-full bg-gray-50 border border-gray-100 focus:border-black rounded-lg px-3 py-2 text-sm outline-none transition-all" />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50">
                  <div className="mb-4">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Resumo</p>
                    <p className="text-xs font-bold">{currentLine?.displayName} • {currentColor?.name}</p>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
                  >
                    Solicitar Orçamento
                    <ChevronRight size={14} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
          © {isMounted ? (currentYear || 2026) : 2026} Realiza Esquadrias. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

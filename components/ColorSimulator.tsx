'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { colors as GLOBAL_COLORS } from '@/lib/colors';

interface ColorSimulatorProps {
  showWoodColors?: boolean; // Se falso, mostra apenas sólidos
  defaultColorId?: string;
  onColorChange?: (colorId: string) => void;
}

export default function ColorSimulator({ 
  showWoodColors = true, 
  defaultColorId = 'preto',
  onColorChange
}: ColorSimulatorProps) {
  const [selectedColorId, setSelectedColorId] = useState(defaultColorId);
  const [colorType, setColorType] = useState<'solid' | 'wood'>('solid');

  const handleColorSelect = (colorId: string) => {
    setSelectedColorId(colorId);
    if (onColorChange) {
      onColorChange(colorId);
    }
  };

  // Filtra as cores com base na configuração
  const filteredColors = GLOBAL_COLORS.filter(c => {
    if (!showWoodColors && c.type === 'wood') return false;
    return c.type === colorType;
  });

  const currentColor = GLOBAL_COLORS.find(c => c.id === selectedColorId) || GLOBAL_COLORS[0];

  return (
    <div className="space-y-8">
      {/* 1. Seletor de Cores */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">1</div>
          <h2 className="text-xl font-bold">Personalize o Acabamento</h2>
        </div>

        {showWoodColors && (
          <div className="flex gap-2 mb-8 p-1 bg-gray-50 rounded-xl w-fit">
            <button 
              onClick={() => setColorType('solid')}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${colorType === 'solid' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Cores Sólidas
            </button>
            <button 
              onClick={() => setColorType('wood')}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${colorType === 'wood' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Amadeirados
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-8">
          {filteredColors.map((color) => (
            <button
              key={color.id}
              onClick={() => handleColorSelect(color.id)}
              className="group flex flex-col items-center gap-2"
            >
              <div className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                selectedColorId === color.id ? 'border-emerald-500 scale-110' : 'border-transparent group-hover:border-gray-100'
              }`}>
                <div 
                  className={`w-full h-full rounded-full border ${color.id === 'branco' ? 'border-gray-200' : 'border-transparent'}`}
                  style={{ backgroundColor: color.hex }}
                />
                {selectedColorId === color.id && (
                  <div className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5">
                    <Check size={10} strokeWidth={4} />
                  </div>
                )}
              </div>
              <span className={`text-[9px] font-bold tracking-tight text-center w-16 truncate ${selectedColorId === color.id ? 'text-black' : 'text-gray-400'}`}>
                {color.name.toUpperCase()}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 flex items-center gap-6">
          <div 
            className="w-16 h-16 rounded-full shadow-inner border border-black/5"
            style={{ backgroundColor: currentColor.hex }}
          />
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Acabamento Selecionado</p>
            <h4 className="font-bold text-xl">{currentColor.name}</h4>
            <p className="text-xs text-gray-500">Ref: {selectedColorId.toUpperCase()}</p>
          </div>
        </div>
      </section>

      {/* 2. Visualização */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-gray-400">
          <Info size={18} />
          <h2 className="text-lg font-bold">Visualização em Tempo Real</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Imagem de Ambiente (Expanded) */}
          <div className="md:col-span-2 relative aspect-video rounded-2xl overflow-hidden group bg-gray-100">
            <Image 
              // DICA: Para usar imagens reais, salve-as em /public/images/finishes/ com o nome da cor (ex: preto.png)
              src={`/images/finishes/${selectedColorId}.png`}
              alt="Preview Ambiente"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                // Fallback caso a imagem local não exista ainda
                const target = e.target as HTMLImageElement;
                target.src = `https://picsum.photos/seed/finish-${selectedColorId}/800/450`;
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-70 mb-1">Ambiente</p>
              <h3 className="text-2xl font-bold">{currentColor.name}</h3>
            </div>
          </div>

          {/* Perfil Técnico (Expanded) */}
          <div className="relative aspect-square md:aspect-auto rounded-2xl overflow-hidden border border-gray-100 bg-white group">
            <Image 
              // DICA: Para usar imagens reais, salve-as em /public/images/profiles/ com o nome da cor (ex: preto.png)
              src={`/images/profiles/${selectedColorId}.png`}
              alt="Perfil Técnico"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                // Fallback caso a imagem local não exista ainda
                const target = e.target as HTMLImageElement;
                target.src = `https://picsum.photos/seed/profile-${selectedColorId}/400/400`;
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-white/90 backdrop-blur-sm text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest text-gray-500 shadow-sm">
                Perfil Técnico
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

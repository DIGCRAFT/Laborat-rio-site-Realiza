export interface Color {
  id: string;
  name: string;
  hex: string;
  type: 'solid' | 'wood';
}

export const colors: Color[] = [
  // Cores Sólidas
  { id: 'branco', name: 'Branco', hex: '#FFFFFF', type: 'solid' },
  { id: 'preto', name: 'Preto', hex: '#1A1A1A', type: 'solid' },
  { id: 'aco-corten', name: 'Aço Corten', hex: '#8B4513', type: 'solid' },
  
  // Cores Amadeirado
  { id: 'sand-ash', name: 'Sand Ash', hex: '#E3D9C6', type: 'wood' },
  { id: 'branco-artico', name: 'Branco Ártico', hex: '#F0F0F0', type: 'wood' },
  { id: 'carvalho-claro', name: 'Carvalho Claro', hex: '#D2B48C', type: 'wood' },
  { id: 'carvalho-natural', name: 'Carvalho Natural', hex: '#C19A6B', type: 'wood' },
  { id: 'carvalho-dourado', name: 'Carvalho Dourado', hex: '#B8860B', type: 'wood' },
  { id: 'carvalho-escuro', name: 'Carvalho Escuro', hex: '#5D4037', type: 'wood' },
  { id: 'ebano', name: 'Ébano', hex: '#212121', type: 'wood' },
  { id: 'wenge', name: 'Wengé', hex: '#3E2723', type: 'wood' },
  { id: 'nogueira', name: 'Nogueira', hex: '#4E342E', type: 'wood' },
  { id: 'cereja', name: 'Cereja', hex: '#8D6E63', type: 'wood' },
  { id: 'mogno', name: 'Mogno', hex: '#795548', type: 'wood' },
  { id: 'pau-rosa', name: 'Pau-Rosa', hex: '#A1887F', type: 'wood' },
];

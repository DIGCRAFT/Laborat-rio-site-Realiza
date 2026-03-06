/**
 * Paleta de cores baseada no ezycolor.com.br
 * Cores amadeirado e sólidas para cada linha de produto
 */

import { Color, ProductLineConfig } from "@/types/products";

// Cores Amadeirado (baseado em ezycolor.com.br)
const WOOD_COLORS: Color[] = [
  { id: "sand-ash", name: "Sand Ash", hexCode: "#d4c5b0", category: "wood" as const },
  { id: "white-arctic", name: "Branco Ártico", hexCode: "#f5f1ed", category: "wood" as const },
  { id: "light-oak", name: "Carvalho Claro", hexCode: "#d9a574", category: "wood" as const },
  { id: "natural-oak", name: "Carvalho Natural", hexCode: "#c9a574", category: "wood" as const },
  { id: "golden-oak", name: "Carvalho Dourado", hexCode: "#b8944a", category: "wood" as const },
  { id: "dark-oak", name: "Carvalho Escuro", hexCode: "#8b6f47", category: "wood" as const },
  { id: "ebony", name: "Ébano", hexCode: "#2b2520", category: "wood" as const },
  { id: "wenge", name: "Wengé", hexCode: "#3d3630", category: "wood" as const },
  { id: "walnut", name: "Nogueira", hexCode: "#5d4e37", category: "wood" as const },
  { id: "cherry", name: "Cereja", hexCode: "#8b4513", category: "wood" as const },
  { id: "mahogany", name: "Mogno", hexCode: "#a0522d", category: "wood" as const },
  { id: "rosewood", name: "Pau-Rosa", hexCode: "#65000b", category: "wood" as const },
];

// Cores Sólidas
const SOLID_COLORS: Color[] = [
  { 
    id: "white", 
    name: "Branco", 
    hexCode: "#ffffff", 
    finishImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/finishes/Esqudria%20cor%20Branco%20para%20Site%20Realiza%20gmni.png",
    profileImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/profiles/Perfil%20T%C3%A9cnico%20%5BBRANCO%20GOLD%5D.png",
    category: "solid" as const 
  },
  { 
    id: "black", 
    name: "Preto", 
    hexCode: "#1a1a1a", 
    finishImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/finishes/Esqudria%20cor%20Preta%20para%20Site%20Realiza%20gmni.jpeg.png",
    profileImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/profiles/Perfil%20T%C3%A9cnico%20%5BPRETO%5D.jpg",
    category: "solid" as const 
  },
  { 
    id: "corten", 
    name: "Aço Corten", 
    hexCode: "#844d36", 
    finishImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/finishes/Esqudria%20cor%20a%C3%A7o%20cort%C3%8Am%20para%20Site%20Realiza%20gmni.png",
    profileImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/profiles/Perfil%20T%C3%A9cnico%20%5BA%C3%87O%20CORT%C3%8AM%5D.png",
    category: "solid" as const 
  },
];

// Configuração das linhas de produtos
export const PRODUCT_LINES: Record<string, ProductLineConfig> = {
  suprema: {
    id: "suprema",
    name: "SUPREMA",
    displayName: "Linha Suprema",
    description: "A excelência em esquadrias de alumínio com acabamento premium",
    colors: WOOD_COLORS,
    solidColors: SOLID_COLORS,
    hasBonus: false,
  },
  gold: {
    id: "gold",
    name: "GOLD",
    displayName: "Linha Gold",
    description: "Sofisticação e durabilidade para seus projetos",
    colors: WOOD_COLORS,
    solidColors: SOLID_COLORS,
    hasBonus: false,
  },
  perfetta: {
    id: "perfetta",
    name: "PERFETTA",
    displayName: "Linha Perfetta",
    description: "Perfeição em cada detalhe, qualidade garantida",
    colors: WOOD_COLORS,
    solidColors: SOLID_COLORS,
    hasBonus: false,
  },
  acm: {
    id: "acm",
    name: "ACM",
    displayName: "Painéis ACM",
    description: "Revestimento em alumínio composto de alta performance",
    colors: [
      { 
        id: "acm-black", 
        name: "Preto", 
        hexCode: "#1a1a1a", 
        finishImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/finishes/Esqudria%20cor%20Preta%20para%20Site%20Realiza%20gmni.jpeg.png",
        profileImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/profiles/Perfil%20T%C3%A9cnico%20%5BPRETO%5D.jpg",
        category: "solid" as const 
      },
      { 
        id: "acm-white", 
        name: "Branco", 
        hexCode: "#ffffff", 
        finishImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/finishes/Esqudria%20cor%20Branco%20para%20Site%20Realiza%20gmni.png",
        profileImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/profiles/Perfil%20T%C3%A9cnico%20%5BBRANCO%20GOLD%5D.png",
        category: "solid" as const 
      },
      { 
        id: "acm-corten", 
        name: "Aço Corten", 
        hexCode: "#844d36", 
        finishImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/finishes/Esqudria%20cor%20a%C3%A7o%20cort%C3%8Am%20para%20Site%20Realiza%20gmni.png",
        profileImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/profiles/Perfil%20T%C3%A9cnico%20%5BA%C3%87O%20CORT%C3%8AM%5D.png",
        category: "solid" as const 
      },
    ],
    solidColors: [
      { 
        id: "acm-black", 
        name: "Preto", 
        hexCode: "#1a1a1a", 
        finishImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/finishes/Esqudria%20cor%20Preta%20para%20Site%20Realiza%20gmni.jpeg.png",
        profileImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/profiles/Perfil%20T%C3%A9cnico%20%5BPRETO%5D.jpg",
        category: "solid" as const 
      },
      { 
        id: "acm-white", 
        name: "Branco", 
        hexCode: "#ffffff", 
        finishImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/finishes/Esqudria%20cor%20Branco%20para%20Site%20Realiza%20gmni.png",
        profileImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/profiles/Perfil%20T%C3%A9cnico%20%5BBRANCO%20GOLD%5D.png",
        category: "solid" as const 
      },
      { 
        id: "acm-corten", 
        name: "Aço Corten", 
        hexCode: "#844d36", 
        finishImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/finishes/Esqudria%20cor%20a%C3%A7o%20cort%C3%8Am%20para%20Site%20Realiza%20gmni.png",
        profileImage: "https://raw.githubusercontent.com/DIGCRAFT/Laborat-rio-site-Realiza/main/public/images/profiles/Perfil%20T%C3%A9cnico%20%5BA%C3%87O%20CORT%C3%8AM%5D.png",
        category: "solid" as const 
      },
    ],
    hasBonus: false,
  },
  aluminio: {
    id: "aluminio",
    name: "LP-ALUMÍNIO",
    displayName: "Linha Alumínio",
    description: "Soluções em alumínio com bônus exclusivo",
    colors: WOOD_COLORS,
    solidColors: SOLID_COLORS,
    hasBonus: true,
    bonusTitle: "Bônus Exclusivo: Erros que Economizam Milhares",
    bonusDescription:
      "Guia completo com os erros mais comuns em projetos de esquadrias e como evitá-los para economizar até 40% em custos de retrabalho e manutenção.",
  },
};

export const getColorById = (id: string): Color | undefined => {
  // Busca nas cores base
  const baseColor = [...SOLID_COLORS, ...WOOD_COLORS].find(c => c.id === id);
  if (baseColor) return baseColor;

  // Busca nas linhas específicas (como ACM)
  for (const line of Object.values(PRODUCT_LINES)) {
    const lineColor = [...(line.colors || []), ...(line.solidColors || [])].find(c => c.id === id);
    if (lineColor) return lineColor;
  }

  return undefined;
};

export { WOOD_COLORS, SOLID_COLORS };

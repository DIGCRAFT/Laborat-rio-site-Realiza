/**
 * Paleta de cores baseada no ezycolor.com.br
 * Cores amadeirado e sólidas para cada linha de produto
 */

import { Color, ProductLineConfig } from "@/types/products";

// Cores Amadeirado (baseado nas imagens enviadas)
const WOOD_COLORS: Color[] = [
  { 
    id: "sand-ash", 
    name: "Sand Ash", 
    hexCode: "#e8d8c3", 
    category: "wood" as const,
    profileImage: "/images/profiles/sand-ash.png"
  },
  { 
    id: "branco-deco", 
    name: "Branco Deco", 
    hexCode: "#e5d5c0", 
    category: "wood" as const,
    profileImage: "/images/profiles/branco-deco.png"
  },
  { 
    id: "carvalho-ash", 
    name: "Carvalho Ash", 
    hexCode: "#d9a04a", 
    category: "wood" as const,
    profileImage: "/images/profiles/carvalho-ash.png"
  },
  { 
    id: "carvalho-escuro", 
    name: "Carvalho Escuro", 
    hexCode: "#b87a2e", 
    category: "wood" as const,
    profileImage: "/images/profiles/carvalho-escuro.png"
  },
  { 
    id: "carvalho-fiammato", 
    name: "Carvalho Fiammato", 
    hexCode: "#c67a1e", 
    category: "wood" as const,
    profileImage: "/images/profiles/carvalho-fiammato.png"
  },
  { 
    id: "carvalho-ranolit", 
    name: "Carvalho Ranolit", 
    hexCode: "#d68a2a", 
    category: "wood" as const,
    profileImage: "/images/profiles/carvalho-ranolit.png"
  },
  { 
    id: "nogueira", 
    name: "Nogueira", 
    hexCode: "#4a2a1a", 
    category: "wood" as const,
    profileImage: "/images/profiles/nogueira.png"
  },
  { 
    id: "golden-oak", 
    name: "Golden Oak", 
    hexCode: "#d68a2a", 
    category: "wood" as const,
    profileImage: "/images/profiles/golden-oak.png"
  },
  { 
    id: "cerejeira-real", 
    name: "Cerejeira Real", 
    hexCode: "#8b3a0e", 
    category: "wood" as const,
    image: "/images/profiles/color_cerejeira-real.png",
    finishImage: "/images/finishes/acabamento-cerejeira-real.png",
    profileImage: "/images/profiles/perfil-cerejeira-real.png"
  },
];

// Cores Sólidas
const SOLID_COLORS: Color[] = [
  { 
    id: "branco", 
    name: "Branco", 
    hexCode: "#ffffff", 
    finishImage: "/images/finishes/esquadria-branco.png",
    profileImage: "/images/profiles/perfil-branco.png",
    category: "solid" as const 
  },
  { 
    id: "preto", 
    name: "Preto", 
    hexCode: "#1a1a1a", 
    finishImage: "/images/finishes/esquadria-preto.png",
    profileImage: "/images/profiles/perfil-preto.png",
    category: "solid" as const 
  },
  { 
    id: "corten", 
    name: "Aço Corten", 
    hexCode: "#844d36", 
    finishImage: "/images/finishes/esquadria-corten.png",
    profileImage: "/images/profiles/perfil-corten.png",
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
        finishImage: "/images/finishes/esquadria-preto.png",
        profileImage: "/images/profiles/perfil-preto.png",
        category: "solid" as const 
      },
      { 
        id: "acm-white", 
        name: "Branco", 
        hexCode: "#ffffff", 
        finishImage: "/images/finishes/esquadria-branco.png",
        profileImage: "/images/profiles/perfil-branco.png",
        category: "solid" as const 
      },
      { 
        id: "acm-corten", 
        name: "Aço Corten", 
        hexCode: "#844d36", 
        finishImage: "/images/finishes/esquadria-corten.png",
        profileImage: "/images/profiles/perfil-corten.png",
        category: "solid" as const 
      },
    ],
    solidColors: [
      { 
        id: "acm-black", 
        name: "Preto", 
        hexCode: "#1a1a1a", 
        finishImage: "/images/finishes/esquadria-preto.png",
        profileImage: "/images/profiles/perfil-preto.png",
        category: "solid" as const 
      },
      { 
        id: "acm-white", 
        name: "Branco", 
        hexCode: "#ffffff", 
        finishImage: "/images/finishes/esquadria-branco.png",
        profileImage: "/images/profiles/perfil-branco.png",
        category: "solid" as const 
      },
      { 
        id: "acm-corten", 
        name: "Aço Corten", 
        hexCode: "#844d36", 
        finishImage: "/images/finishes/esquadria-corten.png",
        profileImage: "/images/profiles/perfil-corten.png",
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

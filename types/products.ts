export interface Color {
  id: string;
  name: string;
  hexCode?: string; // Mantém funcionando seus amadeirados
  image?: string;   // Usado para as amostras nos campos arredondados
  finishImage?: string; // Imagem da esquadria completa (acabamento)
  profileImage?: string; // Imagem do perfil técnico
  category: 'solid' | 'wood';
}

export interface ProductLineConfig {
  id: string;
  name: string;
  displayName: string;
  description: string;
  colors: Color[];
  solidColors: Color[];
  hasBonus: boolean;
  bonusTitle?: string;
  bonusDescription?: string;
}

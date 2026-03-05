# 🏗️ Laboratório Site Realiza - Simulador de Acabamentos

Laboratório de desenvolvimento e simulador interativo de acabamentos para a Realiza Esquadrias. Este projeto Next.js permite a visualização dinâmica de perfis de alumínio e ambientes em tempo real, abrangendo catálogos de cores sólidas e texturas amadeiradas. Desenvolvido com foco em UI/UX moderna, utiliza Tailwind CSS para estilização e Framer Motion para animações fluidas, servindo como base tecnológica para a evolução digital da marca.

## 🚀 Como Configurar as Imagens

O sistema busca as imagens automaticamente com base no **ID da cor**. Para adicionar ou alterar imagens, siga estas regras:

### 1. Localização das Pastas
As imagens devem ser salvas dentro da pasta `public`:
- **Ambientes (Acabamentos):** `public/images/finishes/`
- **Perfis Técnicos:** `public/images/profiles/`

### 2. Nomenclatura dos Arquivos
O nome do arquivo deve ser **exatamente igual ao ID** definido no arquivo `lib/colors.ts`, em minúsculo e com a extensão `.png`.

**Exemplos:**
- Cor Branco (ID: `branco`) -> `branco.png`
- Cor Aço Corten (ID: `aco-corten`) -> `aco-corten.png`
- Cor Carvalho Natural (ID: `carvalho-natural`) -> `carvalho-natural.png`

### 3. Lógica de Carregamento (Código de Seleção)
O código utiliza uma lógica de "Fallback" (Plano B). Ele tenta carregar a imagem local primeiro; se não encontrar, carrega uma imagem temporária da internet para evitar erros visuais.

**Código implementado no componente:**
```tsx
<Image 
  // Tenta carregar o arquivo local do seu GitHub
  src={`/images/finishes/${selectedColorId}.png`} 
  alt="Preview"
  fill
  onError={(e) => {
    // Se o arquivo local não existir, carrega o Plano B (Picsum)
    const target = e.target as HTMLImageElement;
    target.src = `https://picsum.photos/seed/finish-${selectedColorId}/800/450`;
  }}
/>
```

---

## 🎨 Adicionando Novas Cores
Para adicionar uma nova cor ao catálogo:
1. Abra o arquivo `lib/colors.ts`.
2. Adicione um novo objeto à lista `colors` (ex: `{ id: 'nova-cor', name: 'Nova Cor', hex: '#000000', type: 'solid' }`).
3. Salve as imagens `nova-cor.png` nas pastas correspondentes dentro de `public/images/`.

---

## 🛠️ Tecnologias Utilizadas
- **Framework:** Next.js 15 (App Router)
- **Estilização:** Tailwind CSS
- **Animações:** Framer Motion
- **Ícones:** Lucide React

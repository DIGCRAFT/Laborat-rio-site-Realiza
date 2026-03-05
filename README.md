# 🏗️ Laboratório Site Realiza - Simulador de Acabamentos

Laboratório de desenvolvimento e simulador interativo de acabamentos para a Realiza Esquadrias. Este projeto Next.js permite a visualização dinâmica de perfis de alumínio e ambientes em tempo real, abrangendo catálogos de cores sólidas e texturas amadeiradas. Desenvolvido com foco em UI/UX moderna, utiliza Tailwind CSS para estilização e Framer Motion para animações fluidas, servindo como base tecnológica para a evolução digital da marca.

---

## 🚀 Como levar para o seu Projeto Real (`realiza-frontend-client`)

Como você quer usar apenas as **Cores Sólidas** no site oficial, siga este passo a passo:

1.  **Copie o arquivo:** Pegue o código de `components/ColorSimulator.tsx` e crie um arquivo igual na pasta `src/components/` do seu projeto real.
2.  **Copie as pastas de imagens:** Leve a pasta `public/images/` para dentro da `public/` do seu projeto real.
3.  **Use o componente assim:** No seu site real, onde você quiser que o simulador apareça, use este código:

```tsx
import ColorSimulator from '@/components/ColorSimulator';

// Chamando apenas as cores sólidas:
<ColorSimulator showWoodColors={false} />
```

---

## 📘 Guia de Configuração de Imagens e Deploy (GitHub)

Este guia garante que a estrutura de imagens funcione perfeitamente no site oficial e no GitHub.

### 1. Estrutura de Pastas no Projeto
As imagens devem ser colocadas obrigatoriamente dentro da pasta `public`. O Next.js serve automaticamente qualquer arquivo nesta pasta na raiz do site.

**Caminhos exatos:**
- **Imagens de Ambiente (Acabamentos):** `public/images/finishes/`
- **Imagens de Perfis Técnicos:** `public/images/profiles/`

### 2. Regra de Nomenclatura (Crucial)
O código do simulador busca as imagens dinamicamente usando o ID da cor. O nome do arquivo deve ser **exatamente igual ao ID** definido no arquivo `lib/colors.ts`, tudo em minúsculo e com a extensão `.png`.

**Exemplos de Nomes:**
- Se o ID for `aco-corten`, o arquivo deve ser: `aco-corten.png`
- Lista de IDs atuais: `branco.png`, `preto.png`, `aco-corten.png`, `sand-ash.png`, `carvalho-claro.png`, `ebano.png`, etc.

### 3. Como Subir para o GitHub Oficial
1. **No seu computador:** Certifique-se de que as imagens estão nas pastas corretas mencionadas acima.
2. **Commit:** Adicione os arquivos ao seu commit (ex: `git add .`).
3. **Push:** Envie para o GitHub (`git push origin main`).
4. **Verificação:** No GitHub, navegue até a pasta `public/images/` para confirmar que os arquivos `.png` estão lá.

### 4. Como o Código Gerencia as Imagens (Lógica Técnica)
O código foi escrito com um sistema de **"Plano B" (Fallback)** para garantir que o site nunca fique com imagens quebradas:

```tsx
<Image 
  // 1. Tenta carregar o arquivo local (O que você subirá no GitHub)
  src={`/images/finishes/${selectedColorId}.png`} 
  
  onError={(e) => {
    // 2. Se o arquivo local NÃO existir (Erro 404), 
    // ele carrega automaticamente uma imagem do Picsum como plano de fundo.
    const target = e.target as HTMLImageElement;
    target.src = `https://picsum.photos/seed/finish-${selectedColorId}/800/450`;
  }}
/>
```

---

## 🛠️ Como adicionar novas cores no futuro?

Se a empresa lançar uma cor nova (ex: "Verde Militar"), basta seguir estes passos:

1.  **Adicionar no Código:** Abra o arquivo `ColorSimulator.tsx` (ou `lib/colors.ts`) e adicione uma linha na lista `COLORS`:
    ```ts
    { id: 'verde-militar', name: 'Verde Militar', hex: '#4B5320', type: 'solid' },
    ```
2.  **Subir Imagem:** Salve o arquivo `verde-militar.png` na pasta de imagens (`finishes` e `profiles`) e pronto!

### 💡 Raciocínio para o Futuro (Amadeirados)
Deixei a estrutura dos amadeirados pronta. Se você quiser testar uma imagem real de madeira:
- Suba o arquivo (ex: `carvalho.png`) para `/public/images/finishes/`.
- O simulador vai reconhecer e mostrar essa foto real no lugar da imagem genérica.
- **Dica de Ouro:** Sempre use arquivos `.png` com fundo transparente para os perfis técnicos (`profiles`) e fotos de alta qualidade (800x450px) para os ambientes (`finishes`).

---

## 🛠️ Tecnologias Utilizadas
- **Framework:** Next.js 15 (App Router)
- **Estilização:** Tailwind CSS
- **Animações:** Framer Motion
- **Ícones:** Lucide React
- **Tipografia:** Inter & Playfair Display

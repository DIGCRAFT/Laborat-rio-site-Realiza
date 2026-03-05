import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Realiza Esquadrias | Simulador de Cores e Orçamento',
  description: 'Simulador de cores para esquadrias de alumínio e solicitação de orçamento personalizado. Realiza Esquadrias - Soluções em Alumínio e Vidro.',
  keywords: ['esquadrias de alumínio', 'simulador de cores', 'orçamento esquadrias', 'Realiza Esquadrias', 'arquitetura', 'reforma', 'construção'],
  authors: [{ name: 'Realiza Esquadrias' }],
  openGraph: {
    title: 'Realiza Esquadrias | Simulador de Cores',
    description: 'Visualize as cores das suas esquadrias em tempo real e peça seu orçamento.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Realiza Esquadrias',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#F8F9FA] text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}

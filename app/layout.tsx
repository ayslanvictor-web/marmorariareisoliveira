import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Marmoraria Reis Oliveira | Mármores e Granitos em Mauá', description: 'Seu sonho moldado em pedra. Mármores e granitos sob medida para cozinhas, banheiros e áreas gourmet em Mauá, Grande ABC e São Paulo. (11) 93299-2410.', icons: {icon:'/images/logo-reis-oliveira.jpg'} };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {return <html lang="pt-BR"><body>{children}</body></html>;}

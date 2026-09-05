export const tones = [
  {
    id: 'all',
    label: 'Todas',
    color: 'conic-gradient(#e7e1d3,#766757,#1d2429,#d8dcdd,#e7e1d3)',
  },
  { id: 'white', label: 'Branco', color: '#f1f0eb' },
  { id: 'offwhite', label: 'Off-white', color: '#e8e3d7' },
  { id: 'beige', label: 'Bege', color: '#cabb9d' },
  { id: 'cream', label: 'Creme', color: '#e5d6b4' },
  { id: 'lightgray', label: 'Cinza claro', color: '#b7bdbe' },
  { id: 'darkgray', label: 'Cinza escuro', color: '#555c62' },
  { id: 'black', label: 'Preto', color: '#1c2226' },
  { id: 'brown', label: 'Marrom', color: '#78604a' },
  { id: 'earth', label: 'Terrosos', color: '#a48864' },
  { id: 'natural', label: 'Naturais', color: '#b8b4a3' },
];
export const stones = [
  {
    id: 'marble-white',
    name: 'Mármore · claros',
    family: 'Mármore',
    colors: ['white', 'offwhite'],
    tone: 'Branco e off-white',
    tint: '#eeeae0',
    finish: 'Polido',
    texture: 'Veios orgânicos',
    ideas: ['Paredes', 'Lavabos', 'Bancadas'],
    photo: 'marble-albedo.webp',
    application: 'inspiracao-banheiro.webp',
    description:
      'Uma referência de superfície clara, com veios que desenham o ambiente.',
  },
  {
    id: 'marble-warm',
    name: 'Mármore · quentes',
    family: 'Mármore',
    colors: ['beige', 'cream', 'earth'],
    tone: 'Bege, creme e terrosos',
    tint: '#cbb78e',
    finish: 'Acetinado',
    texture: 'Veios suaves',
    ideas: ['Banheiros', 'Paredes', 'Lavabos'],
    photo: 'marble-albedo.webp',
    application: 'inspiracao-banheiro.webp',
    description:
      'Tonalidades acolhedoras para explorar composições com madeira e luz natural.',
  },
  {
    id: 'marble-gray',
    name: 'Mármore · cinzas',
    family: 'Mármore',
    colors: ['lightgray', 'darkgray', 'natural'],
    tone: 'Cinzas e naturais',
    tint: '#939c9c',
    finish: 'Polido',
    texture: 'Veios contrastantes',
    ideas: ['Paredes', 'Lavabos', 'Bancadas'],
    photo: 'marble-albedo.webp',
    application: 'cozinha-essenza.webp',
    description:
      'Uma direção visual sóbria, com contrastes que valorizam o desenho da pedra.',
  },
  {
    id: 'granite-light',
    name: 'Granito · claros',
    family: 'Granito',
    colors: ['white', 'lightgray', 'offwhite'],
    tone: 'Branco, off-white e cinza claro',
    tint: '#c9cdcb',
    finish: 'Polido',
    texture: 'Granulação aparente',
    ideas: ['Cozinhas', 'Bancadas', 'Áreas gourmet'],
    photo: 'detalhe-granito.webp',
    application: 'cozinha-reis-oliveira.jpg',
    description:
      'Uma referência de granulação clara para conversar sobre as opções do seu projeto.',
  },
  {
    id: 'granite-dark',
    name: 'Granito · escuros',
    family: 'Granito',
    colors: ['black', 'darkgray'],
    tone: 'Preto e cinza escuro',
    tint: '#343b40',
    finish: 'Polido',
    texture: 'Granulação discreta',
    ideas: ['Cozinhas', 'Bancadas', 'Lavabos'],
    photo: 'detalhe-granito.webp',
    application: 'inspiracao-cozinha.webp',
    description:
      'Tons profundos para destacar volumes, bordas e o encontro entre materiais.',
  },
  {
    id: 'granite-earth',
    name: 'Granito · terrosos',
    family: 'Granito',
    colors: ['brown', 'earth', 'beige', 'natural'],
    tone: 'Marrom, bege e naturais',
    tint: '#a48968',
    finish: 'Acetinado',
    texture: 'Granulação expressiva',
    ideas: ['Áreas gourmet', 'Bancadas', 'Paredes'],
    photo: 'detalhe-granito.webp',
    application: 'inspiracao-cozinha.webp',
    description:
      'Uma paleta de inspiração natural para encontrar a composição desejada com a equipe.',
  },
];
export function filterStones(
  items,
  { color = 'all', family = 'all', finish = 'all' } = {},
) {
  return items.filter(
    (item) =>
      (color === 'all' || item.colors.includes(color)) &&
      (family === 'all' || item.family === family) &&
      (finish === 'all' || item.finish === finish),
  );
}
export function inquiryUrl(item) {
  const text = item
    ? `Olá! Gostaria de consultar opções de ${item.family.toLowerCase()} em ${item.tone.toLowerCase()}, com acabamento ${item.finish.toLowerCase()}. Vi a referência ${item.name} no site. Podem confirmar disponibilidade e aplicação para meu projeto?`
    : 'Olá! Gostaria de conhecer as opções de pedras, cores e acabamentos disponíveis.';
  return `https://wa.me/5511932992410?text=${encodeURIComponent(text)}`;
}

'use client';
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';
import { ImageGallery } from './ImageGallery';
import { tones, stones, filterStones, inquiryUrl } from '../lib/stone-catalog';
import {
  ArrowUpRight,
  SlidersHorizontal,
  ZoomIn,
  RotateCcw,
} from 'lucide-react';
export default function MaterialCatalog() {
  const [color, setColor] = useState('all'),
    [family, setFamily] = useState('all'),
    [finish, setFinish] = useState('all');
  const results = filterStones(stones, { color, family, finish });
  const reset = () => {
    setColor('all');
    setFamily('all');
    setFinish('all');
  };
  return (
    <div className="interactive-catalog">
      <div className="catalog-intro">
        <p className="eyebrow">ENCONTRE A SUA PALETA</p>
        <h3>
          Comece pela cor.
          <br />
          <em>Explore as possibilidades.</em>
        </h3>
        <p>
          Referências visuais de mármore e granito para orientar sua conversa.
          Nomes comerciais, cores, acabamentos e disponibilidade devem ser
          confirmados com a equipe.
        </p>
      </div>
      <fieldset className="color-field">
        <legend>1. Escolha uma tonalidade</legend>
        <ToggleGroup
          value={[color]}
          onValueChange={(v) => v.length && setColor(v[0])}
          className="color-swatches"
          aria-label="Filtrar referências por cor"
        >
          {tones.map((t) => (
            <ToggleGroupItem value={t.id} key={t.id} className="color-option">
              <span style={{ background: t.color }} aria-hidden="true" />
              <span>{t.label}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </fieldset>
      <div className="catalog-filters">
        <SlidersHorizontal size={18} aria-hidden="true" />
        <label>
          <span>2. Pedra</span>
          <Select value={family} onValueChange={(v) => setFamily(v || 'all')}>
            <SelectTrigger aria-label="Tipo de pedra">
              <SelectValue>
                {family === 'all' ? 'Todas as pedras' : family}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as pedras</SelectItem>
              <SelectItem value="Mármore">Mármore</SelectItem>
              <SelectItem value="Granito">Granito</SelectItem>
            </SelectContent>
          </Select>
        </label>
        <label>
          <span>3. Acabamento de referência</span>
          <Select value={finish} onValueChange={(v) => setFinish(v || 'all')}>
            <SelectTrigger aria-label="Acabamento de referência">
              <SelectValue>
                {finish === 'all' ? 'Todos os acabamentos' : finish}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os acabamentos</SelectItem>
              <SelectItem value="Polido">Polido</SelectItem>
              <SelectItem value="Acetinado">Acetinado</SelectItem>
            </SelectContent>
          </Select>
        </label>
        <button className="quiet-button" onClick={reset}>
          <RotateCcw size={16} /> Limpar filtros
        </button>
      </div>
      <p className="catalog-count" role="status">
        {results.length}{' '}
        {results.length === 1
          ? 'referência encontrada'
          : 'referências encontradas'}
        {color !== 'all'
          ? ` · ${tones.find((t) => t.id === color)?.label}`
          : ''}
      </p>
      {results.length ? (
        <div className="catalog-grid">
          {results.map((item) => (
            <article className="catalog-card premium-card" key={item.id}>
              <ImageGallery
                title={item.name}
                description="Imagens ilustrativas e aplicações de inspiração. Não representam uma chapa específica nem confirmam disponibilidade."
                images={[
                  {
                    src: `/images/${item.photo}`,
                    alt: `Textura ilustrativa de ${item.family.toLowerCase()}`,
                    label: 'Textura de referência',
                  },
                  {
                    src: `/images/${item.application}`,
                    alt: 'Ambiente de inspiração para observar a aplicação da pedra',
                    label: 'Aplicação de inspiração',
                  },
                  {
                    src: '/images/detalhe-granito.webp',
                    alt: 'Detalhe ilustrativo de uma borda de granito em perspectiva',
                    label: 'Referência de borda em granito',
                  },
                ]}
                link={inquiryUrl(item)}
                linkLabel="Consultar esta referência"
              >
                <div
                  className={`catalog-texture ${item.finish === 'Polido' ? 'polished' : 'satin'}`}
                  style={{ '--stone-tint': item.tint }}
                >
                  <img
                    src={`/images/${item.photo}`}
                    alt={`Simulação de paleta: ${item.tone}`}
                    width="720"
                    height="480"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="texture-badge">SIMULAÇÃO DE TONALIDADE</span>
                  <span className="texture-action">
                    <ZoomIn size={18} /> Ver textura e aplicações
                  </span>
                </div>
              </ImageGallery>
              <div className="catalog-card-body">
                <p className="catalog-family">{item.family} · Sob consulta</p>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <dl>
                  <div>
                    <dt>Tonalidade</dt>
                    <dd>{item.tone}</dd>
                  </div>
                  <div>
                    <dt>Acabamento de referência</dt>
                    <dd>{item.finish}</dd>
                  </div>
                  <div>
                    <dt>Textura de referência</dt>
                    <dd>{item.texture}</dd>
                  </div>
                </dl>
                <div
                  className="application-tags"
                  aria-label="Ideias de aplicação a confirmar"
                >
                  {item.ideas.map((a) => (
                    <span key={a}>{a}</span>
                  ))}
                </div>
                <a
                  className="catalog-inquiry"
                  href={inquiryUrl(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar opções nesta paleta
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <h4>Nenhuma referência nesta combinação.</h4>
          <p>
            Experimente outra cor ou consulte a equipe para encontrar outras
            possibilidades.
          </p>
          <button className="button" onClick={reset}>
            Mostrar todas as referências
          </button>
        </div>
      )}
      <p className="catalog-disclaimer">
        Amostras e ambientes ilustrativos. As aplicações e o acabamento adequado
        dependem da pedra, da peça e do uso; confirme com a equipe antes da
        escolha.
      </p>
    </div>
  );
}

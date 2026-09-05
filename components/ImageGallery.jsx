'use client';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './ui/carousel';
import { ZoomIn, ZoomOut, X, ArrowUpRight } from 'lucide-react';
export function ImageGallery({
  images,
  title,
  children,
  description,
  link,
  linkLabel = 'Ver publicação original',
}) {
  const [api, setApi] = useState(null),
    [index, setIndex] = useState(0),
    [zoom, setZoom] = useState(false),
    [open, setOpen] = useState(false);
  useEffect(() => {
    if (!api) return;
    const update = () => {
      setIndex(api.selectedScrollSnap());
      setZoom(false);
    };
    api.on('select', update);
    update();
    return () => api.off('select', update);
  }, [api]);
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        setZoom(false);
        setIndex(0);
      }}
    >
      <DialogTrigger className="gallery-trigger">{children}</DialogTrigger>
      <DialogContent className="stone-dialog" showCloseButton={false}>
        <div className="gallery-heading">
          <div>
            <DialogTitle className="gallery-title">{title}</DialogTitle>
            <DialogDescription>
              {description ||
                'Explore as imagens e amplie para observar os detalhes.'}
            </DialogDescription>
          </div>
          <DialogClose className="gallery-close" aria-label="Fechar galeria">
            <X size={21} />
          </DialogClose>
        </div>
        <Carousel
          key={String(open)}
          opts={{ loop: images.length > 1, watchDrag: !zoom }}
          setApi={setApi}
          className="large-gallery"
          aria-label={`Galeria de ${title}`}
        >
          <CarouselContent>
            {images.map((im, i) => (
              <CarouselItem key={im.src + i}>
                <div
                  className={`gallery-image-scroll ${zoom && i === index ? 'is-zoomed' : ''}`}
                  tabIndex={zoom ? 0 : -1}
                  aria-label="Imagem; quando ampliada, role para explorar"
                >
                  <img
                    src={im.src}
                    alt={im.alt}
                    width="1400"
                    height="1000"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious
                className="gallery-prev"
                aria-label="Imagem anterior"
              />
              <CarouselNext
                className="gallery-next"
                aria-label="Próxima imagem"
              />
            </>
          )}
        </Carousel>
        <div className="gallery-meta">
          <p aria-live="polite">
            {index + 1} / {images.length} · {images[index]?.label}
          </p>
          <button
            className="quiet-button"
            onClick={() => setZoom((v) => !v)}
            aria-pressed={zoom}
          >
            {zoom ? <ZoomOut size={17} /> : <ZoomIn size={17} />}{' '}
            {zoom ? 'Reduzir' : 'Ampliar'}
          </button>
        </div>
        <div className="gallery-thumbs" aria-label="Escolher imagem">
          {images.map((im, i) => (
            <button
              key={im.src + i}
              onClick={() => {
                api?.scrollTo(i);
                setZoom(false);
              }}
              aria-label={`Ver imagem ${i + 1}: ${im.label}`}
              aria-pressed={i === index}
            >
              <img src={im.src} alt="" width="80" height="64" loading="lazy" />
            </button>
          ))}
        </div>
        {link && (
          <a
            className="text-link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkLabel}
            <ArrowUpRight size={16} />
          </a>
        )}
      </DialogContent>
    </Dialog>
  );
}
export default function ProjectGallery({ projects }) {
  const images = projects.map((p) => ({
    src: `/images/${p.img}-reis-oliveira.jpg`,
    alt: p.alt,
    label: p.name,
  }));
  return (
    <div className="project-grid">
      {projects.map((p, i) => (
        <article className="project-card premium-card" key={p.name}>
          <ImageGallery
            title={p.name}
            images={[...images.slice(i), ...images.slice(0, i)]}
            link={p.url}
            description="Trabalhos reais publicados pela Marmoraria Reis Oliveira."
          >
            <div className="project-cover">
              <img
                src={images[i].src}
                alt={p.alt}
                width="360"
                height="640"
                loading="lazy"
                decoding="async"
              />
              <span>
                <ZoomIn size={18} /> Ampliar e explorar{' '}
                <ArrowUpRight size={16} />
              </span>
            </div>
          </ImageGallery>
          <div className="material-title">
            <h3>{p.name}</h3>
          </div>
          <p>{p.detail}</p>
          <a
            className="project-original"
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver no Instagram ↗
          </a>
        </article>
      ))}
    </div>
  );
}


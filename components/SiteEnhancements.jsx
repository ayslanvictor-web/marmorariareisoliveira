'use client';
import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { inquiryUrl } from '../lib/stone-catalog';
export default function SiteEnhancements() {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;
    const cards = document.querySelectorAll('.premium-card');
    const handlers = [];
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      cards.forEach((card) => {
        const move = (e) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty(
            '--tilt-x',
            `${(-(e.clientY - r.top - r.height / 2) / r.height) * 3}deg`,
          );
          card.style.setProperty(
            '--tilt-y',
            `${((e.clientX - r.left - r.width / 2) / r.width) * 3}deg`,
          );
        };
        const reset = () => {
          card.style.setProperty('--tilt-x', '0deg');
          card.style.setProperty('--tilt-y', '0deg');
        };
        card.addEventListener('pointermove', move);
        card.addEventListener('pointerleave', reset);
        handlers.push(() => {
          card.removeEventListener('pointermove', move);
          card.removeEventListener('pointerleave', reset);
        });
      });
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('entered');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 },
    );
    document
      .querySelectorAll('.section-heading,.catalog-intro')
      .forEach((el) => {
        el.classList.add('gentle-entry');
        observer.observe(el);
      });
    return () => {
      observer.disconnect();
      handlers.forEach((fn) => fn());
      document
        .querySelectorAll('.gentle-entry')
        .forEach((el) => el.classList.remove('gentle-entry'));
    };
  }, []);
  return (
    <a
      className="floating-whatsapp"
      href={inquiryUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp sobre pedras, cores e acabamentos"
    >
      <MessageCircle size={24} />
      <span>Vamos conversar</span>
    </a>
  );
}

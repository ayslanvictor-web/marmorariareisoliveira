import ProjectGallery from '../components/ImageGallery';
import MaterialCatalog from '../components/MaterialCatalog';
import SiteEnhancements from '../components/SiteEnhancements';
import StoneJourney from '../components/StoneJourney';
import {
  ArrowUpRight,
  ArrowDown,
  Gem,
  Ruler,
  Layers3,
  Camera as Instagram,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
} from 'lucide-react';
const whatsapp =
  'https://wa.me/5511932992410?text=Ol%C3%A1%21%20Gostaria%20de%20um%20or%C3%A7amento%20para%20meu%20projeto.';
const instagram = 'https://www.instagram.com/marmorariareisoliveira/';
const maps =
  'https://www.google.com/maps/search/?api=1&query=Marmoraria%20Reis%20Oliveira%20Estr.%20Mau%C3%A1%20e%20Adutora%20Rio%20Claro%2C%20730B%20-%20Jardim%20Paranavai%2C%20Mau%C3%A1%20-%20SP%2C%2009390-500';
const projects = [
  {
    name: 'Cozinhas',
    detail: 'Bancadas para a vida acontecer.',
    img: 'cozinha',
    alt: 'Bancada clara com pia e cooktop em cozinha revestida de verde',
    url: 'https://www.instagram.com/marmorariareisoliveira/reel/DczLAc2vXMF/',
  },
  {
    name: 'Escadas',
    detail: 'Presença em cada degrau.',
    img: 'escada',
    alt: 'Escada em pedra clara com veios e iluminação lateral',
    url: 'https://www.instagram.com/marmorariareisoliveira/reel/DPhhL4njc78/',
  },
  {
    name: 'Banheiros e lavabos',
    detail: 'O cuidado está nos detalhes.',
    img: 'lavabo',
    alt: 'Bancada preta com cuba escura e borda dourada em lavabo',
    url: 'https://www.instagram.com/marmorariareisoliveira/reel/DaVX5sjxlrY/',
  },
];
function Brand() {
  return (
    <a
      href="#conteudo"
      className="brand"
      aria-label="Marmoraria Reis Oliveira início"
    >
      <img src="/images/logo-reis-oliveira.jpg" width="56" height="56" alt="" />
      <span>
        REIS OLIVEIRA<small>MARMORARIA</small>
      </span>
    </a>
  );
}
export default function Home() {
  return (
    <main className="journey-site">
      <StoneJourney />
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="header">
        <Brand />
        <nav aria-label="Navegação principal">
          <a href="#essencia">Sobre nós</a>
          <a href="#projetos">Projetos</a>
          <a href="#materiais">Materiais</a>
          <a href="#contato">Contato</a>
        </nav>
        <a
          className="header-cta"
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pedir orçamento <ArrowUpRight size={17} />
        </a>
      </header>
      <section className="hero" id="conteudo">
        <div className="hero-content">
          <p className="eyebrow">
            <span /> MARMORARIA EM MAUÁ · GRANDE ABC
          </p>
          <h1>
            Seu sonho
            <br />
            moldado em <em>pedra.</em>
          </h1>
          <p className="hero-description">
            Mármores e granitos sob medida para cozinhas,
            <br className="desktop" /> banheiros e áreas gourmet. Do projeto ao
            acabamento.
          </p>
          <div className="hero-actions">
            <a
              className="button"
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar orçamento <ArrowUpRight size={20} />
            </a>
            <a className="text-link" href="#projetos">
              Conheça nossos projetos <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#essencia">
            <ArrowDown size={16} /> CONHEÇA A REIS OLIVEIRA
          </a>
          <span>ROLE PARA EXPLORAR</span>
        </div>
      </section>
      <section id="essencia" className="intro section">
        <div>
          <p className="eyebrow">A NOSSA HISTÓRIA</p>
          <p className="experience">
            <strong>5+</strong>
            <span>
              anos realizando
              <br />
              projetos exclusivos
            </span>
          </p>
        </div>
        <div>
          <h2>
            Cada pedra é única.
            <br />
            <em>Seu espaço também.</em>
          </h2>
          <p>
            Somos a Marmoraria Reis Oliveira, em Mauá, no Grande ABC. Há mais de
            cinco anos, damos forma a projetos para cozinhas, banheiros e áreas
            gourmet, com atendimento personalizado e atenção ao acabamento.
          </p>
          <p>
            Da medição à instalação, acompanhamos a transformação da pedra em
            peças feitas para o seu ambiente. Atendemos a Grande São Paulo e o
            interior.
          </p>
        </div>
        <div className="values">
          <span>
            <Gem />
            Mármores e granitos
          </span>
          <span>
            <Ruler />
            Medição e projeto
          </span>
          <span>
            <Layers3 />
            Acabamento e instalação
          </span>
        </div>
      </section>
      <section id="projetos" className="section real-projects">
        <div className="section-heading">
          <div>
            <p className="eyebrow">DO NOSSO INSTAGRAM PARA A SUA INSPIRAÇÃO</p>
            <h2>
              Projetos reais.
              <br />
              <em>Detalhes que fazem a diferença.</em>
            </h2>
          </div>
          <a
            className="text-link"
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={18} /> Veja no Instagram <ArrowUpRight size={18} />
          </a>
        </div>
        <ProjectGallery projects={projects} />
        <p className="project-credit">
          Imagens de trabalhos publicados por @marmorariareisoliveira.
        </p>
      </section>
      <section id="materiais" className="materials section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MATERIAIS & POSSIBILIDADES</p>
            <h2>
              A pedra certa para
              <br />
              <em>o seu jeito de viver.</em>
            </h2>
          </div>
          <p>
            Escolha o material com a nossa equipe.
            <br />
            Cada ambiente pede um cuidado.
          </p>
        </div>
        <div className="material-grid">
          <article className="material">
            <div className="stone marble" aria-hidden="true">
              <span>01</span>
            </div>
            <div className="material-title">
              <h3>Mármore</h3>
            </div>
            <p>
              Veios singulares e uma presença marcante para valorizar o seu
              ambiente.
            </p>
          </article>
          <article className="material">
            <div className="stone granite" aria-hidden="true">
              <span>02</span>
            </div>
            <div className="material-title">
              <h3>Granito</h3>
            </div>
            <p>
              Versatilidade para bancadas, pias, escadas e outros elementos do
              projeto.
            </p>
          </article>
        </div>
        <p className="material-note">
          Texturas ilustrativas. Tons e veios variam conforme a peça; consulte
          as amostras disponíveis.
        </p>
        <MaterialCatalog />
        <div className="service-line">
          <span>Pias e bancadas</span>
          <span>Áreas gourmet</span>
          <span>Escadas</span>
          <span>Soleiras e pingadeiras</span>
          <span>Revestimentos</span>
        </div>
      </section>
      <section id="contato" className="contact section">
        <div className="contact-intro">
          <p className="eyebrow">VAMOS COMEÇAR O SEU PROJETO</p>
          <h2>
            Uma conversa.
            <br />
            <em>Novas possibilidades.</em>
          </h2>
          <p>
            Envie suas referências e medidas aproximadas. Nossa equipe ajuda
            você a encontrar a solução para o seu espaço.
          </p>
          <a
            className="button"
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} /> Orçamento pelo WhatsApp{' '}
            <ArrowUpRight size={19} />
          </a>
          <div className="contact-links">
            <a href="tel:+5511932992410">
              <Phone size={17} />
              (11) 93299-2410
            </a>
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <Instagram size={17} />
              @marmorariareisoliveira
            </a>
            <a href="mailto:marmorariareisoliveira@gmail.com">
              marmorariareisoliveira@gmail.com
            </a>
          </div>
        </div>
        <div className="visit">
          <div>
            <p className="eyebrow">
              <MapPin size={17} /> VENHA NOS CONHECER
            </p>
            <address>
              Estr. Mauá e Adutora Rio Claro, 730B
              <br />
              Jardim Paranavai · Mauá – SP
              <br />
              CEP 09390-500
            </address>
            <a
              className="text-link"
              href={maps}
              target="_blank"
              rel="noopener noreferrer"
            >
              Como chegar <ArrowUpRight size={18} />
            </a>
          </div>
          <div>
            <p className="eyebrow">
              <Clock size={17} /> HORÁRIOS DE ATENDIMENTO
            </p>
            <dl>
              <div>
                <dt>Segunda a sexta</dt>
                <dd>08:00 – 17:00</dd>
              </div>
              <div>
                <dt>Sábado</dt>
                <dd>08:00 – 13:00</dd>
              </div>
            </dl>
            <p className="hours-note">
              Em feriados, confirme o atendimento pelo WhatsApp.
            </p>
          </div>
        </div>
      </section>
      <footer>
        <Brand />
        <p>Seu sonho moldado em pedra.</p>
        <a href="#conteudo">Voltar ao topo ↑</a>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Marmoraria Reis Oliveira.</span>
          <span>Mauá · Grande ABC · São Paulo</span>
        </div>
      </footer>
      <SiteEnhancements />
    </main>
  );
}

import ExperienceStats from "./ExperienceStats";
import FAQAccordion from "./FAQAccordion";
import HeaderScrollState from "./HeaderScrollState";
import MobileMenu from "./MobileMenu";
import SectionNavigation from "./SectionNavigationController";
import WhatsAppFloat from "./WhatsAppFloat";

const WHATSAPP_NUMBER = "5521970580095";

function whatsapp(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type IconName =
  | "arrow"
  | "calendar"
  | "calendar-check"
  | "check"
  | "clock"
  | "depilation"
  | "eyebrow"
  | "heart"
  | "instagram"
  | "manicure"
  | "menu"
  | "neighborhood"
  | "pedicure"
  | "pin"
  | "shield"
  | "spa"
  | "sparkle"
  | "therapy"
  | "whatsapp";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h13"/><path d="m14 7 5 5-5 5"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
    "calendar-check": <><path d="M8 2v4M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></>,
    check: <path d="m5 12 4.2 4.2L19 7"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></>,
    depilation: <><path d="M2 16v1.4a3 3 0 0 0 6 0V16M9 16v1.4a3 3 0 0 0 6 0V16M16 16v1.4a3 3 0 0 0 6 0V16"/><path d="M5 16v-4.1c0-3.3.9-6.3 2.8-8.7M12 16v-5.1c0-3.6 1.1-6.5 3.4-8.6M19 16v-4.3c0-3 .8-5.5 2.3-7.5"/><circle cx="5" cy="17.4" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="17.4" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="17.4" r="1" fill="currentColor" stroke="none"/></>,
    eyebrow: <><path d="M3 7.7C7.8 4.4 14.7 3.8 21 7"/><path d="M3.5 13s3.2-3.8 8.5-3.8 8.5 3.8 8.5 3.8-3.2 4.1-8.5 4.1S3.5 13 3.5 13Z"/><circle cx="12" cy="13" r="2.4"/><path d="m5.2 10.9-1.5-1.2M7.4 9.7l-1-1.6M18.8 10.9l1.5-1.2M16.6 9.7l1-1.6M6.1 16.1l-1.2 1.2M8.6 17.1 8 18.7M17.9 16.1l1.2 1.2M15.4 17.1l.6 1.6"/></>,
    heart: <path d="M12 20.5S4 15 4 9.4A4.4 4.4 0 0 1 12 6.6a4.4 4.4 0 0 1 8 2.8c0 5.6-8 11.1-8 11.1Z"/>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></>,
    manicure: <><path d="M3.5 21v-4.2c0-1.7.9-2.8 2.2-2.8s2.2 1.1 2.2 2.8V21M7.9 21v-7c0-1.9 1-3.2 2.5-3.2s2.5 1.3 2.5 3.2v7M12.9 21v-4.7c0-1.7.9-2.8 2.2-2.8s2.2 1.1 2.2 2.8V21"/><path d="M9.3 15.4v-1.3c0-1 .4-1.7 1.1-1.7s1.1.7 1.1 1.7v1.8"/><path d="m16.5 2.5 4.8 4.8-2.2 2.2-4.8-4.8 2.2-2.2Z"/><path d="m15.2 5.6-3.5 3.5-.5 1.8 1.8-.5 3.5-3.5M20.5 11.3v2.2M19.4 12.4h2.2"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    neighborhood: <><path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><path d="m8.4 10.6 3.6-3 3.6 3v4.2H8.4v-4.2Z"/><path d="M10.8 14.8v-2.7h2.4v2.7"/></>,
    pedicure: <><path d="M12.7 21c-2.7.1-4.8-1.5-5-3.8-.1-1.7.9-2.8 1.9-4.1 1.1-1.4 1.2-3 1.3-4.8.1-2.2.8-4.5 2.8-4.7 2.2-.2 3.4 2.4 3.6 5.5.2 3.1-.3 6.7-1.5 9.2-.7 1.5-1.7 2.6-3.1 2.7Z"/><path d="M12.7 7c.1-1.2.5-2 1.2-2 .8-.1 1.3.8 1.4 2.1"/><path d="m19 2 3 3-1.7 1.7-3-3L19 2Z"/><path d="m18.2 5.2-2.7 2.7-.5 1.6 1.6-.5 2.7-2.7"/></>,
    pin: <><path d="M12 21s7-6.7 7-12a7 7 0 1 0-14 0c0 5.3 7 12 7 12Z"/><circle cx="12" cy="9" r="2.3"/></>,
    shield: <><path d="M12 3 19 6v5c0 5-3.4 8.5-7 10-3.6-1.5-7-5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></>,
    spa: <><path d="M12 16.5c-3.2-2.7-4-7.2 0-12 4 4.8 3.2 9.3 0 12Z"/><path d="M10.7 14.7C8.3 11.6 5.4 10 2.8 10c-.1 4.6 3.4 8 9.2 9.4 5.8-1.4 9.3-4.8 9.2-9.4-2.6 0-5.5 1.6-7.9 4.7"/><path d="M8.2 17.9C6 17 4.4 15.2 3.5 12.7M15.8 17.9c2.2-.9 3.8-2.7 4.7-5.2M7 20.7h10"/></>,
    sparkle: <path d="m12 3 1.7 6.3L20 11l-6.3 1.7L12 19l-1.7-6.3L4 11l6.3-1.7L12 3Z"/>,
    therapy: <><path d="M12 18.5c-2.1.2-3.7-1.1-3.8-3-.1-1.4.8-2.3 1.6-3.4.9-1.2 1-2.5 1.1-4 .1-1.9.7-3.7 2.3-3.8 1.8-.1 2.8 1.8 2.9 4.3.1 2.4-.3 5.3-1.3 7.3-.6 1.3-1.5 2.4-2.8 2.6Z"/><circle cx="10.4" cy="4.2" r=".65"/><circle cx="11.6" cy="2.7" r=".6"/><circle cx="13.2" cy="2.3" r=".55"/><circle cx="14.8" cy="2.6" r=".5"/><path d="M2.2 13.8c2-.2 3.5.4 4.8 1.7l1.4 1.4M2.8 17.3c1.8-.1 3.3.6 4.5 2l.8 1M21.8 13.8c-2-.2-3.5.4-4.8 1.7l-1.4 1.4M21.2 17.3c-1.8-.1-3.3.6-4.5 2l-.8 1"/></>,
    whatsapp: (
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.892-9.884a9.82 9.82 0 0 1 7.021 2.91 9.83 9.83 0 0 1 2.897 7.028c-.002 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.79 11.79 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.14 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"
        fill="currentColor"
        stroke="none"
      />
    ),
  };

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function WhatsAppLogo() {
  return (
    <svg
      className="whatsapp-logo"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.892-9.884a9.82 9.82 0 0 1 7.021 2.91 9.83 9.83 0 0 1 2.897 7.028c-.002 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.79 11.79 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.14 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function InstagramLogo() {
  return (
    <svg className="instagram-logo" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

const services = [
  {
    number: "01",
    title: "Manicure",
    text: "Preparação, cuidado das cutículas, esmaltação e finalização para mãos bonitas e bem-cuidadas.",
    cta: "Agendar manicure",
    message: "Olá, Renata! Vim pelo site e gostaria de consultar os horários para manicure.",
  },
  {
    number: "02",
    title: "Pedicure",
    text: "Cuidado completo para as unhas dos pés, com atenção, esmaltação e acabamento delicado.",
    cta: "Agendar pedicure",
    message: "Olá, Renata! Vim pelo site e gostaria de consultar os horários para pedicure.",
  },
  {
    number: "03",
    title: "Spa dos Pés e Mãos",
    text: "Foco em tratamentos relaxantes, esfoliação profunda, hidratação intensiva e reflexologia.",
    cta: "Agendar spa",
    message: "Olá, Renata! Vim pelo site e gostaria de consultar os horários para Spa dos Pés e Mãos.",
  },
  {
    number: "04",
    title: "Terapia Podal",
    text: "Um cuidado completo para promover conforto, relaxamento e bem-estar aos pés. O procedimento combina higienização, esfoliação, hidratação profunda e massagem relaxante, ajudando a aliviar o cansaço e a melhorar o aspecto da pele.",
    cta: "Agendar terapia podal",
    message: "Olá, Renata! Vim pelo site e gostaria de consultar os horários para Terapia Podal.",
  },
  {
    number: "05",
    title: "Sobrancelhas",
    text: "Modelagem personalizada que valoriza o formato natural das sobrancelhas e harmoniza os traços do rosto. O procedimento é realizado com precisão e cuidado, proporcionando um olhar mais definido, equilibrado e expressivo.",
    cta: "Agendar sobrancelhas",
    message: "Olá, Renata! Vim pelo site e gostaria de consultar os horários para Sobrancelhas.",
  },
  {
    number: "06",
    title: "Depilação",
    text: "Remoção dos pelos com cuidado, higiene e atenção à sensibilidade de cada pele. O procedimento proporciona uma pele mais lisa, macia e bem cuidada, oferecendo conforto e praticidade para o dia a dia.",
    cta: "Agendar depilação",
    message: "Olá, Renata! Vim pelo site e gostaria de consultar os horários para Depilação.",
  },
];

const faqs = [
  {
    question: "Preciso agendar com antecedência?",
    answer: "Sim. Os atendimentos são realizados com hora marcada, de quarta a sábado, pela manhã, das 10h às 13h, e à tarde, das 14h às 19h. Consulte a agenda pelo WhatsApp para encontrar o melhor horário.",
  },
  {
    question: "Onde fica o atendimento?",
    answer: "Na Rua Araguaia, 1763, Loja E, Freguesia (Jacarepaguá), Rio de Janeiro — RJ, CEP 22745-271.",
  },
  {
    question: "Quais serviços estão disponíveis?",
    answer: "Manicure, pedicure, Spa dos Pés e Mãos, Terapia Podal, Sobrancelhas e Depilação. Se estiver em dúvida, fale com a Renata antes de agendar.",
  },
  {
    question: "Posso enviar uma foto de inspiração?",
    answer: "Sim. Envie sua referência pelo WhatsApp para conversar sobre a cor e o estilo desejados antes do atendimento.",
  },
  {
    question: "Como consulto valores e duração?",
    answer: "Os valores e o tempo estimado são informados pelo WhatsApp de acordo com o serviço escolhido. Assim, você recebe as informações corretas antes de confirmar.",
  },
  {
    question: "E se eu precisar remarcar?",
    answer: "Avise pelo WhatsApp com a maior antecedência possível. A Renata verificará outro horário disponível para você.",
  },
];

export default function Home() {
  const generalMessage = "Olá, Renata! Vim pelo site e gostaria de consultar os horários disponíveis para um atendimento.";
  const generalWhatsapp = whatsapp(generalMessage);
  const headerWhatsapp = whatsapp("Olá, Renata! Vim pelo site e gostaria de agendar um atendimento.");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Renata Dias — Nails Master",
    telephone: "+55 21 97058-0095",
    image: "/images/renata-dias-hero-agosto-2026.jpg",
    priceRange: "$$",
    sameAs: ["https://www.instagram.com/renatadiasnails"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Araguaia, 1763, Loja E",
      addressLocality: "Rio de Janeiro",
      addressRegion: "RJ",
      postalCode: "22745-271",
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "13:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "14:00",
        closes: "19:00",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SectionNavigation />

      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <header className="site-header is-at-hero" data-scroll-state="hero-top">
        <HeaderScrollState />
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="Renata Dias — início">
            <img
              className="brand-mark"
              src="/images/renata-dias-logo-transparent-2026.png"
              alt="Monograma RD"
              width="718"
              height="497"
            />
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#servicos">Serviços</a>
            <a href="#resultado">Resultados</a>
            <a href="#sobre">Sobre</a>
            <a href="#localizacao">Localização</a>
            <a href="#duvidas">Dúvidas</a>
            <span className="desktop-nav-indicator" aria-hidden="true" />
          </nav>

          <a className="button button-whatsapp header-button header-schedule-button" href={headerWhatsapp} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" />
            <span>Agendar</span>
          </a>

          <MobileMenu whatsappUrl={generalWhatsapp} />
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy" data-aos="fade-up">
              <p className="eyebrow hero-signature">NAIL DESIGNER — ESTÉTICA — TERAPIA</p>
              <h1>Mais que unhas bonitas: cuidado, técnica e personalidade.</h1>
              <p className="hero-lead">
                Atendimento com Renata Dias em Jacarepaguá. Escolha o serviço, consulte a agenda e confirme seu horário diretamente pelo WhatsApp.
              </p>
              <div className="hero-actions">
                <a className="button button-whatsapp hero-schedule-button" href={generalWhatsapp} target="_blank" rel="noreferrer">
                  <span>Consultar horários</span>
                  <span className="hero-schedule-arrow" aria-hidden="true"><Icon name="arrow" /></span>
                  <span className="hero-schedule-whatsapp" aria-hidden="true"><Icon name="whatsapp" /></span>
                </a>
              </div>
              <div className="hero-facts" aria-label="Informações de atendimento">
                <span><Icon name="calendar-check" /> Quarta a sábado, 10h às 19h</span>
                <span><Icon name="pin" /> Freguesia de Jacarepaguá</span>
              </div>
            </div>

            <div className="hero-stage">
              <div className="mobile-hero-identity" data-aos="fade-up">
                <strong>Renata Dias</strong>
                <span>NAILS MASTER</span>
              </div>
              <div className="hero-visual">
                <div className="hero-photo-wrap">
                  <picture>
                    <source
                      media="(min-width: 960px)"
                      srcSet="/images/renata-dias-hero-desktop-agosto-2026.png"
                    />
                    <img src="/images/renata-dias-hero-mobile-agosto-2026.png" alt="Retrato profissional de Renata Dias" width="941" height="1672" fetchPriority="high" />
                  </picture>
                </div>
              </div>
              <p className="eyebrow hero-signature mobile-hero-signature" data-aos="fade-up">NAIL DESIGNER — ESTÉTICA — TERAPIA</p>
              <a
                className="mobile-hero-booking"
                href={generalWhatsapp}
                target="_blank"
                rel="noreferrer"
              >
                <span>Agendar pelo WhatsApp</span>
                <Icon name="whatsapp" />
              </a>
            </div>
          </div>
        </section>

        <section className="section services" id="servicos">
          <div className="container">
            <div className="section-heading split-heading" data-aos="fade-up">
              <div>
                <p className="eyebrow">Serviços</p>
                <h2>O cuidado que cabe no seu momento</h2>
              </div>
              <p>Encontre cuidados para unhas, mãos, pés, sobrancelhas e pele. Se tiver dúvida, a Renata ajuda você pelo WhatsApp.</p>
            </div>

            <div className="service-grid">
              {services.map((service, index) => (
                <article
                  className="service-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 90}
                  key={service.title}
                >
                  <div className="service-top">
                    <span className="service-number">{service.number}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <a href={whatsapp(service.message)} target="_blank" rel="noreferrer">
                    {service.cta} <Icon name="arrow" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section result-section" id="resultado">
          <div className="container">
            <div className="result-gallery" aria-label="Resultados reais de trabalhos realizados por Renata Dias">
              <figure className="result-photo" data-aos="fade-up">
                <div className="result-photo-frame">
                  <img src="/images/unhas-ombre-renata-dias.jpg" alt="Unhas com acabamento ombré em rosa e branco feitas por Renata Dias" width="1600" height="1498" loading="lazy" />
                </div>
                <figcaption>
                  <strong>Acabamento Ombré</strong>
                  <span>Transição suave em rosa e branco, com brilho e acabamento delicado.</span>
                </figcaption>
              </figure>
              <figure className="result-photo" data-aos="fade-up" data-aos-delay="90">
                <div className="result-photo-frame">
                  <img src="/images/unhas-rose-renata-dias.jpg" alt="Unhas em tom rosé com acabamento brilhante feitas por Renata Dias" width="1200" height="1600" loading="lazy" />
                </div>
                <figcaption>
                  <strong>Esmaltação Rosé</strong>
                  <span>Um tom elegante e uniforme, finalizado com brilho intenso.</span>
                </figcaption>
              </figure>
              <figure className="result-photo" data-aos="fade-up" data-aos-delay="180">
                <div className="result-photo-frame">
                  <img src="/images/unhas-nude-renata-dias.jpg" alt="Unhas em tom nude claro com acabamento brilhante feitas por Renata Dias" width="720" height="1280" loading="lazy" />
                </div>
                <figcaption>
                  <strong>Esmaltação Nude</strong>
                  <span>Visual natural e delicado, com acabamento limpo e discreto.</span>
                </figcaption>
              </figure>
            </div>
            <div className="result-copy" data-aos="fade-up">
              <p className="eyebrow">Cuidado nos detalhes</p>
              <h2>Um resultado bonito sem deixar de ser você.</h2>
              <p>
                Da escolha da cor à finalização, o atendimento considera seu estilo e o cuidado que suas unhas precisam naquele momento.
              </p>
              <ul className="check-list">
                <li><Icon name="check" /> Orientação na escolha de cores e acabamentos</li>
                <li><Icon name="check" /> Processo cuidadoso do início ao fim</li>
                <li><Icon name="check" /> Atendimento próximo e sem pressa</li>
              </ul>
              <a className="button button-primary" href={whatsapp("Olá, Renata! Vi o resultado no site e gostaria de agendar meu atendimento.")} target="_blank" rel="noreferrer">
                Quero agendar também
              </a>
            </div>
          </div>
        </section>

        <section className="section about" id="sobre">
          <div className="container about-grid">
            <div className="about-copy" data-aos="fade-up">
              <p className="eyebrow">Quem vai cuidar de você</p>
              <h2>Prazer, eu sou Renata Dias.</h2>
              <p className="about-lead">
                Sou Manicure e Nail Designer, e acredito que cuidar das unhas e dos pés também pode ser um momento leve na sua semana.
              </p>
              <p>
                Meu atendimento é próximo e personalizado: gosto de ouvir o que cada cliente deseja, orientar quando necessário e cuidar de cada etapa com atenção. Tudo para que você se sinta confortável e saia satisfeita com a sua escolha.
              </p>
              <a className="text-link" href="https://www.instagram.com/renatadiasnails" target="_blank" rel="noreferrer">
                <Icon name="instagram" /> Conhecer o Instagram
              </a>
            </div>
            <div className="about-gallery" data-aos="fade-up" data-aos-delay="120">
              <img className="about-wide" src="/images/renata-dias-atendimento.jpg" alt="Renata Dias apresentando seu trabalho de manicure" width="1280" height="853" loading="lazy" />
            </div>
          </div>
        </section>

        <ExperienceStats />

        <section className="section standards">
          <div className="container">
            <div className="section-heading centered" data-aos="fade-up">
              <p className="eyebrow">Confiança</p>
              <h2>Você sabe o que esperar do atendimento</h2>
              <p>Clareza, organização e atenção para você aproveitar seu horário com tranquilidade.</p>
            </div>
            <div className="standards-grid">
              <article data-aos="fade-up"><span><Icon name="shield" /></span><h3>Cuidado e higiene</h3><p>Materiais e espaço preparados com atenção antes de cada atendimento.</p></article>
              <article data-aos="fade-up" data-aos-delay="90"><span><Icon name="heart" /></span><h3>Atendimento humano</h3><p>Conversa leve e escolhas respeitadas, sem transformar seu momento em uma corrida.</p></article>
              <article data-aos="fade-up" data-aos-delay="180"><span><Icon name="calendar" /></span><h3>Agenda organizada</h3><p>Atendimentos com hora marcada, de quarta a sábado, das 10h às 13h e das 14h às 19h.</p></article>
            </div>
          </div>
        </section>

        <section className="section steps">
          <div className="container">
            <div className="section-heading centered" data-aos="fade-up">
              <p className="eyebrow">Agendamento simples</p>
              <h2>Três passos e seu horário está encaminhado</h2>
            </div>
            <ol className="steps-grid">
              <li data-aos="fade-up"><span>1</span><div><h3>Chame no WhatsApp</h3><p>Envie a mensagem pronta e diga qual serviço procura.</p></div></li>
              <li data-aos="fade-up" data-aos-delay="90"><span>2</span><div><h3>Escolha o horário</h3><p>Confira as opções disponíveis entre quarta e sábado.</p></div></li>
              <li data-aos="fade-up" data-aos-delay="180"><span>3</span><div><h3>Confirme e venha</h3><p>Receba as informações e compareça no horário combinado.</p></div></li>
            </ol>
            <div className="center-action" data-aos="fade-up">
              <a className="button button-whatsapp" href={generalWhatsapp} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> Consultar agenda agora</a>
              <small>Você fala diretamente com a Renata.</small>
            </div>
          </div>
        </section>

        <section className="section location" id="localizacao">
          <div className="container">
            <div className="location-panels">
              <article className="hours-card" data-aos="fade-up">
                <p className="location-kicker"><Icon name="clock" /> Atendimento</p>
                <h2>Horário de<br/>funcionamento</h2>
                <p className="service-days">Quarta a Sábado</p>
                <div className="hours-grid" aria-label="Quarta a Sábado — Manhã: 10h às 13h e Tarde: 14h às 19h">
                  <div>
                    <strong>10h às 13h</strong>
                    <span>Manhã</span>
                  </div>
                  <div>
                    <strong>14h às 19h</strong>
                    <span>Tarde</span>
                  </div>
                </div>
              </article>

              <article className="address-card" data-aos="fade-up" data-aos-delay="120">
                <p className="location-kicker">Onde encontrar</p>
                <div className="address-line">
                  <span className="location-icon"><Icon name="pin" /></span>
                  <div>
                    <h2>Freguesia, Jacarepaguá</h2>
                    <p>R. Araguaia, 1763 — Loja E<br/>Rio de Janeiro — RJ, CEP 22745-271</p>
                  </div>
                </div>
                <p className="address-note">O agendamento é feito diretamente pelo WhatsApp. Chame a Renata e encontre o melhor horário para você.</p>
                <div className="location-actions">
                  <a className="button button-primary" href={generalWhatsapp} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> Agendar pelo WhatsApp</a>
                  <a className="button button-outline" href="https://www.instagram.com/renatadiasnails" target="_blank" rel="noreferrer"><Icon name="instagram" /> Seguir no Instagram</a>
                </div>
              </article>
            </div>

            <div className="map-wrap" data-aos="fade-up">
              <iframe
                title="Localização da Renata Dias — Nails Master na Rua Araguaia, Freguesia"
                src="https://maps.google.com/maps?hl=pt-BR&q=Rua%20Araguaia%2C%201763%2C%20Loja%20E%2C%20Freguesia%20(Jacarepagu%C3%A1)%2C%20Rio%20de%20Janeiro%2C%20RJ%2022745-271&z=18&t=m&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                className="button map-action"
                href="https://www.google.com/maps/search/?api=1&query=R.%20Araguaia%2C%201763%20Loja%20E%2C%20Freguesia%2C%20Rio%20de%20Janeiro%20RJ%2022745-271"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="pin" /> Abrir no Google Maps
              </a>
            </div>
          </div>
        </section>

        <section className="section faq" id="duvidas">
          <div className="container faq-grid">
            <div className="faq-intro" data-aos="fade-up">
              <p className="eyebrow">Dúvidas frequentes</p>
              <h2>Informações claras antes de você agendar</h2>
              <p>Não encontrou o que procura? A Renata responde diretamente pelo WhatsApp.</p>
              <a className="text-link" href={whatsapp("Olá, Renata! Vim pelo site e fiquei com uma dúvida sobre o atendimento.")} target="_blank" rel="noreferrer">Tirar uma dúvida <Icon name="arrow" /></a>
            </div>
            <FAQAccordion items={faqs} />
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta-inner">
            <div data-aos="fade-up">
              <p className="eyebrow">Seu próximo horário</p>
              <h2>Quer reservar seu próximo momento de cuidado?</h2>
              <p>Fale com a Renata e consulte os horários disponíveis. A mensagem já vai pronta para facilitar.</p>
            </div>
            <a className="button button-light" data-aos="fade-up" data-aos-delay="100" href={generalWhatsapp} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> Ver horários no WhatsApp</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand" data-aos="fade-up">
            <strong>Renata Dias</strong>
            <span>Nails Master</span>
            <p>Nail Design, estética e saúde com atendimento em Jacarepaguá, Rio de Janeiro.</p>
          </div>
          <div className="footer-contact" data-aos="fade-up" data-aos-delay="70">
            <strong>CONTATO</strong>
            <a className="footer-contact-link" href="https://www.instagram.com/renatadiasnails" target="_blank" rel="noreferrer" aria-label="Seguir Renata Dias no Instagram">
              <InstagramLogo />
              <span>@renatadiasnails</span>
            </a>
            <a className="footer-contact-link" href={generalWhatsapp} target="_blank" rel="noreferrer" aria-label="Agendar horário pelo WhatsApp">
              <WhatsAppLogo />
              <span>Agendar horário</span>
            </a>
          </div>
          <div className="footer-service" data-aos="fade-up" data-aos-delay="140">
            <strong>ATENDIMENTO</strong>
            <p>
              Quarta a Sábado, 10h às 19h
              <span className="footer-address">R. Araguaia, 1763 — Loja E<br/>Freguesia, Rio de Janeiro — RJ</span>
            </p>
          </div>
          <nav className="footer-navigation" aria-label="Navegação do rodapé" data-aos="fade-up" data-aos-delay="200">
            <strong>NAVEGAÇÃO</strong>
            <a href="#servicos">Serviços</a>
            <a href="#resultado">Resultados</a>
            <a href="#sobre">Sobre</a>
            <a href="#localizacao">Localização</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
        </div>
        <div className="container footer-bottom"><span>© 2026 Renata Dias — Todos os direitos reservados</span><span className="footer-cnpj">CNPJ 36.700.076/0001-77</span><span>Atendimento com hora marcada</span></div>
      </footer>

      <WhatsAppFloat href={generalWhatsapp}>
        <WhatsAppLogo />
      </WhatsAppFloat>
    </>
  );
}

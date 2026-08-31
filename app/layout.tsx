import type { Metadata } from "next";import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource/mulish/400.css";
import "@fontsource/mulish/500.css";
import "@fontsource/mulish/600.css";
import "@fontsource/mulish/700.css";
import "@fontsource/fraunces/500.css";
import "aos/dist/aos.css";
import "./globals.css";
import ScrollAnimations from "./ScrollAnimations";

export const metadata: Metadata = {
  metadataBase: new URL("https://renatadiasnails.vercel.app"),
  title: "Renata Dias | Nails Master",
  description:
    "Manicure e pedicure com hora marcada na Freguesia, Jacarepaguá. Atendimento de quarta a sábado, das 10h às 13h e das 14h às 19h. Agende pelo WhatsApp.",
  keywords: [
    "manicure Freguesia",
    "pedicure Jacarepaguá",
    "manicure Rio de Janeiro",
    "Renata Dias Nails",
  ],
  other: {
    "codex-preview": "development",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Renata Dias | Nails Master",
    description:
      "Cuidado para mãos e pés com atendimento personalizado e hora marcada em Jacarepaguá.",
    siteName: "Renata Dias Nails",
    type: "website",
    locale: "pt_BR",
    url: "/",
    images: [
      {
        url: "/og-preview.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Renata Dias Nails Master — Mais que unhas bonitas: cuidado, técnica e personalidade.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renata Dias | Nails Master",
    description:
      "Cuidado para mãos e pés com atendimento personalizado e hora marcada em Jacarepaguá.",
    images: ["/og-preview.jpg"],
  },
  icons: {
    icon: "/images/renata-dias-logo-transparent-2026.png",
    shortcut: "/images/renata-dias-logo-transparent-2026.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              const ua = navigator.userAgent;
              const isSafari = /Safari/i.test(ua) && !/(Chrome|Chromium|CriOS|FxiOS|Edg|OPR|Android)/i.test(ua);
              document.documentElement.classList.add(isSafari ? "browser-safari" : "browser-non-safari");
            })();`,
          }}
        />
      </head>
      <body>
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { display, inter, jetbrains } from "./fonts";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://aurora-case.vercel.app"),
  title: {
    default: "Aurora — case de produto · AI Product Challenge",
    template: "%s · Aurora",
  },
  description:
    "Aurora: um copiloto de IA, no WhatsApp, que ajuda cidadãos a navegar o INSS e o BPC. O case, o protótipo navegável e os documentos de produto.",
  openGraph: {
    title: "Aurora — case de produto",
    description:
      "Um copiloto de IA, no WhatsApp, que devolve às pessoas o acesso ao que já é delas — começando pelo INSS.",
    url: "/",
    siteName: "Aurora",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <Cursor />
        <div className="grain" aria-hidden />
        <SmoothScroll>
          <Nav />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

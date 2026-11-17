import type { Metadata } from "next";
import { Instrument_Serif, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "WB DigiTech is a digital growth studio in Bur Dubai. Branding, marketing, and websites for businesses across the UAE.";

export const metadata: Metadata = {
  metadataBase: new URL("https://wbdigitech.ae"),
  title: "WB DigiTech | Creative Digital Growth Agency",
  description,
  openGraph: {
    title: "WB DigiTech | Creative Digital Growth Agency",
    description,
    url: "https://wbdigitech.ae",
    siteName: "WB DigiTech",
    type: "website",
    locale: "en_AE",
  },
  twitter: {
    card: "summary",
    title: "WB DigiTech | Creative Digital Growth Agency",
    description,
  },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WB DigiTech",
  url: "https://wbdigitech.ae",
  email: "info@wbdigitech.ae",
  telephone: "+971-4-255-9928",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office 203, Raffa Building, Rolla Street",
    addressLocality: "Bur Dubai",
    addressCountry: "AE",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full w-full min-w-0 flex-col font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        {children}
      </body>
    </html>
  );
}

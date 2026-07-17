import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ProtectionWrapper from "@/components/ProtectionWrapper";
import RouteProgress from "@/components/RouteProgress";
import { Providers } from "./providers";

const playfair = Playfair_Display({ 
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noudesign.vn"),
  title: "NOU Design - Thiết kế & Thi công nội thất cao cấp tại Hà Nội",
  description: "NOU Design chuyên thiết kế và thi công nội thất biệt thự, chung cư, nhà phố cao cấp tại Hà Nội. Kiến tạo những không gian sống vượt thời gian.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NOU Design - Thiết kế & Thi công nội thất cao cấp tại Hà Nội",
    description: "NOU Design chuyên thiết kế và thi công nội thất biệt thự, chung cư, nhà phố cao cấp tại Hà Nội.",
    url: "https://noudesign.vn",
    siteName: "NOU Design",
    images: [
      {
        url: "/asset/anhweb/hi%E1%BB%87n%20%C4%91%E1%BA%A1i/8.%20Chung%20c%C6%B0%20Matrix%20one%20125m2/11.jpg",
        width: 1200,
        height: 630,
        alt: "NOU Design Thiết kế nội thất",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOU Design - Thiết kế & Thi công nội thất cao cấp",
    description: "NOU Design chuyên thiết kế và thi công nội thất biệt thự, chung cư, nhà phố cao cấp tại Hà Nội.",
    images: ["/asset/anhweb/hi%E1%BB%87n%20%C4%91%E1%BA%A1i/8.%20Chung%20c%C6%B0%20Matrix%20one%20125m2/11.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>
        <ProtectionWrapper>
          <RouteProgress />
          {children}
          {/* Structured Data (Schema.org) for LocalBusiness */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "NOU Design",
                "url": "https://noudesign.vn",
                "logo": "https://noudesign.vn/icon.jpg",
                "telephone": "0911176222",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Hà Nội",
                  "addressCountry": "VN"
                },
                "sameAs": [
                  "https://www.facebook.com/noudesign.vn"
                ]
              })
            }}
          />
        </ProtectionWrapper>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ProtectionWrapper from "@/components/ProtectionWrapper";
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
  title: "NOU.Design | Cảm hứng sáng tạo là đam mê tuyệt đối",
  description: "Kiến tạo những không gian sống vượt thời gian",
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
          {children}
        </ProtectionWrapper>
        </Providers>
      </body>
    </html>
  );
}

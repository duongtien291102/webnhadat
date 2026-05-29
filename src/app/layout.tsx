import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOU.Architects | Web Nhà Đất",
  description: "Kiến tạo những không gian sống vượt thời gian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {children}
      </body>
    </html>
  );
}

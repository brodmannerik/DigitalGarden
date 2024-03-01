import "./globals.css";
import type { Metadata } from "next";
import Providers from "./components/Providers";
import CustomHeader from "./components/CustomHeader";

export const metadata: Metadata = {
  title: "Erik's Digital Garden",
  description: "Erik's Digital Garden",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2020%2020'%3E%3Ctext%20x='0'%20y='14'%3E🌱%3C/text%3E%3C/svg%3E"
          type="image/svg+xml"
        />
      </head>
      <body>
        <Providers>
          <CustomHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider,

} from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { DesignerContextProvider } from "@/components/context/DesignerContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Formy",
  description: "Drag and Drop Form ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <DesignerContextProvider>
          <body
          
          >
          
            {children}
            <Toaster />
          </body>
        </DesignerContextProvider>
      </html>
    </ClerkProvider>
  );
}

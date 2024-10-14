import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,

} from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { DesignerContextProvider } from "@/components/context/DesignerContext";
import { dark } from '@clerk/themes'

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
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
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

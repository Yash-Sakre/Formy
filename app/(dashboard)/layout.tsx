import React from "react";
import { UserButton } from "@clerk/nextjs";
import { ReactNode } from "react";
import { Logo } from "@/components/Logo";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen container items-center">
      <nav className=" container flex items-center justify-between border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <UserButton />
      </nav>
      <main className="flex w-full  justify-center h-screen">
        {children}
      </main>
    </div>
  );
}

export default Layout;

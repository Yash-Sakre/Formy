import React from "react";

import { ReactNode } from "react";
import { Logo } from "@/components/Logo";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full  max-h-screen container items-center h-screen">
      <nav className=" container flex items-center justify-between border-b border-border h-[60px] px-4 py-2">
        <Logo />
   
      </nav>
      <main className="flex w-full  justify-center ">{children}</main>
    </div>
  );
}

export default Layout;

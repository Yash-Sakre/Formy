import React from "react";
import { ReactNode } from "react";
import { FaWpforms } from "react-icons/fa6";
import Image from "next/image";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-row h-screen">
      <div className="hidden bg-muted lg:flex lg:flex-col lg:justify-center lg:items-center p-12 flex-1">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-2 font-bold text-7xl">
            <FaWpforms /> Formy
          </div>
          <h1 className="text-2xl font-bold my-4">
            Effortless Form Creation, Powerful Insights
          </h1>
          <p className="text-xl text-balance text-muted-foreground text-center">
            Design and share professional forms with ease. <br />
            Collect responses in real-time and unlock valuable insights
            instantly.
          </p>
          <Image
            src="/formy.png"
            alt=" Formy"
            width="900"
            height="300"
            className="mt-8 rounded-lg shadow-xl border border-muted-foreground"
          />
        </div>
      </div>
      <div className="flex items-center justify-center py-12 bg-background flex-1">
        <div className="mx-auto grid w-[350px] gap-6">
          <main className="flex w-full justify-center items-center">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;

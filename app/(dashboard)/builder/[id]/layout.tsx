import React, { ReactNode } from "react";

function BuilderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex  justify-center w-full  flex-grow">
      {children}
    </div>
  );
}

export default BuilderLayout;

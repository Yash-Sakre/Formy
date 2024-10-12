"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex items-center justify-center ">
      <div className="text-destructive text-2xl ">Something went wrong!</div>
      <Button>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}

export default ErrorPage;

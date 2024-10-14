import Link from "next/link";
import React from "react";

import { FaWpforms } from "react-icons/fa6";
export function Logo() {
  return (
    <Link href={"/"} className="flex items-center justify-center gap-2 font-bold text-2xl">
      <FaWpforms /> Formy
    </Link>
  );
}

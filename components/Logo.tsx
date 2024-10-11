import Link from "next/link";
import React from "react";
import Image from "next/image";

type Props = {};
import { FaWpforms } from "react-icons/fa6";
export function Logo(props: Props) {
  return (
    <Link href={"/"} className="flex items-center justify-center gap-2 font-bold text-2xl">
      <FaWpforms /> Formy
    </Link>
  );
}

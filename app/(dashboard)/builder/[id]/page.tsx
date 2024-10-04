import { GetFormById } from "@/actions/form";
import React from "react";

async function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const form = await GetFormById(Number(id));

  return <div>BuilderPage</div>;
}

export default BuilderPage;

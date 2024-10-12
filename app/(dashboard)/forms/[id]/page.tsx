import React, { useEffect, useState } from "react";
import { GetFormById } from "@/actions/form";
import VisitBtn from "@/components/VisitBtn";
import FormShareLink from "@/components/FormShareLink";
import { LuView } from "react-icons/lu";
import { StatsCard } from "../../page";

async function FormDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error("Form not found");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className="py-5  border-muted w-full  container">
        <div className="flex items-center justify-between pb-5 w-full border-b border-muted">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
        <div className="py-4 border-b border-muted">
          <div className="container flex gap-2 items-center justify-between">
            <FormShareLink shareUrl={form.shareURL} />
          </div>
        </div>
        <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
          <StatsCard
            title="Total Visits"
            loading={false}
            icon={<LuView className="text-blue-600" />}
            helperText="All time form visits"
            value={visits.toLocaleString() || ""}
          />
          <StatsCard
            title="Total Submissions"
            loading={false}
            icon={<LuView className="text-blue-600" />}
            helperText="All time form Submissions"
            value={submissions.toLocaleString() || ""}
          />
          <StatsCard
            loading={false}
            icon={<LuView className="text-blue-600" />}
            title="Submissions Rate"
            helperText="Visits that Result in form Submission"
            value={submissionRate.toLocaleString() + "%" || ""}
          />
          <StatsCard
            loading={false}
            icon={<LuView className="text-blue-600" />}
            title="Bounce Rate"
            helperText="Visits that Leave without Submission"
            value={bounceRate.toLocaleString() + "%" || ""}
          />
        </div>
        <div className="container pt-10">
          <SubmissionsTable id={form.id} />
        </div>
      </div>
    </>
  );
}

export default FormDetailPage;

function SubmissionsTable({ id }: { id: number }) {
  return <div className="text-2xl container font-bold ">Submissions</div>;
}

import React, { ReactNode } from "react";
import { GetFormById, GetFormWithSubmission } from "@/actions/form";
import VisitBtn from "@/components/VisitBtn";
import FormShareLink from "@/components/FormShareLink";
import { LuView } from "react-icons/lu";
import { StatsCard } from "../../page";
import { ElementsType, FormElementInstance } from "@/components/FormElements";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

type Row = {
  [key: string]: string;
} & {
  submittedAt: Date;
};

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

async function SubmissionsTable({ id }: { id: number }) {
  const form = await GetFormWithSubmission(id);

  if (!form) {
    throw new Error("Form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
      case "NumberField":
      case "TextAreaField":
      case "CheckboxField":
      case "SelectField":
      case "DateField":
        {
          columns.push({
            id: element.id,
            label: element.extraAttribute?.label,
            required: element.extraAttribute?.required,
            type: element.type,
          });
        }
        break;
      default:
        break;
    }
  });

  const row: Row[] = [];

  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    row.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <>
      <div className="text-2xl container font-bold ">Submissions</div>
      <div>
        <Table>
          <TableCaption>A list of recent Submissions.</TableCaption>
          <TableHeader>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableHead key={column.id} className="uppercase">
                    {column.label}
                  </TableHead>
                );
              })}
              <TableHead className="text-muted-foreground text-right uppercase">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {row.map((row, index) => {
              return (
                <TableRow key={index}>
                  {columns.map((column) => {
                    return (
                      <RowCell
                        key={column.id}
                        value={row[column.id]}
                        type={column.type}
                      />
                    );
                  })}
                  <TableCell className="text-right text-muted-foreground">
                    {formatDistance(row.submittedAt, new Date(), {
                      addSuffix: true,
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;

  switch(type){
    case "DateField": 
      if(!value) break;
      const date = new Date(value);
      node = <Badge variant={"outline"}>{formatDate(date,"dd/MM/yyyy")}</Badge>
      break;
    case "CheckboxField":
      const checked = value === "true";
      node = <Checkbox checked={checked} disabled /> 
      break;

  }

  return <TableCell>{node}</TableCell>;
}

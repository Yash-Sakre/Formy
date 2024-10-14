import { GetFormStats, GetForms } from "@/actions/form";
import CreateFormBtn from "@/components/CreateFormBtn";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {  Suspense } from "react";
import { LuView } from "react-icons/lu";
import { StatsCardsProps, StatsCardProps } from "@/types/StatsCards";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { FaEdit, FaWpforms } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function Home() {
  return (
    <div className="container pt-4 w-full">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-3" />
      <h2 className="text-3xl font-bold col-span-2 px-8 w-full"> Your forms</h2>
      <Separator className="my-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();

  return <StatsCards loading={false} data={stats} />;
}

function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-8 gap-4  ">
      <StatsCard
        title="Total Visits"
        loading={loading}
        icon={<LuView className="text-blue-600" />}
        helperText="All time form visits"
        value={data?.visits.toLocaleString() || ""}
      />
      <StatsCard
        title="Total Submissions"
        loading={loading}
        icon={<LuView className="text-blue-600" />}
        helperText="All time form Submissions"
        value={data?.submissions.toLocaleString() || ""}
      />
      <StatsCard
        loading={loading}
        icon={<LuView className="text-blue-600" />}
        title="Submissions Rate"
        helperText="Visits that Result in form Submission"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
      />
      <StatsCard
        loading={loading}
        icon={<LuView className="text-blue-600" />}
        title="Bounce Rate"
        helperText="Visits that Leave without Submission"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
      />
    </div>
  );
}

export function StatsCard({
  title,
  icon,
  helperText,
  value,
  loading,
}: StatsCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <span>{icon}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}

export function FormCardSkeleton() {
  return <Skeleton className="h-[190px] w-full border-2 "></Skeleton>;
}

async function FormCards() {
  const forms = await GetForms();

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant={"destructive"}>Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-sm text-muted-foreground ">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published ? (
          <Button asChild className="w-full mt-2 text-md gap-2 items-center">
            <Link href={`/forms/${form.id}`}>
              {" "}
              View Submissions <IoIosArrowRoundForward />{" "}
            </Link>
          </Button>
        ) : (
          <Button asChild className="w-full mt-2 text-md gap-2 items-center">
            <Link href={`/builder/${form.id}`}>
              {" "}
              Edit form <FaEdit />{" "}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

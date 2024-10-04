import { GetFormStats } from "@/actions/form";
import { ReactNode } from "react";

export interface StatsCardsProps {
    loading: boolean;
    data?: Awaited<ReturnType<typeof GetFormStats>>;
  }
 export  type StatsCardProps = {
    loading: boolean;
    icon: ReactNode;
    title: string;
    helperText: string;
    value: string | number;
  };
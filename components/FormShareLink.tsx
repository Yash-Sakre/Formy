"use client"

import React, { useEffect, useState } from "react";

import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { ImShare } from "react-icons/im";
import { toast } from "@/hooks/use-toast";

function FormShareLink({ shareUrl }: { shareUrl: string }) {
  const [mouted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mouted) {
    return null;
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <div className="flex items-center justify-center flex-grow gap-4">
      <Input readOnly value={shareLink} />
      <Button
        className="w-[230px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Link Copied",
            description: "The link has been copied to your clipboard",
          });
        }}
      >
        {" "}
        <ImShare className="mr-2 h-4 w-4" /> Share Link
      </Button>
    </div>
  );
}

export default FormShareLink;

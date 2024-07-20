import { Button } from "@/components/ui/button";
import React from "react";
import MangeSubscriptionBtn from "./MangeSubscriptionBtn";

export default function page() {
  return (
    <div className="flex flex-col gap-2">
      Manage Subscription:
      <MangeSubscriptionBtn />
    </div>
  );
}

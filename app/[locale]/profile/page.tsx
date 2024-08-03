import { Button } from "@/components/ui/button";
import React from "react";
import ManageSubscriptionBtn from "./ManageSubscriptionBtn";

export default function page() {
  return (
    <div className="flex flex-col gap-2">
      Manage Subscription:
      <ManageSubscriptionBtn />
    </div>
  );
}

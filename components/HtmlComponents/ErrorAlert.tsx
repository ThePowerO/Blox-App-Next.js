'use client';

import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { useLocale } from "@/LocaleContext";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Link from "next/link"

export function AlertDestructive() {

    const { locale } = useLocale();

  return (
    <Alert className="static flex" variant="default">
      <div className="mr-[15px]">
          <ExclamationTriangleIcon className="block h-4 w-4" />
      </div>
      <div>
          <AlertTitle>No Combos Found</AlertTitle>
          <AlertDescription>
            Go create your first combo to see it here!
            <Link href={`/${locale}/create-combo`}>
              <span className="text-blue-500 hover:underline"> Create Combo</span>
            </Link>
          </AlertDescription>
      </div>
    </Alert>
  )
}

'use client';

import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl";

export function AlertDestructive() {

  const locale = useLocale();
  const t = useTranslations("ALertDestructive") 

  return (
    <Alert className="static flex" variant="default">
      <div className="mr-[15px]">
          <ExclamationTriangleIcon className="block h-4 w-4" />
      </div>
      <div>
          <AlertTitle>{t("NoComboFound")}</AlertTitle>
          <AlertDescription>
            {t("CreateYourCombo")}
            <Link href={`/${locale}/create-combo`}>
              <span className="text-blue-500 hover:underline"> {t("CreateCombo")}</span>
            </Link>
          </AlertDescription>
      </div>
    </Alert>
  )
}
 import React from 'react'
import { useTranslations } from 'next-intl'

export default function About() {

  const t = useTranslations("AboutPage");

  return (
    <div>
      {t("h1")}
    </div>
  )
}

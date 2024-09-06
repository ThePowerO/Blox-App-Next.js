import ForgotPassword from '@/components/ForgotPassword/ForgotPassword'
import { unstable_setRequestLocale } from "next-intl/server";

type paramsProps = {
  params: {
    locale: string
  }
}

const locales = ['en', 'de', 'fr', 'it', 'jp', 'kr', 'cn', 'pt'];

export default function page({ params }: paramsProps) {
  unstable_setRequestLocale(params.locale);

  return (
    <>
      <ForgotPassword />
    </>
  )
}

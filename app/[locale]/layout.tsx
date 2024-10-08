import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'
import NotFound from './not-found'
import { notFound } from 'next/navigation'
import { Providers } from './providers'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocaleProvider } from '@/LocaleContext'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    absolute: '',
    default: 'Blox Fruits | Combosfy',
    template: '%s | Combosfy'
  },
  description: 'Build your favorite Combo from Blox Fruits today! Become a Hunter',
}

const locales = ['en', 'pt', 'fr', 'de', 'it', 'jp', 'kr', 'cn'];

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {

  if (!locales || !locales.includes(locale)) {
    NotFound();
  }

  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers>
          <LocaleProvider locale={locale}>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <ThemeProvider attribute='class' defaultTheme='Light' enableSystem disableTransitionOnChange>
                <NavBar locale={locale} />
                <main className={`layout-container`}>
                  {children}
                  <ToastContainer />
                </main>
                <Footer />
              </ThemeProvider>
            </NextIntlClientProvider>
          </LocaleProvider>
        </Providers>
      </body>
    </html>
  )
}

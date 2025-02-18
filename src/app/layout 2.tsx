
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import ModalProvider from '@/providers/modal-provider'
import { Toaster } from '@/components/ui/sonner'

const font = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "InTrap",
  description: "Automate your Work With InTrap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
    <html lang="en">
    <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
                <ModalProvider>
                {children}
                <Toaster />
              </ModalProvider>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
function Geist(arg0: { variable: string; subsets: string[] }) {
  throw new Error('Function not implemented.')
}


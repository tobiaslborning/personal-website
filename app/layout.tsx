import type { Metadata } from "next";
import localFont from "next/font/local"
import "./globals.css";
import { ThemeProvider } from "next-themes";

const fontPair = localFont({
  // USING : Sora for bold-medium, Switzer for regular-extralight
  src: [
    {
      path: './../public/fonts/sora/Sora-Bold.otf',
      weight: '700',
      style: 'bold',
    },
    {
      path: './../public/fonts/sora/Sora-SemiBold.otf',
      weight: '600',
      style: 'semibold',
    },
    {
      path: './../public/fonts/sora/Sora-Medium.otf',
      weight: '500',
      style: 'medium',
    },
    {
      path: './../public/fonts/switzer/Switzer-Regular.otf',
      weight: '400',
      style: 'regular',
    },
    {
      path: './../public/fonts/switzer/Switzer-Light.otf',
      weight: '300',
      style: 'light',
    },
    {
      path: './../public/fonts/switzer/Switzer-Extralight.otf',
      weight: '200',
      style: 'extralight',
    },
  ],
})

export const metadata: Metadata = {
  title: "Tobias Borning",
  description: "Portfoli page of Tobias Borning, CS student @ NTNU",
  icons: {
    icon: [
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontPair.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

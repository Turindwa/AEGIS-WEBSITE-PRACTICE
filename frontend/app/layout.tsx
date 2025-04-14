import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Providers } from "@/lib/providers"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "イージスグループ | 公共サービスの代行者",
    template: "%s | イージスグループ",
  },
  description:
    "公共事業で、社会を守る。公共サービスを、変える。イージスグループは公共サービスの質的向上と効率化を図るスペシャリスト集団です。",
  keywords: [
    "公共サービス",
    "官民連携",
    "コンセッション事業",
    "指定管理事業",
    "業務委託事業",
    "パートナーシップ事業",
    "イージスグループ",
  ],
  authors: [{ name: "イージスグループ" }],
  creator: "イージスグループ",
  publisher: "イージスグループ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
  metadataBase: new URL("https://aegis-co.jp"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "イージスグループ | 公共サービスの代行者",
    description:
      "公共事業で、社会を守る。公共サービスを、変える。イージスグループは公共サービスの質的向上と効率化を図るスペシャリスト集団です。",
    url: "https://aegis-co.jp",
    siteName: "イージスグループ",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "イージスグループ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "イージスグループ | 公共サービスの代行者",
    description:
      "公共事業で、社会を守る。公共サービスを、変える。イージスグループは公共サービスの質的向上と効率化を図るスペシャリスト集団です。",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-black dark:bg-black dark:text-white`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'
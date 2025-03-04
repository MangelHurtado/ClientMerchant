"use client"

import localFont from "next/font/local"
import "./globals.css"
import { Layout, Menu } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import Link from "next/link"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

const { Header, Sider, Content } = Layout

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout className="min-h-screen">
          <Header className="bg-[#001529] text-white text-center p-0">
            Client-Merchant management application
          </Header>
          <Layout>
            <Sider className="overflow-auto relative">
              <Menu
                className="h-full border-r-0"
                mode="inline"
                defaultOpenKeys={["dashboard"]}
                items={[
                  {
                    label: <Link href="/">Home</Link>,
                    key: "home",
                    icon: <HomeOutlined />,
                  },
                  {
                    label: "Dashboard",
                    key: "dashboard",
                    children: [
                      {
                        label: <Link href="/dashboard/clients">Clients</Link>,
                        key: "clients",
                      },
                      {
                        label: (
                          <Link href="/dashboard/merchants">Merchants</Link>
                        ),
                        key: "merchants",
                      },
                    ],
                  },
                ]}
              ></Menu>
              <Menu
                className="absolute bottom-0 w-full border-r-0"
                items={[{ label: "Signout", key: "signout", danger: true }]}
              ></Menu>
            </Sider>
            <Content className="p-0 px-6 min-h-[280px]">{children}</Content>
          </Layout>
        </Layout>
      </body>
    </html>
  )
}

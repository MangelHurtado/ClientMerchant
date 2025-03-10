"use client"

import { useState, useCallback } from "react"
import localFont from "next/font/local"
import "./globals.css"
import { Layout, Menu, Button, ConfigProvider, theme, Tooltip } from "antd"
import { HomeOutlined, BulbOutlined } from "@ant-design/icons"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ThemeContext } from "./context/ThemeContext"
import { AuthProvider, useAuth } from "./context/AuthContext"

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

function RootLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), [])
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()

  const headerTitle =
    pathname === "/dashboard/merchants"
      ? "Merchants"
      : pathname === "/dashboard/clients"
      ? "Clients"
      : "Client-Merchant management application"

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
          <ConfigProvider
            theme={{
              algorithm: darkMode
                ? theme.darkAlgorithm
                : theme.defaultAlgorithm,
            }}
          >
            <Layout className="min-h-screen">
              <Header
                className={`${
                  darkMode
                    ? "bg-[#141414] text-white"
                    : "bg-[#001529] text-white"
                } text-center p-0 flex items-center justify-center px-4 relative`}
              >
                <h1 className="text-xl font-bold">{headerTitle}</h1>
                <div className="absolute right-4">
                  <Tooltip
                    title={
                      darkMode ? "Switch to light mode" : "Switch to dark mode"
                    }
                    placement="right"
                  >
                    <Button
                      type="default"
                      icon={<BulbOutlined />}
                      onClick={toggleDarkMode}
                    />
                  </Tooltip>
                </div>
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
                            label: (
                              <Link href="/dashboard/clients">Clients</Link>
                            ),
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
                    onClick={({ key }) => {
                      if (key === "signout") {
                        logout()
                      } else if (key === "signin") {
                        router.push("/auth")
                      }
                    }}
                    items={[
                      isAuthenticated
                        ? { label: "Sign out", key: "signout", danger: true }
                        : { label: "Sign in", key: "signin" },
                    ]}
                  ></Menu>
                </Sider>
                <Content className="p-0 px-6 min-h-[280px]">{children}</Content>
              </Layout>
            </Layout>
          </ConfigProvider>
        </ThemeContext.Provider>
      </body>
    </html>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </AuthProvider>
  )
}

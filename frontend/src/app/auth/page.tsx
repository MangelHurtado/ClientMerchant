"use client"

import { Form, Input, Button, InputNumber, Layout } from "antd"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "../../common/context/AuthContext"
import { useTheme } from "../../common/context/ThemeContext"

type AuthFormData = {
  name: string
  age: number
}

const AuthPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { darkMode } = useTheme()

  const base64UrlEncode = (buffer: ArrayBuffer | string): string => {
    let str = ""
    if (buffer instanceof ArrayBuffer) {
      str = String.fromCharCode.apply(null, new Uint8Array(buffer) as any)
    } else {
      str = buffer
    }
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
  }

  const generateSignature = async (
    message: string,
    secret: string
  ): Promise<string> => {
    const encoder = new TextEncoder()
    const keyData = encoder.encode(secret)
    const messageData = encoder.encode(message)

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    )

    const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData)

    return base64UrlEncode(signature)
  }

  const generateToken = async (name: string, age: number): Promise<string> => {
    // Header
    const header = {
      alg: "HS256",
      typ: "JWT",
    }
    const headerEncoded = base64UrlEncode(JSON.stringify(header))

    // Payload
    const payload = { name, age }
    const payloadEncoded = base64UrlEncode(JSON.stringify(payload))

    // Generate signature
    const message = `${headerEncoded}.${payloadEncoded}`
    const signature = await generateSignature(
      message,
      "a-string-secret-at-least-256-bits-long"
    )

    // Combine all parts
    return `Bearer ${headerEncoded}.${payloadEncoded}.${signature}`
  }

  const { login } = useAuth()

  const onFinish = async (values: AuthFormData) => {
    setLoading(true)
    try {
      const token = await generateToken(values.name, values.age)
      login(token)
      router.push("/dashboard/clients")
      router.refresh()
    } catch (error) {
      console.error("Error during authentication:", error)
    } finally {
      setLoading(false)
    }
  }

  const { Content } = Layout

  return (
    <Layout className="h-full">
      <Content
        className={`h-full flex items-center justify-center ${
          darkMode ? "bg-black" : "bg-gray-50"
        }`}
      >
        <div
          className={`max-w-md w-full space-y-8 p-8 ${
            darkMode ? "bg-[#141414]" : "bg-white"
          } rounded-lg shadow`}
        >
          <div>
            <h2
              className={`mt-6 text-center text-3xl font-extrabold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Authentication
            </h2>
            <p
              className={`mt-2 text-center text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Please enter your name and age to continue
            </p>
          </div>
          <Form
            name="auth_form"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Age"
              name="age"
              rules={[{ required: true, message: "Please input your age!" }]}
            >
              <InputNumber min={1} max={150} className="w-full" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  )
}

export default AuthPage

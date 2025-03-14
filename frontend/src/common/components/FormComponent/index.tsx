"use client"

import { Modal, Form, Button, Input, Select } from "antd"
import { useEffect } from "react"

type FormType = "client" | "merchant"

interface FormComponentProps<T> {
  visible: boolean
  title: string
  initialValues?: T
  onSubmit: (values: T) => void
  onCancel: () => void
  submitText?: string
  formType: FormType
}

const FormComponent = <T extends Record<string, any>>({
  visible,
  title,
  initialValues,
  onSubmit,
  onCancel,
  submitText = initialValues ? "Save Changes" : "Create",
  formType,
}: FormComponentProps<T>) => {
  const [form] = Form.useForm<T>()

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues, form])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      onSubmit(values)
    } catch (error) {
      console.error("Validation error:", error)
    }
  }

  return (
    <Modal
      open={visible}
      title={title}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {submitText}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {formType === "client" ? (
          <>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input placeholder="Client Name" />
            </Form.Item>
            <Form.Item
              label="Surname"
              name="surname"
              rules={[{ required: true, message: "Please enter the surname" }]}
            >
              <Input placeholder="Client Surname" />
            </Form.Item>
            <Form.Item
              label="CIF/NIF/NIE"
              name="cifNifNie"
              rules={[
                { required: true, message: "Please enter the CIF/NIF/NIE" },
              ]}
            >
              <Input placeholder="Client CIF/NIF/NIE" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please enter the phone" }]}
            >
              <Input placeholder="Client Phone" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter the email" }]}
            >
              <Input placeholder="Client Email" />
            </Form.Item>
          </>
        ) : formType === "merchant" ? (
          <>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input placeholder="Merchant Name" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter the address" }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item
              label="Client ID"
              name="clientId"
              rules={[
                { required: true, message: "Please enter the Client ID" },
              ]}
            >
              <Input placeholder="Client Identifier" />
            </Form.Item>
            <Form.Item
              label="Merchant Type"
              name="merchantType"
              rules={[
                {
                  required: true,
                  message: "Please select the merchant type",
                },
              ]}
            >
              <Select placeholder="Select a type">
                <Select.Option value="MERCHANT_TYPE_PERSONAL_SERVICES">
                  Personal Services
                </Select.Option>
                <Select.Option value="MERCHANT_TYPE_FINANCIAL_SERVICES">
                  Financial Services
                </Select.Option>
              </Select>
            </Form.Item>
          </>
        ) : null}
      </Form>
    </Modal>
  )
}

export default FormComponent

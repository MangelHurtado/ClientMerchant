"use client"

import { Modal, Form, Input, Select, Button } from "antd"
import { Client } from "@/common/types/client"
import { useEffect } from "react"

interface ClientFormComponentProps {
  visible: boolean
  initialValues?: Client
  onSubmit: (values: Client) => void
  onCancel: () => void
}

const ClientFormComponent = ({
  visible,
  initialValues,
  onSubmit,
  onCancel,
}: ClientFormComponentProps) => {
  const [form] = Form.useForm()

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
      console.error("Form error:", error)
    }
  }

  return (
    <Modal
      open={visible}
      title={initialValues ? "Edit Client" : "Create Client"}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {initialValues ? "Save Changes" : "Create"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
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
          rules={[{ required: true, message: "Please enter the CIF/NIF/NIE" }]}
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
      </Form>
    </Modal>
  )
}

export default ClientFormComponent

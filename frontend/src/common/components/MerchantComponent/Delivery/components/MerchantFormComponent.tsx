"use client"

import { Modal, Form, Input, Select, Button } from "antd"
import { Merchant } from "@/common/components/MerchantComponent/Delivery/interface"
import { useEffect } from "react"

interface MerchantFormComponentProps {
  visible: boolean
  initialValues?: Merchant
  onSubmit: (values: Merchant) => void
  onCancel: () => void
}

const MerchantFormComponent = ({
  visible,
  initialValues,
  onSubmit,
  onCancel,
}: MerchantFormComponentProps) => {
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
      title={initialValues ? "Edit Merchant" : "Create Merchant"}
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
          rules={[{ required: true, message: "Please enter the Client ID" }]}
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
      </Form>
    </Modal>
  )
}

export default MerchantFormComponent

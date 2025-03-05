"use client"

import { Modal, Form, Input, Select, Button } from "antd"
import { Merchant } from "@/common/types/merchant"
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
      console.error("Error en el formulario:", error)
    }
  }

  return (
    <Modal
      open={visible}
      title={initialValues ? "Editar Merchant" : "Crear Merchant"}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {initialValues ? "Guardar cambios" : "Crear"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Por favor ingresa el nombre" }]}
        >
          <Input placeholder="Nombre del Merchant" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: "Por favor ingresa la dirección" },
          ]}
        >
          <Input placeholder="Dirección" />
        </Form.Item>
        <Form.Item
          label="Client ID"
          name="clientId"
          rules={[
            { required: true, message: "Por favor ingresa el Client ID" },
          ]}
        >
          <Input placeholder="Identificador del cliente" />
        </Form.Item>
        <Form.Item
          label="Merchant Type"
          name="merchantType"
          rules={[
            {
              required: true,
              message: "Por favor selecciona el tipo de merchant",
            },
          ]}
        >
          <Select placeholder="Selecciona un tipo">
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

import { Button, Form, Input, Space } from "antd";
import { useState } from "react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

type FormValues = { characterName: string; tvShow: string };

export default function SearchForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [disabledSearch, setDisabledSearch] = useState(true);

  const onReset = () => {
    form.resetFields();
  };

  const onValuesChange = (_: unknown, allValues: FormValues) => {
    const { characterName, tvShow } = allValues;

    if (!characterName && !tvShow) {
      setDisabledSearch(true);
    } else {
      setDisabledSearch(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      // API call
      console.log("Form submitted with values:", values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      {...layout}
      form={form}
      name="searchCharacterForm"
      onValuesChange={onValuesChange}
      onFinish={onSubmit}
      style={{ minWidth: 330 }}
    >
      <Form.Item name="characterName" label="Character name">
        <Input />
      </Form.Item>
      <Form.Item name="tvShow" label="Tv show">
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={disabledSearch}
          >
            Search
          </Button>
          <Button htmlType="button" onClick={onReset} disabled={loading}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

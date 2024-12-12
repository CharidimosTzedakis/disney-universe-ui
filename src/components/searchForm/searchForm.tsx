import { Button, Form, Input, Space } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function SearchForm() {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="searchCharacterForm"
      // onFinish={onFinish}
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
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

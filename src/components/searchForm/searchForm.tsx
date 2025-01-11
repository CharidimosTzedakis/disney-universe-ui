import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { Button, Form, Input, Space } from "antd";
import useSearchStore from "@stores/searchStore";

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
  const [disabledSearch, setDisabledSearch] = useState(true);

  const { setSearchFilter, isLoading } = useSearchStore(
    useShallow((state) => ({
      setSearchFilter: state.setSearchFilter,
      isLoading: state.isLoading,
    })),
  );

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
    const { characterName, tvShow } = values;
    setSearchFilter({ name: characterName, tvShow });
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
        <Input disabled={isLoading} />
      </Form.Item>
      <Form.Item name="tvShow" label="Tv show">
        <Input disabled={isLoading} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={disabledSearch}
          >
            Search
          </Button>
          <Button htmlType="button" onClick={onReset} disabled={isLoading}>
            Clear fields
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

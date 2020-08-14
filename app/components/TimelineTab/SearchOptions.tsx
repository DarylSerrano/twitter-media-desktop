import React from 'react';
import { Form, Input, Button, Radio } from 'antd';

type FormValues = {
  searchData: string;
  searchType: string;
};

export default function SearchOptions() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const l = values;
    console.log(l);
  };

  const onReset = () => {
    form.resetFields();
  };

  const initialValues: FormValues = {
    searchData: '',
    searchType: 'any',
  };

  return (
    <Form form={form} onFinish={onFinish} initialValues={initialValues}>
      <Form.Item name="searchData" label="Search" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="searchType"
        label="Search by"
        rules={[{ required: true }]}
      >
        <Radio.Group defaultValue="any">
          <Radio value="any">Any</Radio>
          <Radio value="userId">User id</Radio>
          <Radio value="screenName">Screen name</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}

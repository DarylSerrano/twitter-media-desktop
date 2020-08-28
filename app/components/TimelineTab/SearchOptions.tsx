import React from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';

type FormValues = {
  searchData: string;
  searchType: 'userId' | 'screenName' | 'any';
};

type SearchOptionsProps = {
  onSubmit: (values: FormValues) => void;
};

export default function SearchOptions({ onSubmit }: SearchOptionsProps) {
  const { loggedIn } = useSelector((state: RootState) => state.authetication);
  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    const val = values as FormValues;
    onSubmit(val);
  };

  const onReset = () => {
    form.resetFields();
  };

  const initialValues: FormValues = {
    searchData: '',
    searchType: 'screenName',
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
        <Radio.Group>
          <Radio value="any" disabled={!loggedIn}>
            Any
          </Radio>
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

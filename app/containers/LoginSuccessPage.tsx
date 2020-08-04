import React from 'react';
import { Result } from 'antd';

export default function LoginSuccessPage() {
  return (
    <Result
      status="success"
      title="Successfully Logged in to your twitter account!"
      subTitle="Close this window"
    />
  );
}

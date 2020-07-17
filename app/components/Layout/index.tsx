import React, { ReactNode } from 'react';
import { Layout } from 'antd';

import Sidebar from '../Sidebar';

const { Content } = Layout;

type Props = {
  children: ReactNode;
};

export default function AppLayout(props: Props) {
  const { children } = props;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Content style={{ margin: '0 18px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

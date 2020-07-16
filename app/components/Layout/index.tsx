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
    <Layout>
      <Sidebar />
      <Layout>
        <Content style={{ margin: '0 16px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

import React from 'react';

import { Layout, Menu } from 'antd';
import {
  UnorderedListOutlined,
  HomeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import routes from '../../constants/routes.json';
import styles from './sidebar.css';

const { Sider } = Layout;

export default function Sidebar() {
  return (
    <Sider collapsible>
      <div className={styles.logo} />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to={routes.HOME}>Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<SearchOutlined />}>
          Seach
        </Menu.Item>
        <Menu.Item key="3" icon={<UnorderedListOutlined />}>
          Timelines
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

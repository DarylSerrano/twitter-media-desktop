import React from 'react';

import { Layout, Menu } from 'antd';
import { ipcRenderer } from 'electron';
import {
  UnorderedListOutlined,
  HomeOutlined,
  SearchOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import routes from '../../constants/routes.json';
import styles from './sidebar.css';
import { CHANNEL_NAME } from '../../interfaces/Login';

const { Sider } = Layout;

export default function Sidebar() {
  const onLogin = async () => {
    await ipcRenderer.invoke(CHANNEL_NAME);
  };

  return (
    <Sider
      collapsible
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
    >
      <div className={styles.logo} />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to={routes.HOME}>Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<SearchOutlined />}>
          Seach
        </Menu.Item>
        <Menu.Item key="3" icon={<UnorderedListOutlined />}>
          <Link to={routes.TIMELINE}>Timelines</Link>
        </Menu.Item>
        <Menu.Item onClick={onLogin} key="4" icon={<LoginOutlined />}>
          Login
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

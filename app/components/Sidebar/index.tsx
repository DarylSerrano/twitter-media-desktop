import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Layout, Menu } from 'antd';
import { ipcRenderer } from 'electron';
import {
  UnorderedListOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import routes from '../../constants/routes.json';
import styles from './sidebar.css';
import { LOGIN_CHANNEL_NAME } from '../../interfaces/Login';
import { RootState } from '../../store';

import { logoutUser } from '../../reducers/authenticationReducer';

const { Sider } = Layout;

export default function Sidebar() {
  const dispatch = useDispatch();

  const { loggedIn, userId, userName } = useSelector(
    (state: RootState) => state.authetication
  );

  const onLoginLogout = async () => {
    if (loggedIn) {
      dispatch(logoutUser());
    } else {
      await ipcRenderer.invoke(LOGIN_CHANNEL_NAME);
    }
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
      <div className={loggedIn ? styles.logo : styles.logoLoggedIn}>
        {loggedIn ? `Logged as: ${userName} with id: ${userId}` : null}
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to={routes.HOME}>Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UnorderedListOutlined />}>
          <Link to={routes.TIMELINE}>Timelines</Link>
        </Menu.Item>
        <Menu.Item
          onClick={onLoginLogout}
          key="4"
          icon={loggedIn ? <LogoutOutlined /> : <LoginOutlined />}
        >
          {loggedIn ? `Logout` : `Login`}
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

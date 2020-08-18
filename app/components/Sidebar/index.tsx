import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Layout, Menu } from 'antd';
import { ipcRenderer } from 'electron';
import {
  UnorderedListOutlined,
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

  const { loggedIn, userName } = useSelector(
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
      <div className={styles.logo}>
        <p style={{ color: 'white' }}>
          {loggedIn ? `Logged as: ${userName}` : null}
        </p>
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<UnorderedListOutlined />}>
          <Link to={routes.HOME}>Tweets</Link>
        </Menu.Item>
        <Menu.Item
          onClick={onLoginLogout}
          key="2"
          icon={loggedIn ? <LogoutOutlined /> : <LoginOutlined />}
        >
          {loggedIn ? `Logout` : `Login`}
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

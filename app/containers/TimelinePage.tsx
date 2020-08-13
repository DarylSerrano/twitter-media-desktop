/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { Tabs } from 'antd';
import { HomeFilled, SearchOutlined } from '@ant-design/icons';
import Timeline from '../components/Timeline';

const { TabPane } = Tabs;

export default function TimelinePage() {
  return (
    <Tabs centered defaultActiveKey="Search" type="card">
      <TabPane
        tab={
          <span>
            <SearchOutlined />
            Search
          </span>
        }
        key="Search"
      >
        Search Here
      </TabPane>
      <TabPane
        tab={
          <span>
            <HomeFilled />
            Home
          </span>
        }
        key="Home"
      >
        <Timeline count={5} user_id="2151128746" />
      </TabPane>
    </Tabs>
  );
}

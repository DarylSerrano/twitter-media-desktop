/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { Tabs, Result } from 'antd';
import { HomeFilled, SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Timeline from '../components/Timeline';
import TimelineTab from '../components/TimelineTab';
import { RootState } from '../store';

const { TabPane } = Tabs;

export default function TimelinePage() {
  const { loggedIn } = useSelector((state: RootState) => state.authetication);

  return (
    <Tabs centered defaultActiveKey="Search" type="card">
      <TabPane
        tab={
          <span>
            <SearchOutlined />
            Search user tweets
          </span>
        }
        key="Search"
      >
        <TimelineTab />
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
        {loggedIn ? (
          <Timeline count={5} userHome />
        ) : (
          <Result
            status="warning"
            title="Not logged in"
            subTitle="Please log in in order to get Home timeline"
          />
        )}
      </TabPane>
    </Tabs>
  );
}

import React from 'react';
import { Collapse } from 'antd';
import SearchOptions from './SearchOptions';

const { Panel } = Collapse;

export default function TimelineTab() {
  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header="Search options" key="1">
        <SearchOptions />
      </Panel>
      <Panel header="Timeline" key="2">
        <p>Timeline here</p>
      </Panel>
    </Collapse>
  );
}

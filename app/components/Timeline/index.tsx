import React, { useEffect, useState } from 'react';
import { Spin, Space, List, Button } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import TweetMini from '../Tweet/Tweet-mini';
import { Tweet } from '../../interfaces/Tweet';
import {
  NavigatorType,
  TimelineNavigationParams,
} from '../../interfaces/Timelines';
import { filterMediaOnly } from '../../lib/renderer/TweetFiltering';
import * as Navigator from '../../lib/renderer/Timeline/TimelineNavigator';

enum FetchState {
  FETCHING,
  ERROR,
  FETCHED,
  IDDLE,
}

type TimelineProps = {
  user_id?: string;
  userHome?: boolean;
  count?: number;
};

export default function Timeline({
  user_id,
  count = 5,
  userHome = false,
}: TimelineProps) {
  const [resposeData, setResposeData] = useState<Tweet[]>([]);
  const [fetchState, setfetchState] = useState<FetchState>(FetchState.IDDLE);
  const [sinceId, setSinceId] = useState<number>(0);
  const [maxId, setMaxId] = useState<number>(0);

  const timelineNavigationParanms: TimelineNavigationParams = userHome
    ? { type: NavigatorType.LOGED_USER }
    : { type: NavigatorType.USER_ID, searchData: user_id };

  const fetchTimeline = async () => {
    setfetchState(FetchState.FETCHING);

    const response = await Navigator.getStatus(timelineNavigationParanms, {
      count,
    });

    setResposeData(response.data);
    setfetchState(FetchState.FETCHED);
    setMaxId(response.maxId);
    setSinceId(response.sinceId);
  };

  const onGetMoreStatus = async () => {
    setfetchState(FetchState.FETCHING);

    const response = await Navigator.getOldStatus(timelineNavigationParanms, {
      maxId,
      count,
    });

    setResposeData((previousData) => {
      const oldStatus: Tweet[] = JSON.parse(JSON.stringify(previousData));
      const filteredReceivedStatus = response.data.filter(
        (newStatus) =>
          !oldStatus.some(
            (savedStatus) => savedStatus.id_str === newStatus.id_str
          )
      );
      const newAndOldStatus = [...oldStatus, ...filteredReceivedStatus];

      return newAndOldStatus;
    });

    setfetchState(FetchState.FETCHED);
    setMaxId(response.maxId);
  };

  const onUpdateStatus = async () => {
    setfetchState(FetchState.FETCHING);

    const response = await Navigator.getNewStatus(timelineNavigationParanms, {
      sinceId,
      count,
    });

    setResposeData((previousData) => {
      const newData: Tweet[] = JSON.parse(JSON.stringify(previousData));
      newData.unshift(...response.data);
      return newData;
    });

    setfetchState(FetchState.FETCHED);
    setSinceId(response.sinceId);
  };

  useEffect(() => {
    fetchTimeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={() => onGetMoreStatus()}>Load more</Button>
    </div>
  );

  if (!resposeData) {
    return <Spin size="large" />;
  }

  return (
    <Space direction="vertical" size="middle" align="center">
      <Button icon={<RedoOutlined />} onClick={() => onUpdateStatus()}>
        Update
      </Button>
      <List
        grid={{
          gutter: 12,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        loading={fetchState === FetchState.FETCHING}
        renderItem={(item: Tweet) => (
          <List.Item>
            <TweetMini content={item} />
          </List.Item>
        )}
        loadMore={loadMore}
        dataSource={filterMediaOnly(resposeData)}
      />
    </Space>
  );
}

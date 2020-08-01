import React, { useEffect, useState } from 'react';
import { Spin, Space, List, Button } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import TweetMini from '../Tweet/Tweet-mini';
import { Tweet } from '../../interfaces/Tweet';
import { NavigatorType } from '../../interfaces/Timelines';
import { isMedia } from '../../lib/TweetFiltering';
import * as Navigator from '../../lib/TimelineNavigator';

enum FetchState {
  FETCHING,
  ERROR,
  FETCHED,
  IDDLE,
}

type TimelineProps = {
  user_id: string;
  screen_name?: string;
  count?: number;
};

export default function Timeline(props: TimelineProps) {
  const [resposeData, setResposeData] = useState<Tweet[]>([]);
  const [fetchState, setfetchState] = useState<FetchState>(FetchState.IDDLE);
  const [sinceId, setSinceId] = useState<number>(0);
  const [maxId, setMaxId] = useState<number>(0);

  const fetchTimeline = async () => {
    setfetchState(FetchState.FETCHING);

    const response = await Navigator.getStatus(
      {
        type: NavigatorType.USER_ID,
        searchData: props.user_id,
      },
      {}
    );

    console.log(JSON.stringify(response.data));

    setResposeData(response.data);
    setfetchState(FetchState.FETCHED);
    setMaxId(response.maxId);
    setSinceId(response.sinceId);
  };

  const onGetMoreStatus = async () => {
    setfetchState(FetchState.FETCHING);

    const response = await Navigator.getOldStatus(
      {
        type: NavigatorType.USER_ID,
        searchData: props.user_id,
      },
      { maxId }
    );

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

    const response = await Navigator.getNewStatus(
      {
        type: NavigatorType.USER_ID,
        searchData: props.user_id,
      },
      { sinceId }
    );

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
        dataSource={resposeData.filter((contentToFilter) =>
          isMedia(contentToFilter)
        )}
      />
    </Space>
  );
}

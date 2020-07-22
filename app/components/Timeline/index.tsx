import React, { useEffect, useState } from 'react';
import { Spin, Space, List, Button } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import TweetMini from '../Tweet/Tweet-mini';
import { Tweet, Media, Type, Variant } from '../../data/Tweet';

export const isVideo = (media: Media) =>
  media.type === Type.AnimatedGif || media.type === Type.Video;

export const isPhoto = (media: Media) => media.type === Type.Photo;

export const isContentTypeVideo = (variant: Variant) =>
  variant.content_type.includes('video/mp4');

export function onlyMedia(content: Tweet): boolean {
  const isMedia =
    !!content.entities.media &&
    content.entities.media?.every((media) => isPhoto(media));

  console.log(`isMedia: ${isMedia}`);

  return isMedia;
}

export function hasVideo(content: Tweet): boolean {
  const hasVideoMedia =
    !!content.extended_entities &&
    content.extended_entities?.media.some((media) => isVideo(media));

  return hasVideoMedia;
}

export function getVideoUrl(content: Tweet) {
  const mediaFound = content.extended_entities?.media.find((media) =>
    isVideo(media)
  );

  if (mediaFound) {
    const variantFound = mediaFound.video_info?.variants.find((variant) =>
      isContentTypeVideo(variant)
    );
    if (variantFound) {
      return variantFound.url;
    }
  }

  return undefined;
}

function getMaxId(statuses: Tweet[], previousMaxId?: number) {
  let maxIdFetched = previousMaxId || Number.MAX_VALUE;
  statuses.forEach((tweet) => {
    console.log(`id: ${tweet.id}`);
    if (tweet.id < maxIdFetched) {
      maxIdFetched = tweet.id;
      console.log(`id: ${tweet.id}`);
      console.log(`string id: ${tweet.id_str}`);
    }
  });
  console.log(`maxid: ${maxIdFetched}`);
  return maxIdFetched;
}

function getSinceId(statuses: Tweet[], previousSinceId?: number) {
  let sinceIdFetched = previousSinceId || 0;
  statuses.forEach((tweet) => {
    console.log(`id: ${tweet.id}`);
    if (tweet.id > sinceIdFetched) {
      sinceIdFetched = tweet.id;
      console.log(`id: ${tweet.id}`);
      console.log(`string id: ${tweet.id_str}`);
    }
  });
  console.log(`sinceId: ${sinceIdFetched}`);
  return sinceIdFetched;
}

enum TimelineState {
  MOUNT,
  INITIALIZED,
}

enum FetchState {
  FETCHING,
  ERROR,
  FETCHED,
  IDDLE,
}

type TimelineProps = {
  user_id: string;
  screen_name?: string;
  count: 5 | number;
};

export default function Timeline(props: TimelineProps) {
  const [resposeData, setResposeData] = useState<Tweet[]>([]);
  const [status, setStatus] = useState<TimelineState>(TimelineState.MOUNT);
  const [fetchState, setfetchState] = useState<FetchState>(FetchState.IDDLE);
  const [sinceId, setSinceId] = useState('');
  const [maxId, setMaxId] = useState('');

  const fetchTimeline = async () => {
    const url = new URL('http://127.0.0.1:4200/api/statuses/user_timeline');
    url.searchParams.append('id', props.user_id);
    url.searchParams.append('count', props.count.toString());
    setfetchState(FetchState.FETCHING);

    const response = await fetch(url.toString());
    const body: Tweet[] = await response.json();

    console.log(JSON.stringify(body));

    setResposeData(body);
    setStatus(TimelineState.INITIALIZED);
    setfetchState(FetchState.FETCHED);
    setMaxId(getMaxId(body).toString());
    setSinceId(getSinceId(body).toString());
  };

  const onGetMoreStatus = async () => {
    const url = new URL('http://127.0.0.1:4200/api/statuses/user_timeline');
    url.searchParams.append('id', props.user_id);
    url.searchParams.append('count', props.count.toString());
    url.searchParams.append('max_id', maxId);

    setfetchState(FetchState.FETCHING);
    const response = await fetch(url.toString());
    const body: Tweet[] = await response.json();

    setResposeData((previousData) => {
      const oldStatus: Tweet[] = JSON.parse(JSON.stringify(previousData));
      const filteredReceivedStatus = body.filter(
        (newStatus) =>
          !oldStatus.some(
            (savedStatus) => savedStatus.id_str === newStatus.id_str
          )
      );
      const newAndOldStatus = [...oldStatus, ...filteredReceivedStatus];

      return newAndOldStatus;
    });

    setfetchState(FetchState.FETCHED);
    setMaxId(getMaxId(body, Number(maxId)).toString());
  };

  const onUpdateStatus = async () => {
    const url = new URL('http://127.0.0.1:4200/api/statuses/user_timeline');
    url.searchParams.append('id', props.user_id);
    url.searchParams.append('count', props.count.toString());
    url.searchParams.append('since_id', sinceId);

    setfetchState(FetchState.FETCHING);
    const response = await fetch(url.toString());
    const body: Tweet[] = await response.json();

    setResposeData((previousData) => {
      const newData: Tweet[] = JSON.parse(JSON.stringify(previousData));
      newData.unshift(...body);
      return newData;
    });
    setfetchState(FetchState.FETCHED);
    setSinceId(getSinceId(body, Number(sinceId)).toString());
  };

  useEffect(() => {
    // if (status === TimelineState.MOUNT)
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
          onlyMedia(contentToFilter)
        )}
      />
    </Space>
  );
}

import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Space } from 'antd';
import TweetMini from '../Tweet/Tweet-mini';
import { Tweet, PurpleMedia, Type } from '../../data/Tweet';

function onlyMedia(content: Tweet): boolean {
  // For now just only filer images
  const isPhoto = (media: PurpleMedia) => media.type === Type.Photo;
  return (
    !!content.entities.media &&
    content.entities.media?.every((media) => isPhoto(media))
  );
}

export default function Timeline() {
  const [resposeData, setResposeData] = useState<Tweet[] | null>(null);

  async function fetchTimeline() {
    const url = new URL('http://127.0.0.1:4200/api/statuses/user_timeline');
    url.searchParams.append('id', '389430988');
    url.searchParams.append('count', '12');
    const response = await fetch(url.toString());
    const body = (await response.json()) as Tweet[];
    setResposeData(body);
  }

  useEffect(() => {
    fetchTimeline();
  });

  if (!resposeData) {
    return <Spin size="large" />;
  }

  return (
    <Space direction="vertical">
      {resposeData
        .filter((contentToFilter) => onlyMedia(contentToFilter))
        .map((tweet) => (
          <Row key={tweet.id}>
            <Col>
              <TweetMini content={tweet} />
            </Col>
          </Row>
        ))}
    </Space>
  );
}

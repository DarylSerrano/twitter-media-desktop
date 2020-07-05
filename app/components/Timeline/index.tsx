import React, { useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import TweetMini from '../Tweet/Tweet-mini';
import { Tweet } from '../../data/Tweet';

export default function Timeline() {
  const [resposeData, setResposeData] = useState<Tweet[] | null>(null);

  async function fetchTimeline() {
    const url = new URL('http://127.0.0.1:4200/api/statuses/user_timeline');
    url.searchParams.append('id', '2151128746');
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
    <>
      {resposeData.map((tweet) => (
        <Row key={tweet.id}>
          <Col>
            <TweetMini content={tweet} />
          </Col>
        </Row>
      ))}
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Tweet } from '../../data/Tweet';

export default function Tweets() {
  const [resposeData, setResposeData] = useState<Tweet[] | null>(null);

  async function fetchTimeline() {
    const url = new URL('http://127.0.0.1:4200/api/statuses/show');
    url.searchParams.append('id', '2151128746');
    url.searchParams.append('count', '5');
    const response = await fetch(url.toString());
    const body = (await response.json()) as Tweet[];
    setResposeData(body);
  }

  useEffect(() => {
    fetchTimeline();
  });

  if (!resposeData) {
    return <p>Wait</p>;
  }

  return (
    <div>
      {resposeData.map((tweet) => (
        <Card title="Tweet" key={tweet.id}>
          <p>{tweet.text}</p>
        </Card>
      ))}
    </div>
  );
}

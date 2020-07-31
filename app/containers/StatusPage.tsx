import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Result, Spin } from 'antd';
import Status from '../components/Tweet';
import { onlyMedia } from '../components/Timeline';

import { Tweet } from '../interfaces/Tweet';

type StatusParams = { id: string };

export default function StatusPage() {
  const { id } = useParams<StatusParams>();

  const [resposeData, setResposeData] = useState<Tweet | null>(null);

  async function fetchTweet() {
    const url = new URL('http://127.0.0.1:4200/api/statuses/show');
    url.searchParams.append('id', id);
    const response = await fetch(url.toString());
    const body = (await response.json()) as Tweet;
    setResposeData(body);
  }

  useEffect(() => {
    if (!resposeData) {
      fetchTweet();
    }
  });

  if (!resposeData) {
    return <Spin size="large" />;
  }

  if (onlyMedia(resposeData)) {
    return <Status content={resposeData} />;
  }

  return <Result title="No media tweet" status="error" />;
}

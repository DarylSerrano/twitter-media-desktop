import React from 'react';
import { Button, Card, Carousel } from 'antd';
import {
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

import { Tweet, Type } from '../../data/Tweet';

type TweetProps = { content: Tweet };

export default function Status({ content }: TweetProps) {
  return (
    <Card
      title={content.id_str}
      actions={[
        <Button key="Like" shape="round" icon={<HeartOutlined />}>
          Like
        </Button>,
        <Button key="Reply" shape="round" icon={<CommentOutlined />}>
          Reply
        </Button>,
        <Button key="Share" shape="round" icon={<ShareAltOutlined />}>
          Share
        </Button>,
      ]}
    >
      <Carousel>
        {content.entities.media
          ?.filter((m) => m.type === Type.Photo)
          .map((media) => (
            <div key={media.id_str}>
              <img alt={media.id_str} src={media.media_url_https} />
            </div>
          ))}
      </Carousel>
    </Card>
  );
}

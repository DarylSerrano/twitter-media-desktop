import React from 'react';
import { Button, Card } from 'antd';
import ImageGallery from 'react-image-gallery';
import {
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

import { Tweet, Type } from '../../data/Tweet';

type TweetProps = { content: Tweet };

export default function Status({ content }: TweetProps) {
  let entitiesMedia = content.entities.media
    ? content.entities.media
        .filter((m) => m.type === Type.Photo)
        .map((media) => {
          return {
            original: media.media_url_https,
          };
        })
    : [];

  if (content.extended_entities) {
    entitiesMedia = content.extended_entities.media
      .filter((m) => m.type === Type.Photo)
      .map((media) => {
        return {
          original: media.media_url_https,
        };
      });
  }

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
      <ImageGallery items={entitiesMedia} />
    </Card>
  );
}

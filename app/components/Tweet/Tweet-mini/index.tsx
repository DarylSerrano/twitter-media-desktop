/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { Card, Avatar, Button } from 'antd';
import {
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

import { Tweet, Type } from '../../../data/Tweet';

const { Meta } = Card;

type TweetMiniProps = { content: Tweet };

export default function TweetMini({ content }: TweetMiniProps) {
  return (
    <Card
      hoverable
      cover={
        <img
          alt="example"
          src={
            content.entities.media?.find((m) => m.type === Type.Photo)
              ?.media_url_https
          }
        />
      }
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
      <Meta
        avatar={
          content.retweeted_status ? (
            <Avatar
              src={content.retweeted_status.user.profile_image_url_https}
            />
          ) : (
            <Avatar src={content.user.profile_image_url_https} />
          )
        }
        title={
          content.retweeted_status
            ? content.retweeted_status.user.name
            : content.user.name
        }
        description={
          content.retweeted_status
            ? `${content.user.name} Retweeted
        ${content.text}`
            : content.text
        }
      />
    </Card>
  );
}

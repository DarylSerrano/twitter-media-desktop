/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { Card, Avatar, Button } from 'antd';
import {
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

import { Tweet } from '../../../data/Tweet';

const { Meta } = Card;

type TweetMiniProps = { content: Tweet };

export default function TweetMini({ content }: TweetMiniProps) {
  return (
    <Card
      hoverable
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
        avatar={<Avatar src={content.user.profile_image_url_https} />}
        title={content.user.name}
        description={content.text}
      />
    </Card>
  );
}

/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Card, Avatar, Button } from 'antd';
import {
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { Tweet, Type } from '../../../interfaces/Tweet';

const { Meta } = Card;

type TweetMiniProps = { content: Tweet };

export default function TweetMini({ content }: TweetMiniProps) {
  const history = useHistory();

  function clickImage() {
    history.push(`/status/${content.id_str}`);
  }

  return (
    <Card
      hoverable
      size="small"
      cover={
        <img
          onClick={clickImage}
          alt="example"
          src={
            content.entities.media?.find((m) => m.type === Type.Photo)
              ?.media_url_https
          }
        />
      }
      actions={[
        <Button key="Like" shape="round" icon={<HeartOutlined />} />,
        <Button key="Reply" shape="round" icon={<CommentOutlined />} />,
        <Button key="Share" shape="round" icon={<ShareAltOutlined />} />,
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

/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { clipboard } from 'electron';
import { useSelector } from 'react-redux';
import { Card, Avatar, Button, notification } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { FaRetweet } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

import { useHistory } from 'react-router-dom';

import { Tweet, Type } from '../../../interfaces/Tweet';

import { getStatusURL } from '../../../lib/renderer/TweetFiltering';

import ShareModal from '../../ShareModal';

import postService from '../../../lib/renderer/postService';
import { RootState } from '../../../store';

const { Meta } = Card;

type TweetMiniProps = { content: Tweet };

export default function TweetMini({ content }: TweetMiniProps) {
  const history = useHistory();
  const { loggedIn } = useSelector((state: RootState) => state.authetication);

  const [modalVisible, setModalVisible] = useState(false);

  function clickImage() {
    history.push(`/status/${content.id_str}`);
  }

  const onLike = async () => {
    try {
      await postService.likeTweet(content);
      notification.success({ message: 'Liked' });
    } catch (err) {
      notification.error({ message: `${err.message}` });
    }
  };

  const onRetweet = async () => {
    try {
      await postService.retweetTweet(content);
      notification.success({ message: 'Retweeted' });
    } catch (err) {
      notification.error({ message: `${err.message}` });
    }
  };

  const onCopy = () => {
    const statusUrl = getStatusURL(content);
    if (statusUrl) {
      clipboard.writeText(statusUrl);
      notification.success({ message: 'Copy link to clipboard' });
    } else {
      notification.warning({ message: 'Could not copy link to clipboard' });
    }
  };

  return (
    <>
      <ShareModal
        url={getStatusURL(content) || ''}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
        onCopy={onCopy}
      />
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
          <Button
            key="Like"
            shape="round"
            icon={<FcLike />}
            onClick={onLike}
            disabled={!loggedIn}
          />,
          <Button
            key="Retweet"
            shape="round"
            icon={<FaRetweet />}
            onClick={onRetweet}
            disabled={!loggedIn}
          />,
          <Button
            key="Share"
            shape="round"
            icon={<ShareAltOutlined />}
            onClick={() => setModalVisible(true)}
          />,
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
    </>
  );
}

import React, { useState } from 'react';
import { Button, Card, notification, Descriptions } from 'antd';
import ImageGallery from 'react-image-gallery';
import { ShareAltOutlined, DownloadOutlined } from '@ant-design/icons';

import { FaRetweet } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

import { ipcRenderer, clipboard } from 'electron';
import ResponsivePlayer from '../ResponsivePlayer';

import {
  hasVideo,
  getVideoUrl,
  getStatusURL,
  getImageUrls,
  getGalleryData,
} from '../../lib/renderer/TweetFiltering';

import { Tweet } from '../../interfaces/Tweet';
import {
  DownloadParams,
  DownloadActions,
  DownloadResponse,
  CHANNEL_NAME,
} from '../../interfaces/Download';

import ShareModal from '../ShareModal';

type TweetProps = { content: Tweet };

export default function Status({ content }: TweetProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const onDownload = async () => {
    try {
      const urls: string[] = [];

      if (hasVideo(content)) {
        const urlVideo = getVideoUrl(content);
        if (urlVideo) {
          urls.push(urlVideo);
        }
      } else {
        urls.push(...getImageUrls(content));
      }

      const data: DownloadParams = {
        mediaUrls: urls,
      };

      const res: DownloadResponse = await ipcRenderer.invoke(
        CHANNEL_NAME,
        data
      );

      if (res.status === DownloadActions.FAIL) {
        notification.error({
          message: res.message ? res.message : 'Error downloading',
        });
      } else {
        notification.success({ message: 'Success downloading' });
      }
    } catch (err) {
      notification.error({ message: JSON.stringify(err) });
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

  const onLike = () => {};

  const onRetweet = () => {};

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
        title="Tweet"
        actions={[
          <Button
            key="Reply"
            shape="round"
            onClick={() => onDownload()}
            icon={<DownloadOutlined />}
          />,
          <Button
            key="Like"
            onClick={onLike}
            shape="round"
            icon={<FcLike />}
          />,
          <Button
            key="Retweet"
            onClick={onRetweet}
            shape="round"
            icon={<FaRetweet />}
          />,
          <Button
            key="Share"
            shape="round"
            onClick={() => setModalVisible(true)}
            icon={<ShareAltOutlined />}
          />,
        ]}
      >
        {hasVideo(content) ? (
          <ResponsivePlayer url={getVideoUrl(content)} controls loop />
        ) : (
          <ImageGallery items={getGalleryData(content)} />
        )}
        <Descriptions layout="vertical" column={1}>
          <Descriptions.Item style={{ textAlign: 'justify' }}>
            {content.text}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
}

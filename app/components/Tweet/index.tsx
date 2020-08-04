import React, { useState } from 'react';
import { Button, Card, notification } from 'antd';
import ImageGallery from 'react-image-gallery';
import {
  ShareAltOutlined,
  DownloadOutlined,
  CopyOutlined,
} from '@ant-design/icons';
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

  return (
    <>
      <ShareModal
        url={getStatusURL(content) || ''}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
      />
      <Card
        title={content.id_str}
        actions={[
          <Button
            key="Reply"
            shape="round"
            onClick={() => onDownload()}
            icon={<DownloadOutlined />}
          >
            Download
          </Button>,
          <Button
            key="Share"
            shape="round"
            onClick={() => setModalVisible(true)}
            icon={<ShareAltOutlined />}
          >
            Share
          </Button>,
          <Button
            key="Copy"
            onClick={onCopy}
            shape="round"
            icon={<CopyOutlined />}
          >
            Copy
          </Button>,
        ]}
      >
        {hasVideo(content) ? (
          <ResponsivePlayer url={getVideoUrl(content)} controls loop />
        ) : (
          <ImageGallery items={getGalleryData(content)} />
        )}
      </Card>
    </>
  );
}

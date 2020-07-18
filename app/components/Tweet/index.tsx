import React, { useState } from 'react';
import { Button, Card, notification, Drawer, Progress } from 'antd';
import ImageGallery from 'react-image-gallery';
import { ShareAltOutlined, DownloadOutlined } from '@ant-design/icons';
import { ipcRenderer } from 'electron';

import { Tweet, Type } from '../../data/Tweet';
import {
  DownloadParams,
  DownloadActions,
  DownloadResponse,
  CHANNEL_NAME,
} from '../../data/Download';

type TweetProps = { content: Tweet };

// TODO: Make ipcRenderer listen to channel +  remove listener on unmount

export default function Status({ content }: TweetProps) {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const onDownload = async () => {
    try {
      const urls = content.entities.media
        ? content.entities.media
            .filter((m) => m.type === Type.Photo)
            .map((media) => media.media_url_https)
        : [];

      // Potential flaw here
      const extendedUrls = content.extended_entities?.media
        ? content.extended_entities.media
            .filter((m) => m.type === Type.Photo)
            .map((media) => media.media_url_https)
        : [];

      // Add urls of extended_entities
      urls.push(...extendedUrls);

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

  const onCloseDrawer = () => setIsDrawerVisible(false);
  const onShowDrawer = () => setIsDrawerVisible(true);

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
    <>
      <Button onClick={onShowDrawer}>Show drawer</Button>
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
          <Button key="Share" shape="round" icon={<ShareAltOutlined />}>
            Share
          </Button>,
        ]}
      >
        <ImageGallery items={entitiesMedia} />
      </Card>
      <Drawer
        onClose={onCloseDrawer}
        visible={isDrawerVisible}
        mask={false}
        placement="bottom"
        title="Download status"
      >
        <Progress percent={50} status="active" />
      </Drawer>
    </>
  );
}

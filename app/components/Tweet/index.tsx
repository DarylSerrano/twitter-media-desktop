import React, { useState, useEffect } from 'react';
import { Button, Card, notification, Drawer, Progress } from 'antd';
import ImageGallery from 'react-image-gallery';
import { ShareAltOutlined, DownloadOutlined } from '@ant-design/icons';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { Map } from 'immutable';

import { Tweet, Type } from '../../data/Tweet';
import {
  DownloadParams,
  DownloadActions,
  DownloadResponse,
  CHANNEL_NAME,
} from '../../data/Download';

type TweetProps = { content: Tweet };

function parseFilename(url: string) {
  const filename = url.substring(url.lastIndexOf('/') + 1);
  console.log(filename);
  return filename;
}

export default function Status({ content }: TweetProps) {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const [downloadList, setDownloadList] = useState(Map<string, number>());

  const setupListeners = () => {
    ipcRenderer.on(CHANNEL_NAME, (event: IpcRendererEvent, data) => {
      const response: DownloadResponse = data;

      if (response.status === DownloadActions.PROGRESS) {
        console.log(`Progress: ${response.progress}`);
        const {
          progress: progressReceived = 0,
          filename = 'unknown Filename',
        } = response;
        const updatedMap = downloadList.set(filename, progressReceived * 100);
        console.log(
          `progress filename: ${filename} percentaje: ${progressReceived * 100}`
        );
        console.log(` downloadList: ${JSON.stringify(downloadList.toJSON())}`);
        console.log(` updatedMap: ${JSON.stringify(updatedMap.toJSON())}`);
        setDownloadList(updatedMap);
      }
    });
  };

  const unsetListeners = () => {
    ipcRenderer.removeAllListeners(CHANNEL_NAME);
  };

  const onDownload = async () => {
    try {
      const urls = content.entities.media
        ? content.entities.media
            .filter((m) => m.type === Type.Photo)
            .map((media) => media.media_url_https)
        : [];

      // FIXME: Potential flaw here
      const extendedUrls = content.extended_entities?.media
        ? content.extended_entities.media
            .filter((m) => m.type === Type.Photo)
            .map((media) => media.media_url_https)
        : [];

      // Add urls of extended_entities
      urls.push(...extendedUrls);

      // Set urls on downloadList
      const updatedDownloadList = downloadList.setIn(
        urls.map((url) => parseFilename(url)),
        0
      );

      setDownloadList(updatedDownloadList);

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

  useEffect(() => {
    setupListeners();
    return () => {
      unsetListeners();
    };
  }, []);

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

  const downloadInfo = [...downloadList.keys()].map((filename) => (
    <Progress
      key={filename}
      format={(percent) => `${filename} ${percent}%`}
      percent={downloadList.get(filename)}
    />
  ));

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
        height={200}
        placement="bottom"
        title="Download status"
      >
        {downloadInfo}
        {/* <Progress percent={progress} format={(percent) => `${percent}`} /> */}
      </Drawer>
    </>
  );
}

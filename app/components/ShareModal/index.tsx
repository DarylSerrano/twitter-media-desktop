import React from 'react';
import { Modal } from 'antd';
import {
  WhatsappShareButton,
  TelegramShareButton,
  FacebookShareButton,
  TelegramIcon,
} from 'react-share';
import { FacebookFilled, WhatsAppOutlined } from '@ant-design/icons';

type ShareModalProps = {
  url: string;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export default function ShareModal({
  url,
  visible,
  onOk,
  onCancel,
}: ShareModalProps) {
  return (
    <Modal
      title="Share"
      centered
      onOk={onOk}
      onCancel={onCancel}
      visible={visible}
      cancelButtonProps={{
        style: { display: 'none' },
      }}
    >
      <WhatsappShareButton url={url}>
        <WhatsAppOutlined />
      </WhatsappShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon />
      </TelegramShareButton>
      <FacebookShareButton url={url}>
        <FacebookFilled />
      </FacebookShareButton>
    </Modal>
  );
}

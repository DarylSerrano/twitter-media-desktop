import React from 'react';
import { Modal, List, Button } from 'antd';
import {
  WhatsappShareButton,
  TelegramShareButton,
  FacebookShareButton,
} from 'react-share';
import {
  FaClipboardCheck,
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
} from 'react-icons/fa';

type ShareModalProps = {
  url: string;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  onCopy: () => void;
};

export default function ShareModal({
  url,
  visible,
  onOk,
  onCancel,
  onCopy,
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
      <List>
        <List.Item>
          <WhatsappShareButton url={url}>
            <FaWhatsapp />
          </WhatsappShareButton>
        </List.Item>
        <List.Item>
          <TelegramShareButton url={url}>
            <FaTelegram />
          </TelegramShareButton>
        </List.Item>
        <List.Item>
          <FacebookShareButton url={url}>
            <FaFacebook />
          </FacebookShareButton>
        </List.Item>
        <List.Item>
          <Button icon={<FaClipboardCheck />} onClick={() => onCopy()} />
        </List.Item>
      </List>
    </Modal>
  );
}

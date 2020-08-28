import React from 'react';
import { Modal, Button, Row, Col } from 'antd';

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
  const style = { padding: '8px 0' };

  const iconSize = '2em';

  return (
    <Modal
      title="Share"
      centered
      onOk={onOk}
      onCancel={onCancel}
      visible={visible}
      okButtonProps={{
        style: { display: 'none' },
      }}
      cancelButtonProps={{
        style: { display: 'none' },
      }}
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <WhatsappShareButton url={url}>
              <FaWhatsapp size={iconSize} />
            </WhatsappShareButton>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <TelegramShareButton url={url}>
              <FaTelegram size={iconSize} />
            </TelegramShareButton>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <FacebookShareButton url={url}>
              <FaFacebook size={iconSize} />
            </FacebookShareButton>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <Button
              icon={<FaClipboardCheck size={iconSize} />}
              style={{ borderStyle: 'none' }}
              onClick={() => onCopy()}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

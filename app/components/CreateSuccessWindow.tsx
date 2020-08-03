import React from 'react';
import { Button } from 'antd';
import { remote } from 'electron';

export default function CreateSuccessWindow() {
  const onClick = async () => {
    remote.dialog.showMessageBox({
      type: 'info',
      message: 'Sucessfully loged in',
      buttons: ['OK'],
    });
  };

  return (
    <Button type="primary" onClick={onClick}>
      Create success window
    </Button>
  );
}

import React from 'react';
import { Button } from 'antd';
import { ipcRenderer } from 'electron';

export default function CreateSuccessWindow() {
  const onClick = async () => {
    const res = await ipcRenderer.invoke('CREATE_LOGIN');

    console.log(res);
  };

  return (
    <Button type="primary" onClick={onClick}>
      Create success window
    </Button>
  );
}

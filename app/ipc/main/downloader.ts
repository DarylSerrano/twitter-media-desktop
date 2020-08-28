import { ipcMain, IpcMainInvokeEvent } from 'electron';
import {
  DownloadParams,
  DownloadResponse,
  CHANNEL_NAME,
} from '../../interfaces/Download';

const setupListener = (
  handler: (
    event: IpcMainInvokeEvent,
    params: DownloadParams
  ) => Promise<DownloadResponse>
) => {
  ipcMain.handle(CHANNEL_NAME, async (event, params: DownloadParams) => {
    return handler(event, params);
  });
};

export default setupListener;

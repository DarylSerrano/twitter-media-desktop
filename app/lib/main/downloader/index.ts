import { BrowserWindow, ipcMain } from 'electron';
import { download } from 'electron-dl';
import {
  DownloadActions,
  DownloadParams,
  DownloadResponse,
  CHANNEL_NAME,
} from '../../../interfaces/Download';

function downloadImages(win: BrowserWindow, url: string) {
  // TODO: from url, get filename
  // const filename = url.split('/').pop()
  return download(win, url);
}

// eslint-disable-next-line import/prefer-default-export
export function setupListener() {
  ipcMain.handle(CHANNEL_NAME, async (event, { mediaUrls }: DownloadParams) => {
    try {
      const win = BrowserWindow.fromWebContents(event.sender);

      if (win) {
        const downloadActions = mediaUrls.map((url) =>
          downloadImages(win, url)
        );

        await Promise.all(downloadActions);
        const response: DownloadResponse = {
          status: DownloadActions.SUCESS,
          message: `Sucess downloading ${mediaUrls.length} files`,
        };

        console.log(`Donwloaded files: ${mediaUrls.length}`);

        return response;
      }
      const response: DownloadResponse = {
        status: DownloadActions.FAIL,
        message: JSON.stringify(`Browser window is undefined`),
      };
      return response;
    } catch (error) {
      const response: DownloadResponse = {
        status: DownloadActions.FAIL,
        message: JSON.stringify(error),
      };
      return response;
    }
  });
}

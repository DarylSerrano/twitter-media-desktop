import { BrowserWindow, ipcMain, WebContents } from 'electron';
import { download, Progress } from 'electron-dl';
import {
  DownloadActions,
  DownloadParams,
  DownloadResponse,
  CHANNEL_NAME,
} from '../../data/Download';

function progressPublisher(webContent: WebContents, progress: Progress) {
  const response: DownloadResponse = {
    status: DownloadActions.PROGRESS,
    progress: progress.percent,
  };
  webContent.send(CHANNEL_NAME, response);
  console.log(`Progress: ${JSON.stringify(progress)}`);
}

function downloadImages(win: BrowserWindow, url: string) {
  // TODO: from url, get filename
  // const filename = url.split('/').pop()
  const { webContents } = win;
  return download(win, url, {
    onProgress: (progress) => progressPublisher(webContents, progress),
  });
}

// eslint-disable-next-line import/prefer-default-export
export function setupListener() {
  ipcMain.handle(CHANNEL_NAME, async (event, { mediaUrls }: DownloadParams) => {
    try {
      const win = BrowserWindow.fromWebContents(event.sender);

      const downloadActions = mediaUrls.map((url) => downloadImages(win, url));

      await Promise.all(downloadActions);
      const response: DownloadResponse = {
        status: DownloadActions.SUCESS,
        message: `Sucess downloading ${mediaUrls.length} files`,
      };

      console.log(`Donwloaded files: ${mediaUrls.length}`);

      return response;
    } catch (error) {
      const response: DownloadResponse = {
        status: DownloadActions.FAIL,
        message: JSON.stringify(error),
      };
      return response;
    }
  });
  // ipcMain.handle(
  //   CHANNEL_NAME,
  //   async (DownloadActions.DOWNLOAD, args: any[]) => {

  // let arg = args as DownloadParams;
  // try {
  //   const win = BrowserWindow.getFocusedWindow();
  //   let downloadActions = [];
  //   for (const url of mediaUrls) {
  //     downloadActions.push(downloadImages(win, url));
  //   }
  //   await Promise.all(downloadActions);
  // } catch (err) {
  //   const response: DownloadResponse = {
  //     status: DownloadActions.FAIL,
  //     message: JSON.stringify(err),
  //   };
  //   return response;
  // }
  // }
  // );
}

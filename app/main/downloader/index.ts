import { BrowserWindow, ipcMain, WebContents } from 'electron';
import { download, Progress } from 'electron-dl';
import {
  DownloadActions,
  DownloadParams,
  DownloadResponse,
  CHANNEL_NAME,
} from '../../data/Download';

type ProgressPublisherOptions = {
  webContents: WebContents;
  progress: Progress;
  filename: string;
};

function parseFilename(url: string) {
  const filename = url.substring(url.lastIndexOf('/') + 1);
  console.log(filename);
  return filename;
}

function progressPublisher({
  progress,
  filename,
  webContents: webContent,
}: ProgressPublisherOptions) {
  const response: DownloadResponse = {
    status: DownloadActions.PROGRESS,
    progress: progress.percent,
    filename,
  };
  console.log(`Progress: ${JSON.stringify(progress)}`);
  webContent.send(CHANNEL_NAME, response);
}

function downloadImages(win: BrowserWindow, url: string) {
  // TODO: from url, get filename
  // const filename = url.split('/').pop()
  const { webContents } = win;
  const filename = parseFilename(url);
  return download(win, url, {
    onProgress: (progress) =>
      progressPublisher({
        filename,
        progress,
        webContents,
      }),
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

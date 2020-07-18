export const CHANNEL_NAME = 'DOWNLOADER';

export enum DownloadActions {
  // DOWNLOAD = 'DOWNLOAD',
  FAIL = 'FAIL',
  SUCESS = 'SUCESS',
  PROGRESS = 'PROGRESS',
}

export interface DownloadParams {
  mediaUrls: string[];
}

export interface DownloadResponse {
  status: DownloadActions;
  message?: string;
}

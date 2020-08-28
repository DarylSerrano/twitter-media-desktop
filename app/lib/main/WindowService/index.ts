import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  LoadURLOptions,
} from 'electron';

type CreateWindowParams = {
  windowConstructorOptions?: BrowserWindowConstructorOptions;
  loadUrlOptions?: LoadURLOptions;
  clearStorageData?: boolean;
};

class WindowManager {
  private windows: Map<string, BrowserWindow>;

  public constructor() {
    this.windows = new Map();
  }

  public closeWindow(id: string) {
    const window = this.windows.get(id);
    if (window) {
      window.close();
      this.windows.delete(id);
    }
  }

  public async createWindow(
    id: string,
    loadUrl: string,
    params?: CreateWindowParams
  ) {
    const window = new BrowserWindow(params?.windowConstructorOptions);
    window.loadURL(loadUrl, params?.loadUrlOptions);

    if (params?.clearStorageData)
      await window.webContents.session.clearStorageData();

    window.on('close', () => {
      this.windows.delete(id);
    });

    this.windows.set(id, window);

    return window;
  }

  public getWindow(id: string) {
    return this.windows.get(id);
  }

  public addWindow(id: string, window: BrowserWindow) {
    this.windows.set(id, window);
  }
}

const manager = new WindowManager();

export default manager;

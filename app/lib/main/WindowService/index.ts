import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

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

  public createWindow(
    id: string,
    loadUrl: string,
    options?: BrowserWindowConstructorOptions
  ) {
    const window = new BrowserWindow(options);
    window.loadURL(loadUrl);
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

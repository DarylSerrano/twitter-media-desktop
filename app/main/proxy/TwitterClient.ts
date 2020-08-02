/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import Twitter from 'twitter-lite';
import Storage from 'electron-json-storage';
import { dialog, app } from 'electron';
import { promisify } from 'util';

type StorageAPIKEYS = {
  TWITTER_CONSUMER_KEY: string;
  TWITTER_CONSUMER_SECRET: string;
};

class Client {
  app: Twitter | undefined;

  // private userAuth = false;
  private TWITTER_CONSUMER_KEY: string | undefined;

  private TWITTER_CONSUMER_SECRET: string | undefined;

  constructor() {}

  async start() {
    const storageHas = promisify<string, boolean>(Storage.has);
    const storageGet = promisify(Storage.get);
    const hasApiKeys = await storageHas('API_KEYS');

    if (!hasApiKeys) {
      const dataPath = Storage.getDataPath();
      dialog.showErrorBox(
        'API KEYS not present',
        `Please place API_KEYS.json containing twitter app api keys on folder: ${dataPath}`
      );
      app.exit(1);
    } else {
      const apiKeyData = (await storageGet('API_KEYS')) as StorageAPIKEYS;

      this.TWITTER_CONSUMER_KEY = apiKeyData.TWITTER_CONSUMER_KEY;
      this.TWITTER_CONSUMER_SECRET = apiKeyData.TWITTER_CONSUMER_SECRET;

      const user = new Twitter({
        consumer_key: this.TWITTER_CONSUMER_KEY,
        consumer_secret: this.TWITTER_CONSUMER_SECRET,
      });

      const response = await user.getBearerToken();
      this.app = new Twitter({
        consumer_key: this.TWITTER_CONSUMER_KEY,
        consumer_secret: this.TWITTER_CONSUMER_SECRET,
        bearer_token: response.access_token,
      });
    }
  }

  isAuth() {
    return !!this.app;
  }
}

const TwitterClient = new Client();

export default TwitterClient;

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import Twitter from 'twitter-lite';
import Storage from 'electron-json-storage';
import { dialog, app } from 'electron';
import { promisify } from 'util';
import config from './ProxyConfig';
import {
  ClientAuthInformation,
  LOGIN_WINDOW_ID,
} from '../../../interfaces/Login';
import WindowManager from '../WindowService';

const storageHas = promisify<string, boolean>(Storage.has);
const storageGet = promisify(Storage.get);

type StorageAPIKEYS = {
  TWITTER_CONSUMER_KEY: string;
  TWITTER_CONSUMER_SECRET: string;
};

class Client {
  public twitterApp: Twitter | undefined;

  public twitterUser: Twitter | undefined;

  private readonly CALLBACK_URL = `${config.SERVER_URL}/${config.CALLBACK_PATH}`;

  // private userAuth = false;
  private TWITTER_CONSUMER_KEY = '';

  private TWITTER_CONSUMER_SECRET = '';

  constructor() {}

  async start() {
    const hasApiKeys = await storageHas('API_KEYS');

    if (!hasApiKeys) {
      const dataPath = Storage.getDataPath();
      dialog.showErrorBox(
        'API KEYS not present',
        `Please place API_KEYS.json containing twitter app api keys on folder: ${dataPath} and restart the aplication`
      );
      app.exit(1);
    } else {
      const apiKeyData = (await storageGet('API_KEYS')) as StorageAPIKEYS;

      this.TWITTER_CONSUMER_KEY = apiKeyData.TWITTER_CONSUMER_KEY;
      this.TWITTER_CONSUMER_SECRET = apiKeyData.TWITTER_CONSUMER_SECRET;

      const client = new Twitter({
        consumer_key: this.TWITTER_CONSUMER_KEY,
        consumer_secret: this.TWITTER_CONSUMER_SECRET,
      });

      const response = await client.getBearerToken();
      this.twitterApp = new Twitter({
        consumer_key: this.TWITTER_CONSUMER_KEY,
        consumer_secret: this.TWITTER_CONSUMER_SECRET,
        bearer_token: response.access_token,
      });
    }
  }

  isAuth() {
    return !!this.twitterApp;
  }

  isUserAuth() {
    return !!this.twitterUser;
  }

  async userLogin() {
    if (this.twitterApp) {
      const getRequestTokenRes = await this.twitterApp.getRequestToken(
        this.CALLBACK_URL
      );

      if (getRequestTokenRes.oauth_callback_confirmed === 'false') {
        throw new Error('oauth_callback_confirmed=false');
      }

      // @ts-ignore
      const loadUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${getRequestTokenRes.oauth_token}`;

      await WindowManager.createWindow(LOGIN_WINDOW_ID, loadUrl, {
        windowConstructorOptions: { title: 'Login Twitter' },
        clearStorageData: true,
      });
    }
  }

  async setupUserClient({ accTkn, accTknSecret }: ClientAuthInformation) {
    this.twitterUser = new Twitter({
      consumer_key: this.TWITTER_CONSUMER_KEY,
      consumer_secret: this.TWITTER_CONSUMER_SECRET,
      access_token_key: accTkn,
      access_token_secret: accTknSecret,
    });

    if (!(await this.isUserCredentialsCorrect())) {
      throw new Error('User credentials arent correct');
    }
  }

  userLogout() {
    this.twitterUser = undefined;
  }

  async isUserCredentialsCorrect() {
    try {
      if (this.twitterUser) {
        await this.twitterUser.get('account/verify_credentials');
        return true;
      }
      return false;
    } catch (error) {
      if ('errors' in error) {
        if (error.errors[0].code === 401) {
          return false;
        }
      }
      throw error;
    }
  }
}

const TwitterClient = new Client();

export default TwitterClient;

import { ipcMain } from 'electron';
import TwitterClient from '../../lib/main/proxy/TwitterClient';
import { LOGIN_CHANNEL_NAME } from '../../interfaces/Login';
import {
  AUTHENTICATION_CHANNEL_NAME,
  AuthenticationLoggedInParams,
  AuthenticationActions,
  AuthenticationParams,
} from '../../interfaces/Authentication';
import MAIN_WINDOW_ID from '../../interfaces/MainWindow';
import WindowManager from '../../lib/main/WindowService';

// setupSucessLoginHandler
const setupListener = () => {
  ipcMain.handle(LOGIN_CHANNEL_NAME, async () => {
    await TwitterClient.userLogin();

    return 0;
  });

  ipcMain.handle(
    AUTHENTICATION_CHANNEL_NAME,
    async (_event, params: AuthenticationParams) => {
      if (params.action === AuthenticationActions.LOGOUT)
        TwitterClient.userLogout();
      return 0;
    }
  );
};

type NotifyLoggedInParams = { userId: string; userName: string };

export const notifyLoggedIn = ({ userId, userName }: NotifyLoggedInParams) => {
  const mainWindow = WindowManager.getWindow(MAIN_WINDOW_ID);

  if (mainWindow) {
    const authenticationParams: AuthenticationLoggedInParams = {
      action: AuthenticationActions.LOGIN,
      userId,
      userName,
    };

    mainWindow.webContents.send(
      AUTHENTICATION_CHANNEL_NAME,
      authenticationParams
    );
  }
};

export default setupListener;

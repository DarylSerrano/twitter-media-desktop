import { ipcRenderer } from 'electron';
import {
  AUTHENTICATION_CHANNEL_NAME,
  AuthenticationParams,
  AuthenticationActions,
} from '../interfaces/Authentication';

export const setupRendererHandler = (
  handler: (action: AuthenticationActions) => void
) => {
  ipcRenderer.on(
    AUTHENTICATION_CHANNEL_NAME,
    async (event, { action }: AuthenticationParams) => {
      handler(action);
    }
  );
};

export const unsetupRendererHandler = () => {
  ipcRenderer.removeAllListeners(AUTHENTICATION_CHANNEL_NAME);
};

import { ipcRenderer } from 'electron';
import {
  AUTHENTICATION_CHANNEL_NAME,
  AuthenticationParams,
} from '../../interfaces/Authentication';

const setupRendererHandler = (
  handler: (params: AuthenticationParams) => void
) => {
  ipcRenderer.on(
    AUTHENTICATION_CHANNEL_NAME,
    async (event, params: AuthenticationParams) => {
      handler(params);
    }
  );
};

const unsetupRendererHandler = () => {
  ipcRenderer.removeAllListeners(AUTHENTICATION_CHANNEL_NAME);
};

export default { setupRendererHandler, unsetupRendererHandler };

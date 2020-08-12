/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, Request, Router, NextFunction } from 'express';
import TwitterClient from './TwitterClient';
import { LOGIN_WINDOW_ID } from '../../../interfaces/Login';
import WindowManager from '../WindowService';
import { notifyLoggedIn } from '../../../ipc/main/authenticationIpc';

type AuthorizationQuery = {
  oauth_token: string;
  oauth_verifier: string;
  oauth_denied?: string;
};

const router = Router();

router.get(
  `/callback`,
  async (req: Request, res: Response, _next: NextFunction) => {
    if (TwitterClient.twitterApp) {
      const {
        oauth_token: oauthToken,
        oauth_verifier: oauthVerifier,
        oauth_denied: oauthDenied,
      } = req.query as AuthorizationQuery;

      if (oauthDenied) {
        return res.status(500).send({ error: 'Oauth denied' });
      }

      if (!oauthToken || !oauthVerifier) {
        return res.status(500).send({ error: 'callback param(s) missing' });
      }

      const accesTokenResponse = await TwitterClient.twitterApp?.getAccessToken(
        {
          oauth_token: oauthToken,
          oauth_verifier: oauthVerifier,
        }
      );

      TwitterClient.setupUserClient({
        accTkn: accesTokenResponse.oauth_token,
        accTknSecret: accesTokenResponse.oauth_token_secret,
      });

      notifyLoggedIn({
        userId: accesTokenResponse.user_id,
        userName: accesTokenResponse.screen_name,
      });

      WindowManager.closeWindow(LOGIN_WINDOW_ID);

      return res.status(200).send({ status: 200, data: 'Good' });
    }

    return res.status(500).send({ message: 'Twitter App not authenticated' });
  }
);

export default router;

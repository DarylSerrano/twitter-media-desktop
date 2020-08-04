import { Response, Request, Router, NextFunction } from 'express';
import TwitterClient from './TwitterClient';

type AuthorizationQuery = {
  oauth_token: string;
  oauth_verifier: string;
  oauth_denied?: string;
};

const router = Router();

router.get('/test', async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ status: 200, data: 'Good' });
});

router.get(
  `/callback`,
  async (req: Request, res: Response, next: NextFunction) => {
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

      // const resObject = {
      //   accTkn: accesTokenResponse.oauth_token,
      //   accTknSecret: accesTokenResponse.oauth_token_secret,
      //   userId: accesTokenResponse.user_id,
      //   screenName: accesTokenResponse.screen_name,
      // };

      TwitterClient.setupUserClient({
        accTkn: accesTokenResponse.oauth_token,
        accTknSecret: accesTokenResponse.oauth_token_secret,
      });

      return res.status(200).send({ status: 200, data: 'Good' });
    }

    return res.status(500).send({ message: 'Twitter App not authenticated' });
  }
);

export default router;

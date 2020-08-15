import { Response, Request, Router, NextFunction } from 'express';
import TwitterClient from './TwitterClient';
import config from './ProxyConfig';

interface TwitterError {
  code: number;
  message: string;
}

interface TwitterAPIError extends Error {
  errors: TwitterError[];
}

function errorHandler(err: Error, res: Response, next: NextFunction) {
  if ('errors' in err) {
    // Twitter API error
    const twitterApiError = err as TwitterAPIError;
    if (twitterApiError.errors[0].code === 88) {
      // rate limit exceeded
      console.log('Rate limit');
      res.status(500).send({ message: twitterApiError.message });
    } else {
      // some other kind of error, e.g. read-only API trying to POST
      console.log(`Other error: ${JSON.stringify(err)}`);
      res.status(500).send({ message: twitterApiError.message });
    }
  } else {
    // non-API error, e.g. network problem or invalid JSON in response
    console.log(`Non api related error related, ${err}`);
    next(err);
  }
}

const authGetHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url = req.path.replace(config.API_PATH, '');
  console.log(
    `User Auth Get request: url: ${url} params: ${JSON.stringify(req.query)}`
  );

  if (TwitterClient.isAuth() && TwitterClient.isUserAuth()) {
    try {
      const data = await TwitterClient.twitterUser?.get(url, req.query);
      res.send(data || {});
      return;
    } catch (err) {
      errorHandler(err, res, next);
    }
  } else {
    console.log(`Not logged in`);
    res.status(500).send({ error: 'Not logged in' });
  }
};

const router = Router();

router.get('/statuses/home_timeline', authGetHandler);
router.get('/users/search', authGetHandler);

router.get('/*', async (req: Request, res: Response, next: NextFunction) => {
  const url = req.path.replace(config.API_PATH, '');
  console.log(`Get request: url: ${url} params: ${JSON.stringify(req.query)}`);

  if (TwitterClient.isAuth()) {
    try {
      const data = await TwitterClient.twitterApp?.get(url, req.query);
      res.send(data || {});
      return;
    } catch (err) {
      errorHandler(err, res, next);
    }
  } else {
    console.log(`Not logged in`);
    res.status(500).send({ error: 'Not logged in' });
  }
});

router.post('/*', async (req: Request, res: Response, next: NextFunction) => {
  const url = req.path.replace(config.API_PATH, '');
  console.log(`POST request: url: ${url} content: ${JSON.stringify(req.body)}`);

  if (TwitterClient.isAuth()) {
    try {
      const data = await TwitterClient.twitterApp?.post(url, req.body);
      res.send(data || {});
      return;
    } catch (err) {
      errorHandler(err, res, next);
    }
  } else {
    console.log(`Not logged in`);
    res.status(500).send({ error: 'Not logged in' });
  }
});

export default router;

import { Response, Request, Router } from 'express';

const router = Router();

router.get('/test', async (req: Request, res: Response) => {
  res.status(200).json({ status: 200, data: 'Good' });
});

export default router;

import { Router } from 'express';
import filmRouter from './film';

const router = Router();

router.use('/film', filmRouter);

export default router;
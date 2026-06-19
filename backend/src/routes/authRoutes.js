import express from 'express';
import { registrar, login } from '../controllers/authController.js';
import verificarAcceso from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/registrar', registrar);
router.post('/login', verificarAcceso, login);

export default router;
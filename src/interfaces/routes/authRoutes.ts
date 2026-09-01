import { Router } from 'express';
import * as controller from '../controllers/AuthController';
import * as registerController from '../controllers/RegisterController';

const router = Router();

router.post('/login', controller.login);
router.post('/register', registerController.register);

export default router;

import { Router } from 'express';
import * as controller from '../controllers/UserController';

const router = Router();

router.post('/', controller.createUser);
router.get('/id/:id', controller.getUserById);
router.get('/email/:email', controller.getUserByEmail);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

export default router;

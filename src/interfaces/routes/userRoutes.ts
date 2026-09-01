import { Router } from 'express';
import * as controller from '../controllers/UserController';
import auth from '../../infrastructure/middleware/auth';
import * as profileController from '../controllers/ProfileController';

const router = Router();

// create
router.post('/', controller.createUser);

// lookup by username/email should be before `/:id` to avoid routing conflicts
router.get('/email/:email', controller.getUserByEmail);
router.get('/username/:usuario', controller.getUserByUsername);

// id-based routes
router.get('/:id', controller.getUserById);
router.put('/:id', controller.updateUser);
router.patch('/:id/password', auth, controller.updatePassword);
router.delete('/:id', controller.deleteUser);
// profile routes
router.get('/:id/profile', profileController.getProfile);
router.post('/:id/profile', profileController.createProfile);
router.put('/:id/profile', profileController.updateProfile);

export default router;

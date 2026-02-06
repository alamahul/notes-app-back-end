import { Router } from 'express';
import { createUser, getUserById } from '../controllers/user-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { userPayloadSchema } from '../../../services/users/validator/schema.js';
import { getUsersByUsername } from '../controllers/user-controller.js';

const router = Router();

router.post('/users', validate(userPayloadSchema), createUser);
router.get('/users/:id', getUserById);
router.get('/users', getUsersByUsername);

export default router;
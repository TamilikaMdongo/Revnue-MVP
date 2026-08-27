import express from 'express'
import { createUser, getUsers, login } from '../controllers/userControllers.js';
const router = express.Router();

router.post('/', createUser);
router.get('/',getUsers);
router.post('/login', login)

export default router;
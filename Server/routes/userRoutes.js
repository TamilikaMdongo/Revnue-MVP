import express from 'express'
import { createUser, getUsers, login, getProfile, updateUser } from '../controllers/userControllers.js';
const router = express.Router();

router.post('/', createUser);
router.get('/',getUsers);
router.post('/login', login)
router.get('/profile/:userId', getProfile)
router.patch('/profile/:userId', updateUser)




export default router;
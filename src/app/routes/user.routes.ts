import express from 'express';
import {
  Signup,
  verify,
  Login,
  Logout,
} from '../controllers/user/user.controller';
import { checkAuth } from '../middlewares/auth.middleware';
import { checkUserIsVerified } from '../middlewares/verification.middleware';

const router = express.Router();

router.post('/register', Signup);
router.post('/verify', verify);
router.post('/login', Login);
router.get('/protected', checkAuth, checkUserIsVerified, (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Authenticated successfully',
  });
});
router.post('/logout', checkAuth, Logout);
export default router;

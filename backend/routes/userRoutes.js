import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  resetUserPassword,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

router.route('/').get(protect, getUsers);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .patch(resetUserPassword);

export default router;

/**
 * Authentication routes for user management.
 * Defines endpoints for login, registration, verification, logout, and password reset.
 */

// Import required modules
import express from 'express';
import {
  logInUser,
  registerUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  verifyUser,
} from '../controllers/authController.js';
import { body, param } from 'express-validator';
import handleValidate from '../middlewares/handleValidate.js';

// Create Express router instance
const router = express.Router();

// POST /login - Authenticate user with email and password
router.post(
  '/login',
  [
    body('email').trim().isEmail().normalizeEmail().withMessage('INVALIDE_EMAIL_OR_PASSWORD'),
    body('password').trim().notEmpty().withMessage('INVALIDE_EMAIL_OR_PASSWORD'),
  ],
  handleValidate,
  logInUser
);

// POST /register - Create a new user account
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('NAME_REQUIRED'),
    body('email').trim().isEmail().normalizeEmail().withMessage('INVALIDE_EMAIL_FORMAT'),
    body('password')
      .trim()
      .isStrongPassword({
        minLength: 9,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage('WEAK_PASSWORD'),
    body('role').trim().isIn(['user', 'admin']).withMessage('INVALIDE_ROLE'),
  ],
  handleValidate,
  registerUser
);

// GET /verify/:token - Verify user email with token
router.get(
  '/verify/:token',
  param('token').trim().notEmpty().escape().withMessage('TOKEN_REQUIRED'),
  handleValidate,
  verifyUser
);

// POST /logout - Log out the current user
router.post('/logout', logoutUser);

// POST /forgot-password - Send password reset email
router.post(
  '/forgot-password',
  [body('email').trim().isEmail().normalizeEmail().withMessage('INVALIDE_EMAIL_FORMAT')],
  handleValidate,
  forgotPassword
);

// POST /reset-password/:resetToken - Reset password with token
router.post(
  '/reset-password/:resetToken',
  [
    body('password')
      .trim()
      .isStrongPassword({
        minLength: 9,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage('WEAK_PASSWORD'),
    param('resetToken').notEmpty().trim().escape().withMessage('INVALID_TOKEN'),
  ],
  handleValidate,
  resetPassword
);

// router.get('/refresh-token',)

export default router;

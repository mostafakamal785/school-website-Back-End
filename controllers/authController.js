/**
 * Controller for handling user authentication operations.
 * Includes login, registration, verification, logout, and password reset functionalities.
 */

// Import required modules
import User from '../models/User.js';
import {
  generateAccesToken,
  generateRefreshToken,
  generateVerifyToken,
} from '../utils/tokenUtils.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

/**
 * Logs in a user by verifying email and password.
 * Sets access and refresh tokens as HTTP-only cookies.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const logInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await User.findOne({ email });

    if (!newUser) {
      return next({
        status: 401,
        field: 'email',
        message: 'Invalid email or password',
      });
    }

    if (!newUser.isVerified) {
      return next({
        status: 403,
        message: 'Please verify your email to log in',
        field: 'email',
      });
    }

    const isMatch = await bcrypt.compare(password, newUser.password);
    if (!isMatch) {
      return next({
        status: 401,
        field: 'password',
        message: 'Invalid email or password',
      });
    }

    res.cookie('access-token', generateAccesToken(newUser._id, newUser.role), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.cookie('refresh-token', generateRefreshToken(newUser._id, newUser.role), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      message: 'User logged in successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    next({
      status: 500,
      field: 'login',
      message: error.message,
    });
  }
};

/**
 * Registers a new user with name, email, password, and optional role.
 * Sends a verification email after successful registration.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const isRepet = await User.findOne({ email });

    if (isRepet) {
      return next({
        status: 409,
        field: 'email',
        message: 'Email already exists',
      });
    }

    const hashdPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      role: role || 'user',
      password: hashdPassword,
      isVerified: false,
    });

    const verifyToken = generateVerifyToken(newUser._id);

    const verifyUrl = `${req.protocol}://${req.get('host')}/api/auth/verify/${verifyToken}`;
    const message = `Please click the link to verify your email: ${verifyUrl}`;

    await sendEmail(newUser.email, 'Email Verification', message);

    res.status(201).json({
      message: 'User registered successfully. Please check your email to verify your account.',
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verifies a user's email using a verification token.
 * Marks the user as verified in the database.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const verifyUser = async (req, res, next) => {
  try {
    const token = req.params.token;

    const decoded = jwt.verify(token, process.env.VERIFY_TOKEN);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next({ status: 404, message: 'User not found' });
    }

    user.isVerified = true;
    user.verifyToken = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    next({ status: 400, message: 'Invalid or expired verification token', field: 'token' });
  }
};

/**
 * Logs out a user by clearing access and refresh token cookies.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('access-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.clearCookie('refresh-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * Initiates password reset by sending a reset email to the user.
 * Generates a secure reset token and stores it in the database.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      return next({
        status: 404,
        field: 'email',
        message: 'No user found with this email',
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetCode = hashedToken;
    user.resetCodeExp = Date.now() + 10 * 60 * 1000;
    await user.save();

    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
    const message = `You requested a password reset. Please use this link: ${resetUrl}`;

    await sendEmail(user.email, 'Password Reset Request', message);

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * Resets a user's password using a valid reset token.
 * Validates the token and updates the password in the database.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const resetToken = req.params.resetToken;

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
      resetCode: hashedToken,
      resetCodeExp: { $gt: Date.now() },
    });

    if (!user) {
      return next({
        status: 400,
        message: 'Invalid or expired password reset token',
        field: 'resetToken',
      });
    }

    const hashdPassword = await bcrypt.hash(password, 10);
    user.password = hashdPassword;
    user.resetCode = '';
    user.resetCodeExp = null;

    await user.save();
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
};

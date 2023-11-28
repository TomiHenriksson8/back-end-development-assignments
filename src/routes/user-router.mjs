import express from 'express';
import {
  deleteUserHandler,
  getUserById,
  getUsers,
  postUser,
  putUser,
} from '../controllers/user-controller.mjs';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middlewares/authentication.mjs';

const userRouter = express.Router();

// Validation middleware for creating a user
const createUserValidation = [
  body('email').trim().isEmail(),
  body('username').trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
  body('password').trim().isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// routes for /api/users/
userRouter
  .route('/')
  .get(getUsers)
  .post(createUserValidation, postUser);

// routes for /api/users/:id
userRouter.route('/:id')
  .get(getUserById)
  .put(authenticateToken, putUser) 
  .delete(authenticateToken, deleteUserHandler);

export default userRouter;

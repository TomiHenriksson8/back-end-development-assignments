import express from 'express';
import {
  deleteUserHandler,
  getUserById,
  getUsers,
  postUser,
  putUser,
} from '../controllers/user-controller.mjs';
import {body} from 'express-validator';
import { authenticateToken } from '../middlewares/authentication.mjs';

const userRouter = express.Router();

// routes for /api/users/
userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    postUser
  );

// routes for /api/users/:id
userRouter.route('/:id')
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUserHandler);

export default userRouter;
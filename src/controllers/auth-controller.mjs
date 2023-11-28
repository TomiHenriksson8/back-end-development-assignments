import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { login } from "../models/users-model.mjs";

const postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await login({ username, password });
    if (user.error) {
      return next(new Error(user.error));
    }
    const token = jwt.sign(user, process.env.JWT_SECRET || 'your_default_secret');
    res.status(200).json({ message: 'Logged in', token, user });
  } catch (error) {
    next({ status: 401, message: 'Invalid username/password', error });
  }
};

const getMe = (req, res, next) => {
  try {
    console.log('getMe user', req.user);
    if (!req.user) {
      throw new Error('User not found');
    }
    res.json(req.user);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

export { postLogin, getMe };

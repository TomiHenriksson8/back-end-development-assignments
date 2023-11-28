import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {login} from "../models/users-model.mjs";

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
      res.status(401).json({ message: 'Invalid username/password' });
    }
  };
  
  

const getMe = (req, res) => {
  console.log('getMe user', req.user);
  res.json(req.user);
};

export {postLogin, getMe};
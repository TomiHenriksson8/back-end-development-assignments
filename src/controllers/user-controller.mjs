import {validationResult} from "express-validator";
import { CreateUser, UpdateUser, fetchAllUsers, fetchUserById, DeleteUser } from "../models/users-model.mjs";


const getUsers = async (req, res) => {
    const users = await fetchAllUsers();
    res.json(users);
};


const getUserById = async (req, res, next) => {
  try {
    const result = await fetchUserById(req.params.id);
    if (!result) {
      throw new Error('User not found');
    }
    if (result.error) {
      throw new Error(result.error);
    }
    res.json(result);
  } catch (error) {
    error.status = error.status || 404;
  }
};

const postUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw { status: 400, message: 'Invalid input fields', errors: errors.array() };
    }
    const newUserId = await addUser(req.body);
    res.status(201).json({ message: 'User added', user_id: newUserId });
  } catch (error) {
    next(error);
  }
};

const putUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userData = { ...req.body, user_id: userId };

    const result = await UpdateUser(userData);
    if (result.error) {
      throw new Error(result.error);
    }
    res.status(200).json(result);
  } catch (error) {
    error.status = error.status || 500;
    next(error);
  }
};


const deleteUserHandler = async (req, res, next) => {
  try {
    const result = await DeleteUser(req.params.id);
    if (!result) {
      throw new Error('User not found');
    }
    if (result.error) {
      throw new Error(result.error);
    }
    res.json(result);
  } catch (error) {
    error.status = error.status || 500;
    next(error);
  }
};

export {getUsers, getUserById, postUser, putUser, deleteUserHandler};

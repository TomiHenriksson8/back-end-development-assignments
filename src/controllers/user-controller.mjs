import {validationResult} from "express-validator";
import { CreateUser, UpdateUser, fetchAllUsers, fetchUserById, DeleteUser } from "../models/users-model.mjs";


const getUsers = async (req, res) => {
    const users = await fetchAllUsers();
    res.json(users);
};

// Following functions are just stubs at the moment
const getUserById =  async (req, res) => {
    const result = await fetchUserById(req.params.id);
    if (result) {
        if (result.error) {
          res.status(500);
        }
        res.json(result);
      } else {
        res.status(404);
        res.json({error: 'Not Found'});
      }
};

const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // details about errors:
    console.log(errors.array())
    return res.status(400).json({message: 'invalid input fields'});
  }
  const newUserId = await addUser(req.body);
  res.status(201).json({message: 'user added', user_id: newUserId});
};

const putUser = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user_id from URL parameter
    const userData = { ...req.body, user_id: userId }; // Merge user_id with other data

    const result = await UpdateUser(userData);
    if (result.error) {
      res.status(500).json(result); // Internal Server Error for errors
    } else {
      res.status(200).json(result); // OK for successful update
    }
  } catch (e) {
    res.status(500).json({ error: e.message }); // Error handling for exceptions
  }   
};


const deleteUserHandler = async (req, res) => {
    try {
      const result = await DeleteUser(req.params.id);
      if (result) {
        if (result.error) {
          res.status(500);
          }
        }
        res.json(result);
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
};

export {getUsers, getUserById, postUser, putUser, deleteUserHandler};

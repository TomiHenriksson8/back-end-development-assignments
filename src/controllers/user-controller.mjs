
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
  try {
    const result = await CreateUser(req.body); // Call the createUser service function
    if (result.error) {
      res.status(500).json(result);
    } else {
      res.status(201).json(result); // Use status code 201 for successful creation
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
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

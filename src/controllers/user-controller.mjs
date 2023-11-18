
import { fetchAllUsers } from "../models/users-model.mjs";

const getUsers = async (req, res) => {
    const users = await fetchAllUsers();
    res.json(users);
};

// Following functions are just stubs at the moment
const getUserById = (req, res) => {
    res.json({message: 'getUserById'});
};

const postUser = (req, res) => {
    res.json({message: 'postUser'});
};

const putUser = (req, res) => {
    res.json({message: 'putUser'});
};

const deleteUser = (req, res) => {
    res.json({message: 'deleteUser'});
};

export {getUsers, getUserById, postUser, putUser, deleteUser};

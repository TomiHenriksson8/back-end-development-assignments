import { promisePool } from '../utils/db.mjs';

const fetchAllUsers = async () => {
    try {
        const sql = `SELECT * FROM Users`;
        const [rows] = await promisePool.query(sql);
        console.log('rows', rows);
        return rows;
      } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
      }
};


const fetchUserById = async (id) => {
    console.log(`Attempting to fetch user with ID: ${id}`); // Diagnostic log

    try {
        const sql = 'SELECT * FROM Users WHERE user_id = ?';
        const params = [id];
        const [rows] = await promisePool.query(sql, params);

        if (rows.length === 0) {
            console.log(`User with ID: ${id} not found.`); // Diagnostic log
            return { error: "Not Found" };
        }

        console.log(`User with ID: ${id} found:`, rows[0]); // Diagnostic log
        return rows[0];
    } catch (e) {
        console.error('Error fetching user by id:', e);
        return { error: e.message };
    }
};

const CreateUser = async (user) => {
    const {user_id, username, password, email, user_level_id, created_at} = user;
    const sql = `INSERT INTO Users (user_id, username, password, email, user_level_id, created_at)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [user_id, username, password, email, user_level_id, created_at];
    try {
        const result = await promisePool.query(sql, params);
        console.log('result', result);
        return {user_id: result[0].insertId};
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const UpdateUser = async (user) => {
    const {user_id, username, password, email, user_level_id, created_at} = user;
    const sql = `UPDATE Users SET username = ?, password = ?, email = ?, user_level_id = ?, created_at = ? WHERE user_id = ?`;
    const params = [username, password, email, user_level_id, created_at, user_id];
    console.log("Updating user with data:", user);
    console.log("SQL parameters:", params);
    try {
        const [result] = await promisePool.query(sql, params);
        console.log('result', result);

        // Check how many rows were affected by the UPDATE operation
        if (result.affectedRows === 0) {
            return { error: 'No rows affected. User not found or data unchanged.' };
        }

        return { success: true, message: `User with ID ${user_id} updated successfully.` };
    } catch (e) {
        console.error('error', e.message);
        return { error: e.message };
    }
};

const DeleteUser = async (userId) => {
    const sql = `DELETE FROM Users WHERE user_id = ?`;
    const params = [userId];

    try {
        const [result] = await promisePool.query(sql, params)
        if (result.affectedRows === 0) {
            throw new Error('User not found or already deleted');
        }
        return { success: true, user_id: userId };
    } catch (e) {
        console.error('Error:', e.message);
        return { error: e.message };
    }
};

const login = async (userCreds) => {
    try {
      const sql = `SELECT user_id, username, email, user_level_id
                   FROM Users WHERE username = ? AND password = ?`;
      const params = [userCreds.username, userCreds.password];
      const result = await promisePool.query(sql, params);
      const [rows] = result; // first item in result array is the data rows
      return rows[0];
    } catch (e) {
      console.error('error', e.message);
      return {error: e.message};
    }
  };
  


export { fetchAllUsers, fetchUserById, CreateUser, UpdateUser, DeleteUser, login }
import { promisePool } from '../utils/db.mjs';

const fetchAllMedia = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM mediaItems');
        console.log('rows', rows);
        return rows;
      } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
      }
};

const fetchMediaById = async (id) => {
  try {
      const sql = `SELECT * FROM MediaItems JOIN Users ON MediaItems.user_id = Users.user_id WHERE media_id = ?`;
      const params = [id];
      const [rows] = await promisePool.query(sql, params);
      return rows[0];
  } catch (e) {
      console.error('error', e.message);
      return {error: e.message};
  }
};


const addMedia = async (media) => {
    const {user_id, filename, size, mimetype, title, description} = media;
    const sql = `INSERT INTO mediaItems (user_id, filename, filesize, media_type, title, description)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [user_id, filename, size, mimetype, title, description];
    try {
      const result = await promisePool.query(sql, params);
      console.log('result', result);
      return {media_id: result[0].insertId};
    } catch (e) {
      console.error('error', e.message);
      return {error: e.message};
    }
  };


  const putMedia = async (media) => {
    const { media_id, user_id, filename, filesize, media_type, title, description } = media;
    const sql = `UPDATE MediaItems SET user_id = ?, filename = ?, filesize = ?, media_type = ?, title = ?, description = ? WHERE media_id = ?`;
    const params = [user_id, filename, filesize, media_type, title, description, media_id];

    try {
        const [result] = await promisePool.query(sql, params);
        console.log('Update result', result);
        if (result.affectedRows === 0) {
            throw new Error('No rows affected, media item not found or update failed');
        }
        return { success: true, media_id: media_id };
    } catch (e) {
        console.error('Database error', e.message);
        return { error: e.message };
    }
};



const deleteMedia = async (id) => {
  const sql = `DELETE FROM MediaItems WHERE media_id = ?`;
  const params = [id];
  try {
      const [result] = await promisePool.query(sql, params);
      console.log('result', result);

      // Use affectedRows to check if the row was deleted
      if (result.affectedRows === 0) {
          throw new Error('No rows affected, media item not found or already deleted');
      }

      // Return the ID of the deleted media
      return { media_id: id, deleted: true };
  } catch (e) {
      console.error('error', e.message);
      return { error: e.message };
  }
};



export { fetchAllMedia, fetchMediaById, addMedia, putMedia, deleteMedia };
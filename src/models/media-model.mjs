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
        // TODO replace * whit comlumn names needed in this case  :-)
        const sql = `SELECT * FROM MediaItems 
                    JOIN Users ON MediaITems.user_id = Iser.user_id WHERE media_id=?`;
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


export { fetchAllMedia, fetchMediaById, addMedia };
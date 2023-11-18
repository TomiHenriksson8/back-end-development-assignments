import { promisePool } from '../utils/db.mjs';

const fetchAllUsers = async () => {
    try {
        const sql = `SELECT Users FROM mediaItems`;
        const [rows] = await promisePool.query(sql);
        console.log('rows', rows);
        return rows;
      } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
      }
};


export { fetchAllUsers }
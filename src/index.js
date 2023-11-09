import http from 'http';
import {getItems, getItemsById, postItem, putItem, deleteItem} from './items.js';
import { fileURLToPath } from 'url';
import express from 'express';
import path from 'path';
import { deleteMediaItem, getMedia, getMediaById, postMediaItem, putMediaItem } from './media.js';
import { deleteUser, getUserById, getUsers, postUser, putUser } from './user.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use('/docs', express.static(path.join(__dirname, '../docs')));
app.use('/media', express.static(path.join(__dirname, '../media')));


app.get('/', (request, response) => {
  const values = { title: 'Dummy REST API', message: 'TODO Docs: /docs' };
  console.log('Rendering index page');
  response.render('index', values, (err, html) => {
    if (err) {
      console.error('Error during render:', err);
      return response.status(500).send('Error rendering the page');
    }
    response.send(html);
  });
});


// Items

// get all items
app.get('/api/items', getItems);
// get items by id
app.get('/api/items/:id', getItemsById);
// modify item
app.put('/api/items', putItem);
// add item
app.post('/api/items', postItem);
// delete item
app.delete('/api/items/:id', deleteItem);

// Media 

// get media items
app.get('/api/media', getMedia);
// get media item by id
app.get('/api/media/:id', getMediaById);
// modify media item
app.put('/api/media/:id', putMediaItem);
// add media item
app.post('/api/media', postMediaItem);
// delete media item
app.delete('/api/media/:id', deleteMediaItem);

// User

// get all users
app.get('/api/user', getUsers);
// get user by id
app.get('/api/user/:id', getUserById);
// add user
app.post('/api/user', postUser);
// modify user
app.put('/api/user/:id', putUser);
// delete user
app.delete('/api/user/:id', deleteUser);


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
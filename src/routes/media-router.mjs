import express from 'express';
import {
  deleteMediaHandler,
  getMedia,
  getMediaById,
  postMedia,
  putMediaHandler,
} from '../controllers/media-controller.mjs';
import {logger} from '../middlewares/middlewares.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import upload from '../middlewares/upload.mjs';

const mediaRouter = express.Router();

mediaRouter.use(logger);

// Routes
mediaRouter.get('/', getMedia);
mediaRouter.get('/:id', getMediaById);

mediaRouter.post('/', authenticateToken, upload.single('file'), postMedia);
mediaRouter.put('/:id', authenticateToken, putMediaHandler);
mediaRouter.delete('/:id', authenticateToken, deleteMediaHandler);

export default mediaRouter;
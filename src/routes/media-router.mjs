import express from 'express';
import multer from 'multer';
import {
  deleteMediaHandler,
  getMedia,
  getMediaById,
  postMedia,
  putMediaHandler,
} from '../controllers/media-controller.mjs';
import {logger} from '../middlewares/middlewares.mjs';

const mediaRouter = express.Router();
const upload = multer({dest: 'uploads/'})

// router specific middleware
//mediaRouter.use(logger);

mediaRouter.route('/')
    .get(getMedia)
    .post(upload.single('file'), postMedia);
mediaRouter.route('/:id')
    .get(getMediaById)
    .put(putMediaHandler)
    .delete(deleteMediaHandler);

export default mediaRouter;

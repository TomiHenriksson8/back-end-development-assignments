import {validationResult} from "express-validator";
import { addMedia, fetchAllMedia, fetchMediaById, putMedia, deleteMedia } from "../models/media-model.mjs";

const getMedia = async (req, res) => {
  const mediaItems = await fetchAllMedia();
  res.json(mediaItems);
};

const getMediaById = async (req, res, next) => {
  try {
    const result = await fetchMediaById(req.params.id);
    if (!result) {
      throw new Error('Media not found');
    }
    if (result.error) {
      throw new Error(result.error);
    }
    res.json(result);
  } catch (error) {
    error.status = error.status || 404; // Set the status code for not found or other errors
    next(error);
  }
};

const postMedia = async (req, res, next) => {
  //console.log('uploaded file', req.file);
  //console.log('uploaded form data', req.body);
  // Error handling moved to fileFilter
  // if (!req.file) {
  //   const error = new Error('file missing or invalid');
  //   error.status = 400;
  //   return next(error);
  // }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // details about errors:
    console.log('validation errors', errors.array());
    const error = new Error('invalid input fields');
    error.status = 400;
    return next(error);
  }
  const {title, description} = req.body;
  const {filename, mimetype, size} = req.file;
  // req.user is added by authenticateToken middleware
  const user_id = req.user.user_id;
  const newMedia = {title, description, user_id, filename, mimetype, size};
  const result = await addMedia(newMedia);
  // error handling when database error occurs
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(201);
  res.json({message: 'New media item added.', ...result});
};

const putMediaHandler = async (req, res) => {
  const media = {
      media_id: req.params.id, 
      user_id: req.body.user_id,
      filename: req.body.filename,
      filesize: req.body.filesize,
      media_type: req.body.media_type,
      title: req.body.title,
      description: req.body.description
  };

  try {
    const result = await putMedia(media);
    if (result.error) {
      throw new Error(result.error);
    }
    res.status(200).send({ message: `Media with ID ${media.media_id} successfully updated`, media_id: media.media_id });
  } catch (error) {
    error.status = error.status || 500;
    next(error);
  }
};


const deleteMediaHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await deleteMedia(id);
    if (result.error) {
      throw new Error(result.error);
    }
    res.status(200).send({ message: `Media with ID ${id} successfully deleted`, media_id: result.media_id });
  } catch (error) {
    error.status = error.status || 500;
    next(error);
  }
};


export {getMedia, getMediaById, postMedia, putMediaHandler, deleteMediaHandler};

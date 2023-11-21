import { addMedia, fetchAllMedia, fetchMediaById, putMedia, deleteMedia } from "../models/media-model.mjs";

const getMedia = async (req, res) => {
  const mediaItems = await fetchAllMedia();
  res.json(mediaItems);
};

const getMediaById = async (req, res) => {
  console.log(req.params);
  const result = await fetchMediaById(req.params.id); 
  // "error handling" for different scenarios 
  if (result) {
    if (result.error) {
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({error: 'Not Found', media_id: req.params.id});
  }
};

const postMedia = async (req, res) => {
  console.log('uploaded file', req.file);
  console.log('uploaded form data', req.body);
  const {title, description, user_id} = req.body;
  const {filename, mimetype, size} = req.file;
  if (filename && title && user_id) {
    // TODO add error when database error occurs
    const newMedia = {
      user_id,
      filename,
      size,
      mimetype,
      title,
      description,
    };
    const result = await addMedia(newMedia);
    res.status(201); 
    res.json({message: 'New media item added.', ...result}); 
  } else {
    res.sendStatus(400);
  }
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
          res.status(500).send(result.error);
      } else {
          res.status(200).send({ message: `Media with ID ${media.media_id} successfully updated`, media_id: media.media_id });
      }
  } catch (error) {
      console.error('Server error', error.message);
      res.status(500).send({ error: error.message });
  }
};


const deleteMediaHandler = async (req, res) => {
  const id = req.params.id;

  try {
      const result = await deleteMedia(id);
      if (result.error) {
          res.status(500).send(result.error);
      } else {
          res.status(200).send({ message: `Media with ID ${id} successfully deleted`, media_id: result.media_id });
      }
  } catch (error) {
      console.error('Server error', error.message);
      res.status(500).send({ error: error.message });
  }
};


export {getMedia, getMediaById, postMedia, putMediaHandler, deleteMediaHandler};

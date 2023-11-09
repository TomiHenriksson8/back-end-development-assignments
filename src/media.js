const mediaData = [
    {
      media_id: 9632,
      filename: "ffd8.jpg",
      filesize: 887574,
      title: "Favorite drink",
      description: "",
      user_id: 1606,
      media_type: "image/jpeg",
      created_at: "2023-10-16T19:00:09.000Z"
    },
    {
      media_id: 9626,
      filename: "dbbd.jpg",
      filesize: 60703,
      title: "Miika",
      description: "My Photo",
      user_id: 3671,
      media_type: "image/jpeg",
      created_at: "2023-10-13T12:14:26.000Z"
    },
    {
      media_id: 9625,
      filename: "2f9b.jpg",
      filesize: 30635,
      title: "Aksux",
      description: "friends",
      user_id: 260,
      media_type: "image/jpeg",
      created_at: "2023-10-12T20:03:08.000Z"
    },
    {
      media_id: 9592,
      filename: "f504.jpg",
      filesize: 48975,
      title: "Desert",
      description: "",
      user_id: 3609,
      media_type: "image/jpeg",
      created_at: "2023-10-12T06:59:05.000Z"
    },
    {
      media_id: 9590,
      filename: "60ac.jpg",
      filesize: 23829,
      title: "Basement",
      description: "Light setup in basement",
      user_id: 305,
      media_type: "image/jpeg",
      created_at: "2023-10-12T06:56:41.000Z"
    }
  ];

// media functions...

const getMedia = (request, response) => {
    response.json(mediaData);
};

const getMediaById = (request, response) => {
    const item = mediaData.find((element) => element.media_id == request.params.id);
    if (item) {
        response.json(item);
    } else {
        response.status(404)
        response.json({"message": "Item not found!"})
    }
};

const putMediaItem = (request, response) => {
    const { id } = request.params;
    const index = mediaData.findIndex(item => item.media_id == id);
    
    if (index !== -1) {
        mediaData[index] = {
            ...mediaData[index],
            ...request.body,
            media_id: parseInt(id),
        };
        response.status(200).json(mediaData[index]);
    } else {
        response.status(404).json({"message": "Item not found!"});
    }
};

const postMediaItem = (request, response) => {
    const newMediaItem = {
        ...request.body,
        media_id: mediaData.length > 0 ? Math.max(...mediaData.map(item => item.media_id)) + 1 : 1,
        created_at: new Date().toISOString()
    };
};

const deleteMediaItem = (request, response) => {
    const { id } = request.params;
    const index = mediaData.findIndex(item => item.media_id == id);
    if (index !== -1) {
        mediaData.splice(index, 1);
        response.status(200).json({"message": "Item deleted!"});
    } else {
        response.status(404).json({"message": "Item not found!"});
    }
};



export {getMedia, getMediaById, putMediaItem, postMediaItem, deleteMediaItem}
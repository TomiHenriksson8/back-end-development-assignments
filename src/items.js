// mock items data
const items = [
    {id: 5, name: 'porkkana'},
    {id: 6, name: 'omena'},
    {id: 19, name: 'appelsiini'},
  ];
  
  const getItems = (req, res) => {
    res.json(items);
  };
  
  const getItemsById = (req, res) => {
    // TODO: if item with id exists send it, otherwise sen 404
    console.log('getItemsById', req.params);
    const item = items.find((element) => element.id == req.params.id);
    if (item) {
        res.json(item);
    } else {
        res.status(404);
        res.json({"message": "Item not found."});
    }
  };
  
  const postItem = (req, res) => {
    console.log('postItem', req.body);
    // TODO check last weeks example for generating id
    if (req.body.name) {
      items.push({id: 0, name: req.body.name});
      res.sendStatus(201);
    } else {
      res.sendStatus(400);
    }
    
    
  };

  const deleteItem = (res, id) => {
    const itemIndex = items.findIndex((element) => element.id == id);
    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({"message": "Item deleted successfully."}));
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({"message": "Item not found."}));
    }
};


const putItem = (req, res, id) => {
    const itemIndex = items.findIndex((element) => element.id == id);
    if (itemIndex !== -1) {
        let body = [];
        req
          .on('error', (err) => {
            console.error(err);
          })
          .on('data', (chunk) => {
            body.push(chunk);
          })
          .on('end', () => {
            body = Buffer.concat(body).toString();
            body = JSON.parse(body);
            if (!body.name) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(`{"message": "Missing data."}`);
                return;
            }
            items[itemIndex].name = body.name;
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(`{"message": "Item updated."}`);
        });
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({"message": "Item not found."}));
    }
};


  
  export {getItems, getItemsById, postItem, deleteItem, putItem};
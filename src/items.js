// mock items data
const items = [
    {id: 5, name: 'porkkana'},
    {id: 6, name: 'omena'},
    {id: 19, name: 'appelsiini'},
  ];
  
  const getItems = (res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const jsonItems = JSON.stringify(items);
    res.end(`{"message": "All items", "items": ${jsonItems}}`);
  };
  
  const getItemsById = (res, id) => {
    // TODO: if item with id exists send it, otherwise sen 404
    const item = items.find((element) => element.id == id);
    if (item) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(item));
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end({"message": "404 Resource not found!"});
    }
  };
  
  const postItem = (req, res) => {
    let body = [];
    req
      .on('error', err => {
        console.error(err);
      })
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('req body',body);
        body = JSON.parse(body);
        if (!body.name) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(`{"message": "Missing data."}`);
            return;
        }
        const newId = items[items.length-1].id + 1;
        items.push({id: newId, name: body.name});
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(`{"message": "New item added."}`);
    });
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
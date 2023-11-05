const userData = 
[
    {
      user_id: 260,
      username: "VCHar",
      password: "********",
      email: "vchar@example.com",
      user_level_id: 1,
      created_at: "2020-09-12T06:56:41.000Z"
    },
    {
      user_id: 305,
      username: "Donatello",
      password: "********",
      email: "dona@example.com",
      user_level_id: 1,
      created_at: "2021-12-11T06:00:41.000Z"
    },
    {
      user_id: 3609,
      username: "Anon5468",
      password: "********",
      email: "x58df@example.com",
      user_level_id: 3,
      created_at: "2023-04-02T05:56:41.000Z"
    }
  ];

const getUsers = (request, response) => {
    response.json(userData);
};

const getUserById = (request, response) => {
    const user = userData.find((element) => element.user_id = request.params);
    if (user) {
        response.status(200).json(user);
    } else {
        response.status(404).json({"message": "User not found!"});
    }
};

const postUser = (request, response) => {
    const newUser = {
        ...request.body,
        user_id: userData.length > 0 ? Math.max(...userData.map(item => item.user_id)) + 1 : 1,
        created_at: new Date().toISOString()
    };
    userData.push(newUser);
    response.status(201).json({"message": "User added!"})
};

const putUser = (request, response) => {
    const { id } = request.params;
    const index = userData.find(user => user.user_id == id);
    if (index !== -1) {
        userData[index] = {
            ...userData[index],
            ...request.body,
            media_id: parseInt(id)
        };
        response.status(200).json(userData[index]);
    } else {
        response.statusa(404).json({"message": "User not found!"})
    }
};

const deleteUser = (request, response) => {
    const  { id } = request.params;
    const index = userData.find(user => user.user_id == id);
    if (index !== -1) {
        userData.splice(index, 1)
        response.json({"message": "User deleted!"})
    } else {
        response.json({"message": "User not found!"})
    }
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
  


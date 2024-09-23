const getUser = (req, res) => {
  const userId = req.params.id;
  return res.send(`Got user of ${userId} details`);
};

const getAllUsers = (req, res) => {
  return res.send("Got all user");
};

const updateUser = (req, res) => {
  return res.send("Got all user");
};

const deleteUser = (req, res) => {
  return res.send("Got all user");
};

const patchUser = (req, res) => {
  return res.send("Got all user");
};

const createUser = (req, res) => {
  return res.send("Got all user");
};

export { getUser, getAllUsers, updateUser, deleteUser, patchUser, createUser };

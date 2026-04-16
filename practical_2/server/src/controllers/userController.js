const dataStore = require('../models');

// GET all users
const getAllUsers = (req, res) => {
  res.status(200).json(dataStore.users);
};

// GET user by ID
const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = dataStore.users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
};

// POST create a new user
const createUser = (req, res) => {
  const { username, email, name } = req.body;

  // Basic validation
  if (!username || !email) {
    return res.status(400).json({ error: 'Required fields missing: username and email are required' });
  }

  // Check if username or email already exists
  const usernameExists = dataStore.users.some(user => user.username === username);
  const emailExists = dataStore.users.some(user => user.email === email);

  if (usernameExists) {
    return res.status(409).json({ error: 'Username already taken' });
  }

  if (emailExists) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const newUser = {
    id: dataStore.nextIds.users++,
    username,
    email,
    name: name || username,
    followers: [],
    following: [],
    createdAt: new Date().toISOString()
  };

  dataStore.users.push(newUser);
  res.status(201).json(newUser);
};

// PUT update a user
const updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = dataStore.users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name, email } = req.body;
  const user = dataStore.users[userIndex];

  // Update fields if provided
  if (name) user.name = name;
  if (email) {
    // Check if email is already used by another user
    const emailExists = dataStore.users.some(u => u.email === email && u.id !== userId);
    if (emailExists) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    user.email = email;
  }

  user.updatedAt = new Date().toISOString();
  res.status(200).json(user);
};

// DELETE a user
const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = dataStore.users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Remove the user
  dataStore.users.splice(userIndex, 1);

  // Also remove user's videos and comments
  dataStore.videos = dataStore.videos.filter(v => v.userId !== userId);
  dataStore.comments = dataStore.comments.filter(c => c.userId !== userId);

  res.status(204).end();
};

// GET user's videos
const getUserVideos = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = dataStore.users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const userVideos = dataStore.videos.filter(v => v.userId === userId);
  res.status(200).json(userVideos);
};

// GET user's followers
const getUserFollowers = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = dataStore.users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const followers = dataStore.users.filter(u => user.followers.includes(u.id));
  res.status(200).json(followers);
};

// POST follow a user
const followUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const { followerId } = req.body;

  if (!followerId) {
    return res.status(400).json({ error: 'followerId is required' });
  }

  const followerIdInt = parseInt(followerId);
  const userToFollow = dataStore.users.find(u => u.id === userId);
  const follower = dataStore.users.find(u => u.id === followerIdInt);

  if (!userToFollow) {
    return res.status(404).json({ error: 'User to follow not found' });
  }

  if (!follower) {
    return res.status(404).json({ error: 'Follower user not found' });
  }

  // Check if already following
  if (userToFollow.followers.includes(followerIdInt)) {
    return res.status(400).json({ error: 'Already following this user' });
  }

  // Add follow relationship
  userToFollow.followers.push(followerIdInt);
  follower.following.push(userId);

  res.status(200).json({
    message: 'Successfully followed user',
    followerCount: userToFollow.followers.length
  });
};

// DELETE unfollow a user
const unfollowUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const { followerId } = req.body;

  if (!followerId) {
    return res.status(400).json({ error: 'followerId is required' });
  }

  const followerIdInt = parseInt(followerId);
  const userToUnfollow = dataStore.users.find(u => u.id === userId);
  const follower = dataStore.users.find(u => u.id === followerIdInt);

  if (!userToUnfollow) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!follower) {
    return res.status(404).json({ error: 'Follower user not found' });
  }

  const followerIndex = userToUnfollow.followers.indexOf(followerIdInt);
  const followingIndex = follower.following.indexOf(userId);

  if (followerIndex === -1 || followingIndex === -1) {
    return res.status(404).json({ error: 'Follow relationship not found' });
  }

  // Remove follow relationship
  userToUnfollow.followers.splice(followerIndex, 1);
  follower.following.splice(followingIndex, 1);

  res.status(200).json({
    message: 'Successfully unfollowed user',
    followerCount: userToUnfollow.followers.length
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserVideos,
  getUserFollowers,
  followUser,
  unfollowUser
};
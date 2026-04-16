const dataStore = require('../models');

// GET all videos
const getAllVideos = (req, res) => {
  res.status(200).json(dataStore.videos);
};

// GET video by ID
const getVideoById = (req, res) => {
  const videoId = parseInt(req.params.id);
  const video = dataStore.videos.find(v => v.id === videoId);

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  res.status(200).json(video);
};

// POST create a new video
const createVideo = (req, res) => {
  const { title, description, url, userId } = req.body;

  // Basic validation
  if (!title || !url || !userId) {
    return res.status(400).json({ error: 'Required fields missing: title, url, userId are required' });
  }

  // Check if user exists
  const userExists = dataStore.users.some(user => user.id === parseInt(userId));
  if (!userExists) {
    return res.status(400).json({ error: 'User does not exist' });
  }

  const newVideo = {
    id: dataStore.nextIds.videos++,
    title,
    description: description || '',
    url,
    userId: parseInt(userId),
    likes: [],
    comments: [],
    createdAt: new Date().toISOString()
  };

  dataStore.videos.push(newVideo);
  res.status(201).json(newVideo);
};

// PUT update a video
const updateVideo = (req, res) => {
  const videoId = parseInt(req.params.id);
  const videoIndex = dataStore.videos.findIndex(v => v.id === videoId);

  if (videoIndex === -1) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const { title, description, url } = req.body;
  const video = dataStore.videos[videoIndex];

  if (title) video.title = title;
  if (description !== undefined) video.description = description;
  if (url) video.url = url;
  video.updatedAt = new Date().toISOString();

  res.status(200).json(video);
};

// DELETE a video
const deleteVideo = (req, res) => {
  const videoId = parseInt(req.params.id);
  const videoIndex = dataStore.videos.findIndex(v => v.id === videoId);

  if (videoIndex === -1) {
    return res.status(404).json({ error: 'Video not found' });
  }

  // Remove the video
  dataStore.videos.splice(videoIndex, 1);
  
  // Also remove associated comments
  dataStore.comments = dataStore.comments.filter(c => c.videoId !== videoId);

  res.status(204).end();
};

// GET video comments
const getVideoComments = (req, res) => {
  const videoId = parseInt(req.params.id);
  const video = dataStore.videos.find(v => v.id === videoId);

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const videoComments = dataStore.comments.filter(c => c.videoId === videoId);
  res.status(200).json(videoComments);
};

// GET video likes (list of user IDs who liked)
const getVideoLikes = (req, res) => {
  const videoId = parseInt(req.params.id);
  const video = dataStore.videos.find(v => v.id === videoId);

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  res.status(200).json({
    videoId: video.id,
    likeCount: video.likes.length,
    likes: video.likes
  });
};

// POST like a video
const likeVideo = (req, res) => {
  const videoId = parseInt(req.params.id);
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const userIdInt = parseInt(userId);
  const video = dataStore.videos.find(v => v.id === videoId);

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  // Check if user already liked
  if (video.likes.includes(userIdInt)) {
    return res.status(400).json({ error: 'User already liked this video' });
  }

  // Add like
  video.likes.push(userIdInt);
  
  res.status(200).json({
    message: 'Video liked successfully',
    likeCount: video.likes.length
  });
};

// DELETE unlike a video
const unlikeVideo = (req, res) => {
  const videoId = parseInt(req.params.id);
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const userIdInt = parseInt(userId);
  const video = dataStore.videos.find(v => v.id === videoId);

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  // Check if user has liked the video
  const likeIndex = video.likes.indexOf(userIdInt);
  if (likeIndex === -1) {
    return res.status(404).json({ error: 'Like not found' });
  }

  // Remove like
  video.likes.splice(likeIndex, 1);

  res.status(200).json({
    message: 'Video unliked successfully',
    likeCount: video.likes.length
  });
};

module.exports = {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  getVideoComments,
  getVideoLikes,
  likeVideo,
  unlikeVideo
};
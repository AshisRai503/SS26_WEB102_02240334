const dataStore = require('../models');

// GET all comments
const getAllComments = (req, res) => {
  res.status(200).json(dataStore.comments);
};

// GET comment by ID
const getCommentById = (req, res) => {
  const commentId = parseInt(req.params.id);
  const comment = dataStore.comments.find(c => c.id === commentId);

  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  res.status(200).json(comment);
};

// POST create a new comment
const createComment = (req, res) => {
  const { text, userId, videoId } = req.body;

  // Basic validation
  if (!text || !userId || !videoId) {
    return res.status(400).json({ error: 'Required fields missing: text, userId, videoId are required' });
  }

  // Check if user exists
  const userExists = dataStore.users.some(user => user.id === parseInt(userId));
  if (!userExists) {
    return res.status(400).json({ error: 'User does not exist' });
  }

  // Check if video exists
  const videoExists = dataStore.videos.some(video => video.id === parseInt(videoId));
  if (!videoExists) {
    return res.status(400).json({ error: 'Video does not exist' });
  }

  const newComment = {
    id: dataStore.nextIds.comments++,
    text,
    userId: parseInt(userId),
    videoId: parseInt(videoId),
    likes: [],
    createdAt: new Date().toISOString()
  };

  dataStore.comments.push(newComment);
  
  // Add comment ID to video's comments array
  const video = dataStore.videos.find(v => v.id === parseInt(videoId));
  if (video) {
    video.comments.push(newComment.id);
  }

  res.status(201).json(newComment);
};

// PUT update a comment
const updateComment = (req, res) => {
  const commentId = parseInt(req.params.id);
  const commentIndex = dataStore.comments.findIndex(c => c.id === commentId);

  if (commentIndex === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required for update' });
  }

  const comment = dataStore.comments[commentIndex];
  comment.text = text;
  comment.updatedAt = new Date().toISOString();

  res.status(200).json(comment);
};

// DELETE a comment
const deleteComment = (req, res) => {
  const commentId = parseInt(req.params.id);
  const commentIndex = dataStore.comments.findIndex(c => c.id === commentId);

  if (commentIndex === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  const comment = dataStore.comments[commentIndex];
  
  // Remove comment from video's comments array
  const video = dataStore.videos.find(v => v.id === comment.videoId);
  if (video) {
    const videoCommentIndex = video.comments.indexOf(commentId);
    if (videoCommentIndex !== -1) {
      video.comments.splice(videoCommentIndex, 1);
    }
  }

  // Remove the comment
  dataStore.comments.splice(commentIndex, 1);

  res.status(204).end();
};

// POST like a comment
const likeComment = (req, res) => {
  const commentId = parseInt(req.params.id);
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const userIdInt = parseInt(userId);
  const comment = dataStore.comments.find(c => c.id === commentId);

  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  // Check if user already liked
  if (comment.likes.includes(userIdInt)) {
    return res.status(400).json({ error: 'User already liked this comment' });
  }

  // Add like
  comment.likes.push(userIdInt);

  res.status(200).json({
    message: 'Comment liked successfully',
    likeCount: comment.likes.length
  });
};

// DELETE unlike a comment
const unlikeComment = (req, res) => {
  const commentId = parseInt(req.params.id);
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const userIdInt = parseInt(userId);
  const comment = dataStore.comments.find(c => c.id === commentId);

  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  // Check if user has liked the comment
  const likeIndex = comment.likes.indexOf(userIdInt);
  if (likeIndex === -1) {
    return res.status(404).json({ error: 'Like not found' });
  }

  // Remove like
  comment.likes.splice(likeIndex, 1);

  res.status(200).json({
    message: 'Comment unliked successfully',
    likeCount: comment.likes.length
  });
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment
};
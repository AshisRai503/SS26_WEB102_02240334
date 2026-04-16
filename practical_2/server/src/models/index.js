// In-memory data store for TikTok API

// Sample users data
const users = [
  {
    id: 1,
    username: '@john_doe',
    email: 'john@example.com',
    name: 'John Doe',
    followers: [2, 3],
    following: [2],
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    username: '@jane_smith',
    email: 'jane@example.com',
    name: 'Jane Smith',
    followers: [1],
    following: [1, 3],
    createdAt: '2024-01-02T00:00:00.000Z'
  },
  {
    id: 3,
    username: '@bob_wilson',
    email: 'bob@example.com',
    name: 'Bob Wilson',
    followers: [2],
    following: [1],
    createdAt: '2024-01-03T00:00:00.000Z'
  }
];

// Sample videos data
const videos = [
  {
    id: 1,
    title: 'My first TikTok!',
    description: 'Check out this amazing video',
    url: 'https://example.com/video1.mp4',
    userId: 1,
    likes: [2, 3],
    comments: [1, 2],
    createdAt: '2024-01-01T10:00:00.000Z'
  },
  {
    id: 2,
    title: 'Dance challenge',
    description: '#dance #trending',
    url: 'https://example.com/video2.mp4',
    userId: 2,
    likes: [1],
    comments: [3],
    createdAt: '2024-01-02T14:30:00.000Z'
  },
  {
    id: 3,
    title: 'Funny cat video',
    description: 'Fun',
    url: 'https://example.com/video3.mp4',
    userId: 3,
    likes: [1, 2],
    comments: [],
    createdAt: '2024-01-03T09:15:00.000Z'
  }
];

// Sample comments data
const comments = [
  {
    id: 1,
    text: 'Great video! ',
    userId: 2,
    videoId: 1,
    likes: [3],
    createdAt: '2024-01-01T11:00:00.000Z'
  },
  {
    id: 2,
    text: 'Awesome content!',
    userId: 3,
    videoId: 1,
    likes: [1],
    createdAt: '2024-01-01T12:30:00.000Z'
  },
  {
    id: 3,
    text: 'Love this! ',
    userId: 1,
    videoId: 2,
    likes: [2],
    createdAt: '2024-01-02T15:00:00.000Z'
  }
];

// Auto-increment IDs for new items
let nextIds = {
  users: 4,
  videos: 4,
  comments: 4
};

module.exports = {
  users,
  videos,
  comments,
  nextIds
};
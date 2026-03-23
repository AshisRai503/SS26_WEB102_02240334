// Mock Users Data
const users = [
  {
    id: "1",
    username: "traveler",
    email: "traveler@example.com",
    full_name: "Karma",
    profile_picture: "https://example.com/profiles/traveler.jpg",
    bio: "Travel photographer exploring the world",
    created_at: "2023-01-15"
  },
  {
    id: "2",
    username: "foodie",
    email: "foodie@example.com",
    full_name: "Tashi",
    profile_picture: "https://example.com/profiles/foodie.jpg",
    bio: "Food lover and recipe creator",
    created_at: "2023-01-20"
  },
  {
    id: "3",
    username: "adventure",
    email: "adventure@example.com",
    full_name: "Dorji",
    profile_picture: "https://example.com/profiles/adventure.jpg",
    bio: "Adventure seeker and hiker",
    created_at: "2023-02-01"
  }
];

// Mock Posts Data
const posts = [
  {
    id: "1",
    caption: "Beautiful sunset at the beach! 🌅",
    image: "https://example.com/images/sunset.jpg",
    user_id: "1",
    created_at: "2023-02-10"
  },
  {
    id: "2",
    caption: "Delicious homemade pasta 🍝",
    image: "https://example.com/images/pasta.jpg",
    user_id: "2",
    created_at: "2023-02-12"
  },
  {
    id: "3",
    caption: "Mountain hiking adventure! 🏔️",
    image: "https://example.com/images/mountain.jpg",
    user_id: "3",
    created_at: "2023-02-15"
  }
];

module.exports = { users, posts };
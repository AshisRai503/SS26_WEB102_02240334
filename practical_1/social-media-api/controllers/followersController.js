const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { followers, users } = require('../utils/mockData');

// @desc Get all followers
// @route GET /api/followers
// @access Public
exports.getFollowers = asyncHandler(async (req, res, next) => {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = followers.length;

    // Get paginated results
    const results = followers.slice(startIndex, endIndex);

    // Enhance followers with user data
    const enhancedResults = results.map(follower => {
        const followerUser = users.find(user => user.id === follower.follower_id);
        const followingUser = users.find(user => user.id === follower.following_id);
        return {
            ...follower,
            follower: {
                id: followerUser.id,
                username: followerUser.username,
                full_name: followerUser.full_name,
                profile_picture: followerUser.profile_picture
            },
            following: {
                id: followingUser.id,
                username: followingUser.username,
                full_name: followingUser.full_name,
                profile_picture: followingUser.profile_picture
            }
        };
    });

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    res.status(200).json({
        success: true,
        count: enhancedResults.length,
        page,
        total_pages: Math.ceil(total / limit),
        pagination,
        data: enhancedResults
    });
});

// @desc Get single follower relationship
// @route GET /api/followers/:id
// @access Public
exports.getFollower = asyncHandler(async (req, res, next) => {
    const follower = followers.find(follower => follower.id === req.params.id);

    if (!follower) {
        return next(
            new ErrorResponse(`Follower relationship not found with id of ${req.params.id}`, 404)
        );
    }

    // Enhance follower with user data
    const followerUser = users.find(user => user.id === follower.follower_id);
    const followingUser = users.find(user => user.id === follower.following_id);
    const enhancedFollower = {
        ...follower,
        follower: {
            id: followerUser.id,
            username: followerUser.username,
            full_name: followerUser.full_name,
            profile_picture: followerUser.profile_picture
        },
        following: {
            id: followingUser.id,
            username: followingUser.username,
            full_name: followingUser.full_name,
            profile_picture: followingUser.profile_picture
        }
    };

    res.status(200).json({
        success: true,
        data: enhancedFollower
    });
});

// @desc Create new follower relationship (Follow user)
// @route POST /api/followers
// @access Private (we'll simulate this)
exports.createFollower = asyncHandler(async (req, res, next) => {
    // Simulate authentication
    const userId = req.header('X-User-Id');
    if (!userId) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    const user = users.find(user => user.id === userId);
    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    // Check if following user exists
    const followingUser = users.find(user => user.id === req.body.following_id);
    if (!followingUser) {
        return next(new ErrorResponse('User to follow not found', 404));
    }

    // Check if user is trying to follow themselves
    if (userId === req.body.following_id) {
        return next(new ErrorResponse('You cannot follow yourself', 400));
    }

    // Check if already following
    const existingFollow = followers.find(follower => 
        follower.follower_id === userId && follower.following_id === req.body.following_id
    );
    if (existingFollow) {
        return next(new ErrorResponse('You are already following this user', 400));
    }

    const newFollower = {
        id: (followers.length + 1).toString(),
        follower_id: userId,
        following_id: req.body.following_id,
        created_at: new Date().toISOString().slice(0, 10)
    };

    followers.push(newFollower);

    res.status(201).json({
        success: true,
        data: newFollower
    });
});

// @desc Update follower relationship
// @route PUT /api/followers/:id
// @access Private (we'll simulate this)
exports.updateFollower = asyncHandler(async (req, res, next) => {
    // Simulate authentication
    const userId = req.header('X-User-Id');
    if (!userId) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    let follower = followers.find(follower => follower.id === req.params.id);

    if (!follower) {
        return next(
            new ErrorResponse(`Follower relationship not found with id of ${req.params.id}`, 404)
        );
    }

    // Check if user owns the follower relationship
    if (follower.follower_id !== userId) {
        return next(new ErrorResponse(`Not authorized to update this follower relationship`, 401));
    }

    // Update follower
    const index = followers.findIndex(follower => follower.id === req.params.id);
    followers[index] = {
        ...follower,
        ...req.body,
        id: follower.id, // Ensure ID doesn't change
        follower_id: follower.follower_id, // Ensure follower_id doesn't change
        following_id: follower.following_id // Ensure following_id doesn't change
    };

    res.status(200).json({
        success: true,
        data: followers[index]
    });
});

// @desc Delete follower relationship (Unfollow user)
// @route DELETE /api/followers/:id
// @access Private (we'll simulate this)
exports.deleteFollower = asyncHandler(async (req, res, next) => {
    // Simulate authentication
    const userId = req.header('X-User-Id');
    if (!userId) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    const follower = followers.find(follower => follower.id === req.params.id);

    if (!follower) {
        return next(
            new ErrorResponse(`Follower relationship not found with id of ${req.params.id}`, 404)
        );
    }

    // Check if user owns the follower relationship
    if (follower.follower_id !== userId) {
        return next(new ErrorResponse(`Not authorized to delete this follower relationship`, 401));
    }

    // Delete follower relationship
    const index = followers.findIndex(follower => follower.id === req.params.id);
    followers.splice(index, 1);

    res.status(200).json({
        success: true,
        data: {}
    });
});
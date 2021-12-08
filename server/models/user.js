const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    profileImgUrl: {
        type: String,
        required: false
    },
    resetToken: String,
    resetTokenExpiration: Date,

    contacts: {
        users: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: false
            }
        }]
    },

});



userSchema.methods.follow = function(user) {
    const userFollows = [...this.following.users];
    userFollows.push({
        userId: user._id
    });
    const updatedFollows = {
        users: userFollows
    };
    this.following = updatedFollows;
    return this.save();
};

userSchema.methods.followById = async function(userId) {
    let userFollows = [...this.following.users];
    if (!this.isFollowing(userId)) {
        userFollows.push({
            userId: userId.toString()
        });
        userFollows = [...new Set(userFollows)];
        this.following.users = userFollows;
        return await this.save();
    }
};

userSchema.methods.clearFollows = async function() {
    let userFollows = [...this.following.users];
    userFollows = [];
    this.following.users = userFollows;
    return await this.save();
}

userSchema.methods.isFollowing = function(userId) {
    const updatedUsers = this.following.users.filter(user => {
        return user.userId.toString() == userId.toString();
    });
    let isFollowing;
    if (updatedUsers.length >= 1) {
        isFollowing = true;
    } else {
        isFollowing = false;
    }
    return isFollowing;
};

userSchema.methods.unfollow = function(userId) {
    const userFollows = this.following.users.filter(user => {
        // console.log('user._id: ' + user.userId._id);
        // console.log('userId: ' + userId._id);
        return user.userId._id.toString() !== userId._id.toString();
    });
    // console.log('User Follows: ' + userFollows);
    this.following.users = userFollows;
    return this.save();
};



module.exports = mongoose.model('User', userSchema);
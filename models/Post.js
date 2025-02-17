const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  text: {//Description of the post
    type: String,
    required: true,
  },
  name: {//Name of user
    type: String,
    required: true
  },
  avatar: {//Avatar of user
    type: String
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      text: {//Comment text
        type: String,
        required: true
      },
      name: {//User name who made the comment
        type: String
      },
      avatar: {//User avatar who made the comment
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {//Date on which the post was made
    type: Date,
    default: Date.now
  }
})

module.exports = Post = mongoose.model('post', PostSchema);
const mongoose = require('mongoose')

// define schema for post documents so these properties will be saved to the collection in the mongodb database

const orderSchema = new mongoose.Schema({
  name: String,
  order_Date: String,
  coffee: String,
  email: String,
  isPublished: Boolean
})

const Post = mongoose.model('Post', orderSchema)

module.exports = Post

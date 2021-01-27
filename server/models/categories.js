'use strict';

const mongoose = require('mongoose'), Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// Compile model from schema
module.exports = mongoose.model('Categories', CategorySchema);

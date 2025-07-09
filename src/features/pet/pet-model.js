const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema, model } = mongoose;

const petSchema = new Schema({
  name: String,
  breed: String,
  age: String,
  gender: String,
  coatLength: String,
  preferHomeWith: [String],
  preferHomeWithout: [String],
  health: [String],
  images: [
    {
      publicId: String,
      url: String,
    },
  ],
  description: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

petSchema.plugin(mongoosePaginate);

const Pet = model('Pet', petSchema);

module.exports = Pet;

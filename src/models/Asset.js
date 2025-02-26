const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const AssetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Asset name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add pagination plugin
AssetSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Asset', AssetSchema);
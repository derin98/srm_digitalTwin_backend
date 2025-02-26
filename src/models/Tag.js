const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tag name is required'],
    trim: true
  },
  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: [true, 'Asset ID is required']
  },
  operatingRange: {
    min: {
      type: Number,
      required: [true, 'Minimum operating range is required']
    },
    max: {
      type: Number,
      required: [true, 'Maximum operating range is required'],
      validate: {
        validator: function(val) {
          return val > this.operatingRange.min;
        },
        message: 'Maximum value must be greater than minimum value'
      }
    }
  },
  value: {
    type: Number,
    default: 0
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
TagSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Tag', TagSchema);
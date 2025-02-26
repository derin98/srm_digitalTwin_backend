const Tag = require('../models/Tag');
const { getPaginationOptions } = require('../utils/pagination');
const { simulateValue } = require('../utils/simulator');

// Get all tags with pagination
exports.getTags = async (req, res, next) => {
  try {
    const options = getPaginationOptions(req);
    
    // Filter by assetId if provided in query
    const filter = {};
    if (req.query.assetId) {
      filter.assetId = req.query.assetId;
    }
    
    const result = await Tag.paginate(filter, options);
    
    res.status(200).json({
      success: true,
      count: result.totalDocs,
      page: result.page,
      totalPages: result.totalPages,
      data: result.docs
    });
  } catch (error) {
    next(error);
  }
};

// Get single tag by ID
exports.getTagById = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id).populate('assetId', 'name description');
    
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: tag
    });
  } catch (error) {
    next(error);
  }
};

// Create new tag
exports.createTag = async (req, res, next) => {
  try {
    // Simulate initial value based on operating range
    const tagData = req.body;
    tagData.value = simulateValue(
      tagData.operatingRange.min,
      tagData.operatingRange.max
    );
    
    const tag = await Tag.create(tagData);
    
    res.status(201).json({
      success: true,
      data: tag
    });
  } catch (error) {
    next(error);
  }
};

// Update tag
exports.updateTag = async (req, res, next) => {
  try {
    // If operating range is updated, simulate a new value
    if (req.body.operatingRange) {
      req.body.value = simulateValue(
        req.body.operatingRange.min,
        req.body.operatingRange.max
      );
    }
    
    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: tag
    });
  } catch (error) {
    next(error);
  }
};

// Delete tag
exports.deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id);
    
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }
    
    await tag.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// Get tags by asset ID
exports.getTagsByAssetId = async (req, res, next) => {
  try {
    const options = getPaginationOptions(req);
    const assetId = req.params.assetId;
    
    const result = await Tag.paginate({ assetId }, options);
    
    res.status(200).json({
      success: true,
      count: result.totalDocs,
      page: result.page,
      totalPages: result.totalPages,
      data: result.docs
    });
  } catch (error) {
    next(error);
  }
};

// Update tag value (simulate new value)
exports.updateTagValue = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id);
    
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }
    
    // Generate a new simulated value
    tag.value = simulateValue(tag.operatingRange.min, tag.operatingRange.max);
    await tag.save();
    
    res.status(200).json({
      success: true,
      data: tag
    });
  } catch (error) {
    next(error);
  }
};
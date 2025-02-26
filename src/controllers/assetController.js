const Asset = require('../models/Asset');
const { getPaginationOptions } = require('../utils/pagination');

// Get all assets with pagination
exports.getAssets = async (req, res, next) => {
  try {
    const options = getPaginationOptions(req);
    const result = await Asset.paginate({}, options);
    
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

// Get single asset by ID
exports.getAssetById = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id);
    
    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: asset
    });
  } catch (error) {
    next(error);
  }
};

// Create new asset
exports.createAsset = async (req, res, next) => {
  try {
    const asset = await Asset.create(req.body);
    
    res.status(201).json({
      success: true,
      data: asset
    });
  } catch (error) {
    next(error);
  }
};

// Update asset
exports.updateAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: asset
    });
  } catch (error) {
    next(error);
  }
};

// Delete asset
exports.deleteAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id);
    
    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }
    
    await asset.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
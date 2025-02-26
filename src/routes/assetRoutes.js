const express = require('express');
const { 
  getAssets, 
  getAssetById, 
  createAsset, 
  updateAsset, 
  deleteAsset 
} = require('../controllers/assetController');
const { validateAssetInput } = require('../middleware/validator');

const router = express.Router();

router.route('/')
  .get(getAssets)
  .post(validateAssetInput, createAsset);

router.route('/:id')
  .get(getAssetById)
  .put(validateAssetInput, updateAsset)
  .delete(deleteAsset);

module.exports = router;
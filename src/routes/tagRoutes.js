const express = require('express');
const { 
  getTags, 
  getTagById, 
  createTag, 
  updateTag, 
  deleteTag,
  getTagsByAssetId,
  updateTagValue
} = require('../controllers/tagController');
const { validateTagInput } = require('../middleware/validator');

const router = express.Router();

router.route('/')
  .get(getTags)
  .post(validateTagInput, createTag);

router.route('/:id')
  .get(getTagById)
  .put(validateTagInput, updateTag)
  .delete(deleteTag);

// Additional routes
router.route('/asset/:assetId')
  .get(getTagsByAssetId);

router.route('/:id/simulate')
  .put(updateTagValue);

module.exports = router;
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Middleware to check validation results
const validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// Validate Asset Input
exports.validateAssetInput = [
  body('name')
    .notEmpty()
    .withMessage('Asset name is required')
    .trim(),
  
  body('description')
    .optional()
    .trim(),
  
  validateResults
];

// Validate Tag Input
exports.validateTagInput = [
  body('name')
    .notEmpty()
    .withMessage('Tag name is required')
    .trim(),
  
  body('assetId')
    .notEmpty()
    .withMessage('Asset ID is required')
    .custom(value => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid Asset ID format');
      }
      return true;
    }),
  
  body('operatingRange.min')
    .notEmpty()
    .withMessage('Minimum operating range is required')
    .isNumeric()
    .withMessage('Minimum operating range must be a number'),
  
  body('operatingRange.max')
    .notEmpty()
    .withMessage('Maximum operating range is required')
    .isNumeric()
    .withMessage('Maximum operating range must be a number')
    .custom((value, { req }) => {
      if (value <= req.body.operatingRange.min) {
        throw new Error('Maximum value must be greater than minimum value');
      }
      return true;
    }),
  
  // Value is simulated, so we don't validate it here
  
  validateResults
];
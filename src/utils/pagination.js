const config = require('../config/config');

// Get pagination options from request query
exports.getPaginationOptions = (req) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || config.pagination.defaultLimit;
  
  // Ensure limit doesn't exceed maximum
  const safeLimit = Math.min(limit, config.pagination.maxLimit);
  
  const options = {
    page,
    limit: safeLimit,
    sort: { createdAt: -1 } // Default sort by most recent
  };
  
  // Add custom sorting if provided
  if (req.query.sort) {
    const sortOrder = req.query.order === 'asc' ? 1 : -1;
    options.sort = { [req.query.sort]: sortOrder };
  }
  
  // Add population if needed
  if (req.query.populate) {
    options.populate = req.query.populate;
  }
  
  return options;
};
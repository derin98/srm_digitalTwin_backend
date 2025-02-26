const Tag = require('../models/Tag');
const config = require('../config/config');

// Generate a random value within the operating range
exports.simulateValue = (min, max) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Start the simulator that periodically updates tag values
exports.startSimulator = async () => {
  if (!config.simulation.enabled) {
    console.log('Simulation is disabled');
    return;
  }
  
  console.log('Starting tag value simulator');
  
  // Periodically update tag values
  setInterval(async () => {
    try {
      // Get all tags
      const tags = await Tag.find({});
      
      // Update each tag with a new random value within its operating range
      const updates = tags.map(async (tag) => {
        const newValue = exports.simulateValue(
          tag.operatingRange.min,
          tag.operatingRange.max
        );
        
        return Tag.findByIdAndUpdate(
          tag._id,
          { value: newValue },
          { new: true }
        );
      });
      
      await Promise.all(updates);
      console.log(`Updated ${tags.length} tag values`);
    } catch (error) {
      console.error('Error updating tag values:', error);
    }
  }, config.simulation.updateInterval);
};

// Initialize simulator - to be called from server.js
exports.init = () => {
  if (config.simulation.enabled) {
    exports.startSimulator();
  }
};
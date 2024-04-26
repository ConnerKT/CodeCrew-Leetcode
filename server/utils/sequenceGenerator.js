const Sequence = require('../models/sequence');

async function getNextSequenceValue(sequenceName) {
  const sequence = await Sequence.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  return sequence.value;
}

module.exports = getNextSequenceValue;
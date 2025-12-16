const mongoose = require('mongoose');

const ModelDetailSchema = new mongoose.Schema(
  {
    _id: String,
    brandId: String,
    modelName: String,
    year: String,
    description: String,
    imageUrl: String,
    facts: [String],
  },
  { _id: false, versionKey: false },
);

ModelDetailSchema.virtual('id').get(function () {
  return this._id;
});
ModelDetailSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ModelDetail', ModelDetailSchema);

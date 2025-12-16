const mongoose = require('mongoose');

const CarModelSchema = new mongoose.Schema(
  {
    _id: String,
    brandId: String,
    modelName: String,
    year: String,
  },
  { _id: false, versionKey: false },
);

CarModelSchema.virtual('id').get(function () {
  return this._id;
});
CarModelSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('CarModel', CarModelSchema);

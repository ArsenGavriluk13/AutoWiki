const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    country: String,
    logoUrl: String,
  },
  { _id: false, versionKey: false },
);

BrandSchema.virtual('id').get(function () {
  return this._id;
});
BrandSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Brand', BrandSchema);

const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, required: true, maxlength: 5000 },
  category: {
    type: String,
    required: true,
    enum: ['product', 'skill', 'project', 'housing', 'vehicle', 'service', 'job', 'other'],
  },
  price: { type: Number, default: 0 },
  priceType: { type: String, enum: ['fixed', 'negotiable', 'hourly', 'free'], default: 'fixed' },
  currency: { type: String, default: 'USD' },
  images: [{ type: String }],
  location: { type: String, default: '' },
  condition: { type: String, enum: ['new', 'like-new', 'used', 'not-applicable'], default: 'not-applicable' },
  tags: [{ type: String, trim: true }],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'sold', 'expired', 'draft'], default: 'active' },
  views: { type: Number, default: 0 },
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

listingSchema.index({ title: 'text', description: 'text', tags: 'text' });
listingSchema.index({ category: 1, status: 1 });
listingSchema.index({ seller: 1 });

module.exports = mongoose.model('Listing', listingSchema);

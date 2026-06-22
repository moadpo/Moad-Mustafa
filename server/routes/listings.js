const express = require('express');
const { body, query, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const Listing = require('../models/Listing');
const auth = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    cb(ext && mime ? null : new Error('Images only'), ext && mime);
  },
});

// Get all listings with filters
router.get('/', async (req, res) => {
  try {
    const { category, search, sort, page = 1, limit = 20, status = 'active' } = req.query;
    const filter = { status };
    if (category) filter.category = category;
    if (search) filter.$text = { $search: search };

    const sortOptions = { newest: { createdAt: -1 }, oldest: { createdAt: 1 }, price_asc: { price: 1 }, price_desc: { price: -1 } };
    const sortBy = sortOptions[sort] || { createdAt: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [listings, total] = await Promise.all([
      Listing.find(filter).sort(sortBy).skip(skip).limit(parseInt(limit)).populate('seller', 'name avatar location'),
      Listing.countDocuments(filter),
    ]);
    res.json({ listings, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true }).populate('seller', 'name avatar location bio');
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create listing
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  try {
    const images = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];
    const listing = await Listing.create({ ...req.body, images, seller: req.user._id, tags: req.body.tags ? JSON.parse(req.body.tags) : [] });
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update listing
router.patch('/:id', auth, upload.array('images', 5), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    if (listing.seller.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Not authorized' });

    const updates = { ...req.body };
    if (req.files && req.files.length > 0) {
      updates.images = [...listing.images, ...req.files.map(f => `/uploads/${f.filename}`)];
    }
    if (updates.tags && typeof updates.tags === 'string') updates.tags = JSON.parse(updates.tags);

    const updated = await Listing.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete listing
router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    if (listing.seller.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Not authorized' });
    await listing.deleteOne();
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save/unsave listing
router.post('/:id/save', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    const idx = listing.savedBy.indexOf(req.user._id);
    if (idx === -1) listing.savedBy.push(req.user._id);
    else listing.savedBy.splice(idx, 1);
    await listing.save();
    res.json({ saved: idx === -1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

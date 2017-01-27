const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * Activity Schema
 */
const ZoneSchema = new mongoose.Schema({
  name: {
    th: {
      type: String,
      required: true
    },
    en: {
      type: String,
      required: true
    }
  },
  places: [{
    type: ObjectId,
    ref: 'Place'
  }],
  thumbnailUrl: {
    type: String
  },
  bannerUrl: {
    type: String
  },
  welcomeMessage: {
    th: {
      type: String,
      required: true
    },
    en: {
      type: String,
      required: true
    }
  },
  shortName: {
    th: {
      type: String,
      required: true
    },
    en: {
      type: String,
      required: true
    }
  },
  description: {
    th: {
      type: String,
      required: true
    },
    en: {
      type: String,
      required: true
    }
  },
  websiteUrl: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  location: {
    latitute: { type: Number, required: true },
    longtitute: { type: Number, required: true }
  }
});

const Zone = mongoose.model('Zone', ZoneSchema);

module.exports = Zone;
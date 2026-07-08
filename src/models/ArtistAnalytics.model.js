import mongoose from "mongoose";

const artistAnalyticsSchema = new mongoose.Schema(
  {
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    totalStreams: {
      type: Number,
      default: 0,
    },

    uniqueListeners: {
      type: Number,
      default: 0,
    },

    followersGained: {
      type: Number,
      default: 0,
    },

    followersLost: {
      type: Number,
      default: 0,
    },

    playlistAdds: {
      type: Number,
      default: 0,
    },

    totalLikes: {
      type: Number,
      default: 0,
    },

    totalShares: {
      type: Number,
      default: 0,
    },

    revenue: {
      type: Number,
      default: 0,
    },

    topSongs: [
      {
        song: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Song",
        },
        streams: {
          type: Number,
          default: 0,
        },
      },
    ],

    countryStats: [
      {
        country: {
          type: String,
          default: "",
        },
        streams: {
          type: Number,
          default: 0,
        },
      },
    ],

    deviceStats: {
      web: {
        type: Number,
        default: 0,
      },
      android: {
        type: Number,
        default: 0,
      },
      ios: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

artistAnalyticsSchema.index({ artist: 1, date: -1 });
artistAnalyticsSchema.index({ date: -1 });

const ArtistAnalytics = mongoose.model(
  "ArtistAnalytics",
  artistAnalyticsSchema
);

export default ArtistAnalytics;
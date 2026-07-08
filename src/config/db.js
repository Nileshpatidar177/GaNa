import mongoose from "mongoose";
import Song from "../models/Song.model.js";
import Album from "../models/Album.model.js";

const dropLegacyTextIndexes = async (db, collectionName) => {
  const collection = db.collection(collectionName);
  const indexes = await collection.listIndexes().toArray();

  for (const index of indexes) {
    if (!index.key || !index.name) continue;

    const songTextMatch =
      collectionName === "songs" &&
      index.key.title === "text" &&
      index.key.tags === "text";

    const albumTextMatch =
      collectionName === "albums" &&
      index.key.title === "text" &&
      Object.keys(index.key).length === 1;

    if ((songTextMatch || albumTextMatch) && !index.language_override) {
      await collection.dropIndex(index.name);
    }
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: false,
    });

    const db = conn.connection.db;
    await dropLegacyTextIndexes(db, "songs");
    await dropLegacyTextIndexes(db, "albums");

    await Song.syncIndexes();
    await Album.syncIndexes();

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
import mongoose from "mongoose";

const listingSchema = mongoose.Schema({
    discogs_id: Number,
    record_name: String,
    record_artist: String,
    record_genre: {type: Array, "default": []},
    record_year: String,
    record_price: Number,
    record_quantity: Number,
    record_image: String,
    record_vendor: String
}, {collection: "records"})

export default listingSchema;

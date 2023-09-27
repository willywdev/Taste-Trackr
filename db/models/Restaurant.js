import mongoose from "mongoose";

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  restaurant: { type: String, required: true },
  rating: { type: String, required: true },
  text: { type: String, required: true },
  city: { type: String },
  createdBy: { type: String, required: true },
  date: { type: String, required: true },
  additionalAccessBy: { type: String },
});

const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;

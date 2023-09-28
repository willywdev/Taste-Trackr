import dbConnect from "@/db/dbConnect";
import Restaurant from "@/db/models/Restaurant";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const { id } = request.query;
    console.log(id);
    if (!id) {
      response.status(400).json({ status: "Missing ID" });
    }

    const restaurants = await Restaurant.find({ createdBy: id });

    response.status(200).json(restaurants);
    if (!restaurants) {
      response.status(404).json({ status: "not found" });
    }
  }

  if (request.method === "POST") {
    try {
      const restaurantData = request.body;
      await Restaurant.create(restaurantData);
      response.status(201).json({ status: "Restaurant created." });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}

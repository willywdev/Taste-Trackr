import dbConnect from "@/db/dbConnect";
import Restaurant from "@/db/models/Restaurant";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PUT") {
    const restaurantData = request.body;
    await Restaurant.findByIdAndUpdate(id, restaurantData);
    response.status(200).json({ status: "entry updated." });
  }
}

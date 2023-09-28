import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User";

export default async function hanlder(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const { id, email } = request.query;

    try {
      if (id) {
        const user = await User.findById(id);
        response.status(200).json(user);
      } else if (email) {
        const user = await User.findOne({ email: email });
        if (user) {
          response.status(200).json(user);
        } else {
          response.status(400).json({ status: "user not found" });
        }
      } else {
        response.status(400).json({ status: "Missing parameters" });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const userData = request.body;
      await User.create(userData);
      response.status(201).json({ status: "user has been created" });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}

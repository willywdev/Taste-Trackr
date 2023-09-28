import dbConnect from "@/db/dbConnect";

export default async function handler(request, response) {
  await dbConnect();
}
